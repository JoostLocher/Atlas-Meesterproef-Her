document.addEventListener("DOMContentLoaded", function () {
  const yellowShapes = Array.from(
    document.querySelectorAll(
      'svg [fill="#F9EA3E"], svg [fill="#f9ea3e"], svg .cls-1, svg .cls-2',
    ),
  );

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    const keep = Math.ceil(yellowShapes.length * 0.05);

    for (let i = yellowShapes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [yellowShapes[i], yellowShapes[j]] = [yellowShapes[j], yellowShapes[i]];
    }

    yellowShapes.forEach((shape, i) => {
      if (i >= keep) {
        shape.setAttribute("fill", "#444444");
        shape.classList.remove("cls-1", "cls-2");
      }
    });
  } else {
    yellowShapes.forEach((el) => el.classList.add("yellow-anim"));

    for (let i = yellowShapes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [yellowShapes[i], yellowShapes[j]] = [yellowShapes[j], yellowShapes[i]];
    }

    yellowShapes.forEach((shape, i) => {
      setTimeout(() => {
        shape.setAttribute("fill", "#444444");
        shape.classList.remove("cls-1", "cls-2");
      }, i * 500);
    });
  }
});



// window.addEventListener("DOMContentLoaded", () => {
//   // Wacht opnieuw op volledige HTML-laadstatus voor dit aparte blok.

//   const wrapper = document.querySelector(".wrapper"); // Selecteert de container met de klasse 'wrapper'.
//   const homes = wrapper.querySelectorAll("#huis").length; // Telt hoeveel elementen met ID 'huis' er zijn.

//   if (homes >= 4) {
//     // Alleen als er 4 of meer huizen zijn.
//     const secondsPerHome = 1.5; // Berekent tijd per huis.
//     const minDuration = 20; // Minimale animatieduur in seconden.
//     const maxDuration = 60; // Maximale animatieduur in seconden.

//     let duration = homes * secondsPerHome; // Bereken de basisduur.
//     duration = Math.max(minDuration, Math.min(duration, maxDuration)); 
//     // Beperk de duur tot tussen min en max.

//     wrapper.style.animationDuration = `${duration}s`; // Zet de animatieduur op de wrapper.
//   } else {
//     wrapper.style.animation = "none"; // Zet animatie uit als er minder dan 4 huizen zijn.
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".street-container");
  const wrapper = document.querySelector(".wrapper");

  let paused = false;
  const speed = 1.2;

  function scrollLoop() {
    if (!paused) {
      container.scrollLeft += speed;
    }
    requestAnimationFrame(scrollLoop);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    scrollLoop();
  }

  container.addEventListener("mouseenter", () => paused = true);
  container.addEventListener("mouseleave", () => paused = false);

  container.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
    paused = true;
    clearTimeout(container._pauseTimer);
    container._pauseTimer = setTimeout(() => paused = false, 2000);
  }, { passive: false });

  document.querySelectorAll('.huis').forEach((home) => {
  home.setAttribute('tabindex', '0'); // focusable maken

  home.addEventListener('focus', () => {
    paused = true;

    const container = document.querySelector('.street-container');
    const scrollTo = home.offsetLeft - (container.clientWidth / 2) + (home.offsetWidth / 2);

    container.scrollTo({
      left: scrollTo,
      behavior: 'smooth',
    });
  });

  home.addEventListener('blur', () => {
    clearTimeout(container._pauseTimer);
    container._pauseTimer = setTimeout(() => paused = false, 2000);
  });
});

});
