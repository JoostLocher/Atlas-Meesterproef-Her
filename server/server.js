import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

import { Liquid } from "liquidjs";
const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./server/views");
app.set("view engine", "liquid");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

app.use("/client", express.static(path.join(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "../dist")));

// API endpoints van Directus
const jsonAdress = "https://fdnd-agency.directus.app/items/atlas_address/";
const jsonPerson = "https://fdnd-agency.directus.app/items/atlas_person/";
const jsonPoster = "https://fdnd-agency.directus.app/items/atlas_poster/";
const jsonFamily = "https://fdnd-agency.directus.app/items/atlas_family/";

// Middleware: voeg 'straten' toe aan res.locals (alle templates kunnen dit gebruiken)
app.use(async (req, res, next) => {
  try {
    const addressRes = await fetch(jsonAdress); // Haalt alle adressen op.
    const adressen = (await addressRes.json()).data; // Extract data uit JSON.

    const straten = [
      ...new Set(
        adressen
          .map((adres) => adres.street?.trim()) // Haalt de straatnamen op.
          .filter(Boolean) // Verwijdert lege waarden.
      ),
    ]; // Unieke straten via Set.

    res.locals.straten = straten; // Maakt 'straten' beschikbaar in views.
    next(); // Ga verder naar volgende middleware/route.
  } catch (err) {
    console.error("Fout bij ophalen van adressen:", err);
    res.locals.straten = []; // Fallback als iets fout gaat.
    next();
  }
});

// Homepagina route
app.get("/", async (req, res) => {
  try {
    const personRes = await fetch(jsonPerson); // Haalt alle personen op.
    const personen = (await personRes.json()).data;

    const uitgebreidPath = path.join(
      __dirname,
      "../client/public/uitgebreid.json"
    );
    const uitgebreidRaw = await fs.readFile(uitgebreidPath, "utf-8");
    const uitgebreidData = JSON.parse(uitgebreidRaw);
    const uitgebreideVerhalen = uitgebreidData.verhalen;

    res.render("index", {
      personen,
      uitgebreideVerhalen,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Fout bij ophalen van API"); // Foutmelding bij mislukken.
  }
});

// Voor fs-bestanden uitlezen
import fs from "fs/promises";

// Dynamische route voor verhalenpagina van 1 persoon
app.get("/verhaal/:naam", async (req, res) => {
  try {
    const naam = decodeURIComponent(req.params.naam).replace(/\+/g, ' ');

    const storyPath = path.join(__dirname, "../client/public/story.json"); // Pad naar het JSON-bestand met verhalen.
    const rawData = await fs.readFile(storyPath, "utf-8"); // Leest het JSON-bestand.
    const storyData = JSON.parse(rawData); // Parseert naar JavaScript-object.

    const persoon = storyData.personen.find((p) => p.naam === naam); // Zoekt de juiste persoon.

    if (!persoon) {
      return res.status(404).send("Persoon niet gevonden");
    }

    res.render("generic", {
      naam: persoon.naam,
      familie: persoon.familie,
      beroep: persoon.beroep,
      verhaal: persoon.verhaal,
    }); // Render de 'generic' template met persoonsgegevens.
  } catch (err) {
    console.error(err);
    res.status(500).send("Fout bij ophalen van verhaal"); // Foutmelding.
  }
});

// Route voor specifieke huispagina: straat + huisnummer (+ toevoeging optioneel)
app.get("/:straatnaam/:huisnummer", async (req, res) => {
  try {
    const straatnaam = decodeURIComponent(req.params.straatnaam.trim()); // Haalt straatnaam uit URL.
    const huisnummer = parseInt(req.params.huisnummer, 10); // Parseert huisnummer.
    const toevoeging = req.params.toevoeging?.trim() || null; // Optionele toevoeging.

    // Haal adressen en personen tegelijk op.
    const [addressRes, personRes] = await Promise.all([
      fetch(jsonAdress),
      fetch(jsonPerson),
    ]);

    const adressen = (await addressRes.json()).data;
    const personen = (await personRes.json()).data;

    // Zoek het juiste adres
    const adres = adressen.find(
      (adres) =>
        adres.street?.trim() === straatnaam &&
        parseInt(adres.house_number, 10) === huisnummer &&
        (adres.addition?.trim() || "") === (toevoeging || "")
    );

    if (!adres) {
      return res.status(404).send("Adres niet gevonden");
    }

    // Zoek personen op dit adres
    const bewoners = personen.filter(
      (persoon) => persoon.address_id === adres.id
    );

    res.render("detail", {
      straatnaam,
      huisnummer,
      toevoeging,
      adres,
      bewoners,
    }); // Render de detailpagina met adres + bewoners.
  } catch (err) {
    console.error(err);
    res.status(500).send("Fout bij ophalen van huispagina"); // Foutmelding.
  }
});

// Route voor hele straat: lijst van adressen
app.get("/:straatnaam", async (req, res) => {
  const straatnaam = req.params.straatnaam;

  try {
    // Laad alle adressen
    const adressenData = await fetch(
      "https://fdnd-agency.directus.app/items/atlas_address/"
    );
    const adressen = await adressenData.json();

    // Filter op straatnaam
    const huidigAdres = adressen.data.filter(
      (adres) => adres.street?.trim() === straatnaam
    );

    // 👉 Voeg dit pas toe nadat `huidigAdres` bestaat:
    const uitgebreidPath = path.join(
      __dirname,
      "../client/public/uitgebreid.json"
    );
    const uitgebreidRaw = await fs.readFile(uitgebreidPath, "utf-8");
    const uitgebreidData = JSON.parse(uitgebreidRaw);
    const uitgebreideVerhalen = uitgebreidData.verhalen;

    // Lees algemene verhalen uit story.json
    const storyPath = path.join(__dirname, "../client/public/story.json");
    const storyRaw = await fs.readFile(storyPath, "utf-8");
    const storyData = JSON.parse(storyRaw);
    const algemeneVerhalen = storyData.personen;

    // Markeer of adres uitgebreid is en geef zo nodig een fallback verhaal
    huidigAdres.forEach((adres) => {
      const isUitgebreid = uitgebreideVerhalen.some(
        (verhaal) =>
          verhaal.straat === adres.street &&
          verhaal.huisnummer === adres.house_number
      );
      adres.isUitgebreid = isUitgebreid;

      if (!isUitgebreid && algemeneVerhalen.length > 0) {
        // Random algemeen verhaal als fallback
        const randomIndex = Math.floor(Math.random() * algemeneVerhalen.length);
        adres.fallbackVerhaal = algemeneVerhalen[randomIndex];
      }
    });

    // Vul achternaam in per adres
    await Promise.all(
      huidigAdres.map(async (adres) => {
        const personen = adres.person;
        if (Array.isArray(personen) && personen.length > 0) {
          const personenData = await Promise.all(
            personen.map(async (persoonId) => {
              const persoonData = await fetch(
                `https://fdnd-agency.directus.app/items/atlas_person/${persoonId}`
              );
              const persoonJson = await persoonData.json();
              return persoonJson.data;
            })
          );
          adres.last_name = personenData[0]?.last_name || "Onbekend";
        } else {
          adres.last_name = "Onbekend";
        }
      })
    );

    // Render de pagina
    res.render("street", {
      huidigAdres,
      straatnaam,
      uitgebreideVerhalen,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Fout bij ophalen van API");
  }
});

const port = 2000;
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
