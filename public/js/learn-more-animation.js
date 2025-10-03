// ===== Learn More Page Animations (GSAP) =====

// --- Header Fade + Slide ---
gsap.from(".services-header h1, .services-header p", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  stagger: 0.12,
  ease: "power2.out"
});

// --- GSAP Timeline for Idle Animation ---
const h1Timeline = gsap.timeline({ repeat: -1, yoyo: true });

// Scale / subtle "breathing"
h1Timeline.to(".services-header h1", {
  scale: 1.03,
  duration: 2,
  ease: "sine.inOut"
}, 0);

// Color pulse
h1Timeline.to(".services-header h1", {
  color: "#b3c7dbff", // blue
  duration: 2,
  ease: "sine.inOut"
}, 0);

// --- Cards Fade + Scale In ---
gsap.from(".service-card, .pricing-card", {
  opacity: 0,
  y: 30,
  scale: 0.95,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
});

// --- Cards Hover Lift & Shadow ---
document.querySelectorAll(".service-card, .pricing-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { y: -8, boxShadow: "0 15px 25px rgba(0,0,0,0.5)", rotateY:5, rotateX:3, duration: 0.3 });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { y: 0, boxShadow: "0 5px 20px rgba(0,0,0,0.3)", rotateY:0, rotateX:0, duration: 0.3 });
  });
});

// First gradient animation (blue)
gsap.to(".services-header", {
  backgroundImage: "linear-gradient(135deg, #080a0d, #224172)",
  duration: 8,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Second gradient animation (pink), with slightly different duration and delay
gsap.to(".services-header", {
  backgroundImage: "linear-gradient(135deg, rgba(189, 137, 228, 0.4), rgba(17,10,16,0.7))",
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  delay: 2
});




// Create a container for particles
const header = document.querySelector(".services-header");
const numParticles = 30; // number of particles

for (let i = 0; i < numParticles; i++) {
  const particle = document.createElement("div");
  particle.classList.add("header-particle");
  
  // Random initial position
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  
  // Random size
  particle.style.width = particle.style.height = (Math.random() * 6 + 2) + "px";

  header.appendChild(particle);

  // Animate particle movement with GSAP
  gsap.to(particle, {
    x: "+=" + (Math.random() * 50 - 25),
    y: "+=" + (Math.random() * 50 - 25),
    opacity: Math.random() * 0.6 + 0.2,
    duration: Math.random() * 6 + 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: Math.random() * 3
  });
}



