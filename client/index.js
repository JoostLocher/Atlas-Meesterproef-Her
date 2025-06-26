import "./index.css";

console.log("Hello, world123");


const tooltip = document.getElementById("tooltip"); // Selecteert het tooltip-element.
const links = document.querySelectorAll(".straat-link"); // Selecteert alle straat-links.

links.forEach((link) => {
  const name = link.dataset.straat; // Haalt de naam van de straat op uit een data-attribuut.

  link.addEventListener("mouseenter", (e) => {
    tooltip.style.display = "block"; // Toon de tooltip als de muis erover gaat.
    tooltip.textContent = name; // Zet de straatnaam als tekst in de tooltip.
  });

  link.addEventListener("mouseleave", () => {
    tooltip.style.display = "none"; // Verberg de tooltip als de muis weggaat.
  });

  link.addEventListener("mousemove", (e) => {
    const mapWrapper = document.querySelector(".map-wrapper"); // Selecteer de map-container.
    const rect = mapWrapper.getBoundingClientRect(); // Haalt de positie van de map-container op.

    tooltip.style.left = e.clientX - rect.left + 10 + "px"; // Zet de horizontale positie van de tooltip.
    tooltip.style.top = e.clientY - rect.top - 10 + "px"; // Zet de verticale positie van de tooltip.
  });
});

gsap.from('svg[aria-label="introSVG"] path', {
  drawSVG: 0, // Start met niets getekend.
  duration: 30, // Duurt 30 seconden.
  ease: "power1.inOut", // Versnelling/vertragingseffect.
});
// Animeert een SVG-path alsof het met de hand getekend wordt (vereist GSAP + DrawSVGPlugin).

// ======================
// Added Localstage voor intro
// ======================

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.querySelector(".overlay-screen");

  const hasSeenStory = localStorage.getItem("hasSeenStory");

  if (hasSeenStory) {
    overlay.classList.add("hidden");
  } else {
    localStorage.setItem("hasSeenStory", "true");
  }
});

const steps = document.querySelectorAll(".story-step"); // Selecteert alle stappen in het verhaal.
const overlay = document.getElementById("story-overlay"); // Selecteert het overlay-element.
const title = document.querySelector(".story h1"); // Selecteert de titel in de story-sectie.
const prevBtn = document.getElementById("prevBtn"); // Selecteert de 'Vorige' knop.
let currentStep = 0; // Houdt bij welke stap actief is.

function showStep(index) {
  steps.forEach((step) => step.classList.remove("active")); // Verberg alle stappen.
  steps[index].classList.add("active"); // Toon de huidige stap.

  if (index === 0) {
    title.style.display = "block"; // Toon de titel bij stap 0.
    prevBtn.style.display = "none"; // Verberg de vorige knop.
  } else {
    title.style.display = "none"; // Verberg de titel bij andere stappen.
    prevBtn.style.display = "inline-block"; // Toon de vorige knop.
  }
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++; // Ga naar de volgende stap.
    showStep(currentStep); // Toon de nieuwe stap.
  } else {
    overlay.style.display = "none"; // Verberg het overlay als je aan het eind bent.
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--; // Ga terug naar de vorige stap.
    showStep(currentStep); // Toon de stap.
  }
});

showStep(currentStep); // Toon de eerste stap bij het laden.

// document.querySelectorAll('.dropbtn').forEach(button => {
//   // Selecteer alle dropdown-knoppen.
//   button.addEventListener('click', function (e) {
//       e.preventDefault(); // Voorkom standaard klikgedrag.
//       const dropdown = this.nextElementSibling; // Haalt het menu op dat volgt na de knop.
//       const isOpen = dropdown.style.display === 'block'; // Controleer of menu al open is.

//       document.querySelectorAll('.dropdown-content').forEach(menu => {
//           menu.style.display = 'none'; // Sluit alle dropdowns.
//       });

//       if (!isOpen) {
//           dropdown.style.display = 'block'; // Open alleen als hij nog niet open was.
//       }
//   });
// });

// document.addEventListener('click', function (e) {
//   // Klik buiten een dropdown sluit alle open dropdowns.
//   if (!e.target.closest('.dropdown')) {
//       document.querySelectorAll('.dropdown-content').forEach(menu => {
//           menu.style.display = 'none'; // Verberg elk menu.
//       });
//   }
// });
