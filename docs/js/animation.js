// ====== GLOBAL PAGE LOAD ANIMATIONS ======

// Fade + slide in hero section elements
gsap.from(".hero-logo-text, .tagline, .hero-highlights, .hero-buttons", {
  opacity: 0,
  y: 40,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out"
});

// ====== PARALLAX FLOATING ELEMENTS ======
gsap.to(".floating-element", {
  y: "+=20",
  rotation: 2,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Fade + slide in About section image with scroll-linked motion
gsap.fromTo("#about img",
  {
    opacity: 0,
    x: -200 // start off farther left for a more dramatic effect
  },
  {
    opacity: 1,
    x: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",     // when top of About hits 80% of viewport
      end: "top 30%",       // image finishes animation when top reaches 30% of viewport
      scrub: false,          // ties animation progress to scroll
      markers: false,        // shows start/end markers
      // optional: pin the image while animating
      // pin: "#about img"
    }
  }
);

// ====== SERVICE CARDS SEQUENTIAL REVEAL ======
gsap.from(".service-card", {
  scrollTrigger: {
    trigger: ".services-grid",
    start: "top 80%"
  },
  opacity: 0,
  y: 0,
  stagger: 0.2,
  duration: 0.8,
  ease: "power2.out"
});

// ====== CARD HOVER ZOOM + GLOW ======
document.querySelectorAll(".musician-car").forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)", duration: 0.3 });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { scale: 1, boxShadow: "0 0px 0px rgba(0,0,0,0)", duration: 0.3 });
  });
});


// ====== FOOTER FLOATING LABELS ======
document.querySelectorAll(".form-input").forEach(input => {
  input.addEventListener("focus", () => {
    gsap.to(input.nextElementSibling, { y: -20, fontSize: "0.8em", duration: 0.3, ease: "power2.out" });
  });
  input.addEventListener("blur", () => {
    if (!input.value) {
      gsap.to(input.nextElementSibling, { y: 0, fontSize: "1em", duration: 0.3, ease: "power2.inOut" });
    }
  });
});



// Top service: slide right and slightly scale
gsap.to(".top-service .service-img", {
  x: 300,
  scale: 1.35,
  ease: "none",
  scrollTrigger: {
    trigger: ".top-service",
    start: "top 90%",    // starts when section is near bottom of viewport
    end: "bottom top",    // ends when section leaves top
    scrub: true,
    markers: false
  }
});

// Bottom service: slide left and slightly scale
gsap.to(".bottom-service .service-img", {
  x: -300,
  scale: 1.35,
  ease: "none",
  scrollTrigger: {
    trigger: ".bottom-service",
    start: "top 90%",    // starts lower in viewport
    end: "bottom top",
    scrub: true,
    markers: false
  }
});




