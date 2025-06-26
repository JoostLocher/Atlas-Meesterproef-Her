gsap.registerPlugin(SplitText, ScrollTrigger, MorphSVGPlugin);

// ==============================
// scene 1
// ==============================
let tlScene1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-1",
    start: "top top",
    end: "+=800vh",
    pin: true,
    pinSpacing: true,
    scrub: 2,
  },
});

tlScene1
  .to(".adress", { y: "-100vh", duration: 1 }, 0)
  .to(".family", { y: "-100vh", duration: 1 }, 0)
  .to(".cloud-1", { x: "50vw", duration: 1 }, 0)
  .to(".cloud-2", { x: "50vw", duration: 1 }, 0)
  .to(".cloud-3", { x: "-5vw", duration: 1 }, 0)
  .to(".skyline-1", { x: "-100vw", y: "25vh", scale: 0.1, duration: 3 }, 0.2)
  .to(".skyline-2", { x: "100vw", y: "25vh", scale: 0.1, duration: 3 }, 0.2)
  .to(".tree-1", { x: "-250vw", scale: 10, duration: 3 }, 0.2)
  .to(".tree-2", { x: "250vw", scale: 10, duration: 3 }, 0.2)
  .to(".bike", { x: "-175vw", scale: 20, duration: 3 }, 0.2)
  .to(".house", { scale: 50, duration: 3 }, 0.2)
  .to(".scene-1-transition", { opacity: 1 }, 1)
  .to(".scene-1-transition-generic", {opacity: 1 }, 1);


// ==============================
// scene 2
// ==============================
gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-2",
    start: "top top",
    end: "bottom bottom",
    pin: ".chandelier",
    scrub: true,
  },
});

// ==============================
// scene 2 wedding
// ==============================
const splitWedding = new SplitText(".wedding-text", { type: "words, chars" });
gsap.set(splitWedding.chars, { opacity: 0 });
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-2-wedding",
      start: "top top",
      end: "+=1500vh",
      pin: true,
      scrub: 2,
    },
  })
  .from(".bride", { x: "30vw", duration: 0.4 }, 0)
  .from(".groom", { x: "-30vw", duration: 0.3 }, 0)
  .to(".groom", { scaleX: -1, duration: 0.1 }, 0.6)
  .to(".bride", { x: "-105vw" }, 0.7)
  .to(".groom", { x: "-105vw" }, 0.7)
  .to(
    splitWedding.chars,
    {
      opacity: 1,
      ease: "none",
      stagger: 0.005,
      duration: 0.005,
    },
    0
  );

// ==============================
// scene 2 children
// ==============================
const splitChildren = new SplitText(".children-text", { type: "words, chars" });
gsap.set(splitChildren.chars, { opacity: 0 });
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-2-children",
      start: "top top",
      end: "+=1750vh",
      pin: true,
      scrub: 2,
    },
  })
  .set(".woman-1", { scaleX: -1, duration: 0.1 }, 0)
  .fromTo(".woman-1", { x: "-80vw" }, { x: "0vw", duration: 0.4 }, 0)
  .from(".child-boy", { x: "-80vw", duration: 0.4 }, 0)
  .from(".baby", { x: "-80vw", duration: 0.4 }, 0)
  .from(".husband", { x: "-80vw", duration: 0.4 }, 0)
  .to(
    splitChildren.chars,
    {
      opacity: 1,
      ease: "none",
      stagger: 0.0005,
      duration: 0.0005,
    },
    0
  );

// ==============================
// scene 2 grandmas
// ==============================
const splitGrandma = new SplitText(".grandma-text", { type: "words, chars" });
gsap.set(splitGrandma.chars, { opacity: 0 });
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-2-grandmas",
      start: "top top",
      end: "+=1750vh",
      pin: true,
      scrub: 2,
    },
  })
  .from(".woman-2", { x: "45vw", duration: 0.3 }, 0.1)
  .from(".grandma-1", { x: "-70vw" }, 0.3)
  .to(
    splitGrandma.chars,
    {
      opacity: 1,
      ease: "none",
      stagger: 0.0005,
      duration: 0.0005,
    },
    0
  );

