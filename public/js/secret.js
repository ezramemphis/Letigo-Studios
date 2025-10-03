// ===== FLOATING IMAGE ANIMATIONS =====

// Right floating image (ezra-2.png) — float, rotate, wobble opposite direction
gsap.to(".floating-image", {
  rotation: -360,
  x: "+=40",
  y: "+=30",
  scale: 1.1,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Optional: staggered crazy wiggle for all shapes together
gsap.to([".shape-square", ".floating-image"], {
  rotation: "+=20",
  duration: 0.5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});

// ===== PASSWORD-TRIGGERED SHAPES & MUSIC =====

// Hide shapes initially
const shapes = document.querySelectorAll(".floating-image");
shapes.forEach(s => s.style.display = "none");

// Create audio element for music
const kingMusic = new Audio("audio/king-music.mp3");

// ===== EAGLE TALLY VARIABLES =====
let eagleCount = 0;
const eagleTally = document.getElementById("eagle-tally");
const eagleCountDisplay = document.getElementById("eagle-count");

// Function to show shapes and play music
function unlockShapes() {
  // Show shapes
  shapes.forEach(s => s.style.display = "block");

  // Play music
  kingMusic.play();

  // Slide down the Eagle Tally
  gsap.to(eagleTally, { top: 20, duration: 0.8, ease: "power2.out" });

  // Hide shapes and stop music after 100 seconds
  setTimeout(() => {
    shapes.forEach(s => s.style.display = "none");
    kingMusic.pause();
    kingMusic.currentTime = 0;

    // Hide Eagle Tally when time is up
    gsap.to(eagleTally, { top: -120, duration: 0.8, ease: "power2.in" });
  }, 100000);
}

// Listen for Mac key combo Cmd+Shift+K (can add Windows Ctrl+Shift+K too)
document.addEventListener("keydown", (e) => {
  const isMacCombo = e.metaKey && e.shiftKey && e.key.toLowerCase() === "k";
  const isWinCombo = e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "k";

  if (isMacCombo || isWinCombo) {
    const password = prompt("Enter password to unlock:");
    if (password === "king") {
      unlockShapes();
    } else {
      alert("Incorrect password.");
    }
  }
});

// ===== EAGLE SPAWNING & EXPLOSION =====

// Select the floating image
const floatingImage = document.querySelector('.floating-image');

// Function to generate random number in a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Click the floating image to spawn an eagle
floatingImage.addEventListener('click', () => {
  // Create eagle emoji
  const eagle = document.createElement('div');
  eagle.textContent = '🦅';
  eagle.style.position = 'fixed';
  eagle.style.left = random(0, window.innerWidth - 60) + 'px';
  eagle.style.top = random(0, window.innerHeight - 60) + 'px';
  eagle.style.fontSize = '60px';
  eagle.style.cursor = 'pointer';
  eagle.style.zIndex = 1000;
  document.body.appendChild(eagle);

  // Click event for the eagle to play sound and explode
  eagle.addEventListener('click', () => {
    // Play eagle sound at random speed
    const eagleSound = new Audio('audio/eagle.wav');
    eagleSound.volume = 0.38;
    eagleSound.playbackRate = random(0.8, 1.2);
    eagleSound.currentTime = 0;
    eagleSound.play();

    const particles = [];
    const numParticles = 12;

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      const p = document.createElement('div');
      p.textContent = '🦅';
      p.style.position = 'fixed';
      p.style.left = eagle.getBoundingClientRect().left + 'px';
      p.style.top = eagle.getBoundingClientRect().top + 'px';
      p.style.fontSize = '40px';
      p.style.pointerEvents = 'none';
      p.style.zIndex = 1000;
      document.body.appendChild(p);
      particles.push(p);

      // Animate particle explosion
      gsap.to(p, {
        x: random(-150, 150),
        y: random(-150, 150),
        rotation: random(-720, 720),
        scale: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => p.remove()
      });
    }

    // Increment eagle tally
    eagleCount++;
    eagleCountDisplay.textContent = eagleCount;

    // Remove the clicked eagle itself
    eagle.remove();
  });
});