// ==============================
// scene 3
// ==============================
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-3",
      start: "top top",
      endTrigger: ".scene-4",
      end: "top 45%",
      pin: ".ground-4",
      scrub: 2,
    },
  })
  .fromTo(
    ".customer",
    { x: "-150vw" },
    { x: 0, duration: 0.3, stagger: { each: 0.2, from: "end" } },
    0
  )
  .to(".customer:nth-child(-n+6)", { scaleX: -1, duration: 0.1 }, 2.2)
  .set(".customer:nth-child(-n+6)", { scaleX: -1, duration: 0.1 }, 2.2)
  .fromTo(
    ".customer:nth-child(-n+6)",
    { x: 0 },
    { x: "-150vw", duration: 0.3 },
    2.8
  );

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-3-text-1",
      start: "top top",
      end: "+=1050dvh",
      pin: true,
      scrub: 2,
    },
  })
  .fromTo(
    ".dentist-text-1",
    { x: "-125vw" },
    {
      x: 0,
      duration: 0.1,
    },
    0
  )
  .to({}, { duration: 0.8 })
  .to(".dentist-text-1", { x: "125vw" }, 0.8);

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-3-text-2",
      start: "top top",
      end: "+=1050dvh",
      pin: true,
      scrub: 2,
    },
  })
  .fromTo(
    ".dentist-text-2",
    { x: "-125vw" },
    {
      x: 0,
      duration: 0.1,
    },
    0
  )
  .to({}, { duration: 0.8 })
  .to(".dentist-text-2", { x: "125vw" }, 0.8);

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-3-text-3",
      start: "top top",
      end: "+=1050dvh",
      pin: true,
      scrub: 2,
    },
  })
  .fromTo(
    ".dentist-text-3",
    { x: "-125vw" },
    {
      x: 0,
      duration: 0.1,
    },
    0
  )
  .to({}, { duration: 0.8 })
  .to(".dentist-text-3", { x: "125vw" }, 0.8);

// ==============================
// scene 4
// ==============================

// text pin
ScrollTrigger.create({
  trigger: ".scene-4-text",
  start: "top top",
  endTrigger: ".scene-4-basement",
  end: "bottom center",
  scrub: 3,
  pin: ".scene-4-text",
  pinSpacing: false,
});

// lamp pin
ScrollTrigger.create({
  trigger: ".scene-4-text",
  start: "top top",
  endTrigger: ".scene-4-basement",
  end: "bottom center",
  scrub: 3,
  pin: ".lamp-container",
  pinSpacing: false,
  onUpdate: (self) => {
    const swingCount = 4;
    const swing = Math.sin(self.progress * Math.PI * 2 * swingCount) * 4;
    gsap.set(".lamp", { rotation: swing });
  },
});

// basement animation
let tlBasement = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-4-familie",
    start: "bottom bottom",
    endTrigger: ".scene-4-basement",
    end: "bottom 37%",
    scrub: 3,
    pin: ".scene-4-familie",
    pinSpacing: false,
  },
});

tlBasement
  .fromTo(".scene-4-girl",
    { x: "-100dvw"},
    { x:0,
      ease: "power2.out",
    }, ">")
    .fromTo(".scene-4-mom",
    { x: "100dvw"},
    { x:0,
     ease: "power2.out",
    }, ">")
    .fromTo(".scene-4-dad",
    { x: "-100dvw"},
    { x:0,
      ease: "power2.out",
    }, ">")
    .fromTo(".scene-4-boy",
    { x: "100dvw"},
    { x:0,
      ease: "power2.out",
    }, ">")
;

// lamp out(dark) animation
let tlDark = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-4-dark",
    start: "top center",
    end: "top top",
    scrub: true,
  },
});

tlDark
.to(".scene-4-dark", { backgroundColor: "var(--color-gray-20)", duration: 1 }, "<")
.to(".scene-4-basement", { backgroundColor: "var(--color-gray-20)", duration: 1 }, "<")
  .to("#wire", { fill: "var(--color-gray-20)", duration: 1 }, "<")
  .to("#bulb", { fill: "var(--color-gray-20)", duration: 1 }, "<")
  .to("#scene-4-dad", { fill: "var(--color-gray-20)", duration: 1 }, "<")
  .to("#scene-4-girl", { fill: "var(--color-gray-20)", duration: 1 }, "<")
  .to("#scene-4-mom", { fill: "var(--color-gray-20)", duration: 1 }, "<")
  .to("#scene-4-boy", { fill: "var(--color-gray-20)", duration: 1 }, "<")
  .fromTo(
    ".scene-4-dark p",
    { x: "-150vw" },
    {
      x: 0,
      stagger: 2,
      ease: "power2.out",
    },
    ">"
  );

// ==============================
// scene 5
// ==============================

let tlCloud = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-5-train",
    start: "top 80%",
    end: "top 20%",
    scrub: 3,
  },
});

tlCloud
  .fromTo(
    ".train-cloud-1",
    { opacity: 0, y: "25dvh" },
    { opacity: 1, y: 10, duration: 1 },
    0
  )
  .fromTo(
    ".train-cloud-2",
    { opacity: 0, y: "25dvh" },
    { opacity: 1, y: 50, duration: 1 },
    0.2
  )
  .fromTo(
    ".train-cloud-3",
    { opacity: 0, y: "25dvh" },
    { opacity: 1, y: 90, duration: 1 },
    0.4
  )
  .fromTo(
    ".train-cloud-4",
    { opacity: 0, y: "25dvh" },
    { opacity: 1, y: 20, duration: 1 },
    0.6
  );

// train animation
let tlTrain = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-5-train",
    start: "top 80%",
    end: "top 30%",
    scrub: 3,
  },
});

tlTrain
  .fromTo(".train", { x: "100dvw" }, { x: "-100dvw" }, 0);

// cloud pin
ScrollTrigger.create({
  trigger: ".scene-5-clouds",
  start: "top top",
  endTrigger: ".scene-5-names",
  end: "bottom bottom",
  pin: ".scene-5-clouds",
  pinSpacing: false,
});

// cloud to bird morph
let tlBird = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-5-clouds",
    start: "top top",
    endTrigger: ".scene-5-names",
    end: "bottom bottom",
    scrub: 3,
  },
});

tlBird
  .to("#train-cloud-1", { morphSVG: "#bird-1", ease: "power1.inOut" })
  .to("#train-cloud-2", { morphSVG: "#bird-2", ease: "power1.inOut" })
  .to("#train-cloud-3", { morphSVG: "#bird-3", ease: "power1.inOut" })
  .to("#train-cloud-4", { morphSVG: "#bird-4", ease: "power1.inOut" });

// names
let tlScene5Names = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-5-names",
    start: "top 80%",
    end: "bottom bottom",
    scrub: 3,
  },
});

tlScene5Names
  .fromTo(".scene-5-names-text", { x: "100dvw" },
    {
      x: 0,
      stagger: 2,
      ease: "power2.out",
    },)
  .fromTo(".scene-5-names-dead li", 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, ease: "power2.out", stagger: 0.3 }, 
    "<0.5"
  )
  .fromTo(".scene-5-names-alive svg", {opacity:0}, {opacity: 1, stagger:0.3},0)



// ==============================
// generic
// ==============================
 
// Selecteer elk blok
document.querySelectorAll('.story-block').forEach((block, index) => {
  let content = block.querySelectorAll('.text-content, img');
 
 
  // Timeline per blok
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: block,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
    }
  });
 
  // Content komt naar binnen
  tl.to(content, {
    opacity: 1,
    y: 0,
    stagger: 1,
    duration: 1,
    ease: "power2.out"
  });
 
  // Content gaat weer weg
  tl.to(content, {
    opacity: 0,
    y: -300,
    stagger: 1,
    duration: 1,
    ease: "power2.in"
  });
});
 

// ==============================
// scene 5 generic
// ==============================

let tlCloudGeneric = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-5-train-generic",
    start: "top 80%",
    end: "top 35%",
    scrub: 3,
  },
});

tlCloudGeneric
  .fromTo(
    ".train-cloud-1-generic",
    { opacity: 0, y: "25dvh" },
    { opacity: 1, y: 10, duration: 1 },
    0
  )
  .fromTo(
    ".train-cloud-2-generic",
    { opacity: 0, y: "25dvh" },
    { opacity: 1, y: 50, duration: 1 },
    0.2
  )
  .fromTo(
    ".train-cloud-3-generic",
    { opacity: 0, y: "25dvh" },
    { opacity: 1, y: 90, duration: 1 },
    0.4
  )
  .fromTo(
    ".train-cloud-4-generic",
    { opacity: 0, y: "25dvh" },
    { opacity: 1, y: 20, duration: 1 },
    0.6
  );

// train animation
let tlTrainGeneric = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-5-train-generic",
    start: "top 80%",
    end: "top 35%",
    scrub: 3,
  },
});

tlTrainGeneric
  .fromTo(".train-generic", { x: "100dvw" }, { x: "-100dvw" }, 0);

// cloud to bird morph
let tlBirdGeneric = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-5-clouds-generic",
    start: "top top",
    endTrigger: ".scene-5-generic",
    end: "bottom bottom",
    scrub: 3,
  },
});

tlBirdGeneric
  .to("#train-cloud-1-generic", { morphSVG: "#bird-1-generic", ease: "power1.inOut" })
  .to("#train-cloud-2-generic", { morphSVG: "#bird-2-generic", ease: "power1.inOut" })
  .to("#train-cloud-3-generic", { morphSVG: "#bird-3-generic", ease: "power1.inOut" })
  .to("#train-cloud-4-generic", { morphSVG: "#bird-4-generic", ease: "power1.inOut" });
 

gsap.fromTo(".end-text-generic",
  {opacity: 0},
  {
    opacity: 1,
    scrollTrigger: {
      trigger: ".scene-5-generic",
      start: "top 10%",
      end: "bottom bottom",
      scrub: 6,
    }
  }
);


document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scroll-up-button");
  let lastScroll = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll < lastScroll && currentScroll > 100) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }

    lastScroll = currentScroll;
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});