// Image rotation for .profile-image img
document.querySelectorAll('.profile-image').forEach(container => {
  const imgElement = container.querySelector('img');
  const imagesAttr = container.dataset.images;
  if (!imagesAttr) return; // skip if no images listed

  const images = imagesAttr.split(',').map(s => s.trim());
  let currentIndex = 0;

  // Set initial transition style
  imgElement.style.transition = 'opacity 0.6s ease-in-out';

  function fadeToNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    // Fade out
    imgElement.style.opacity = 0;

    setTimeout(() => {
      imgElement.src = images[currentIndex];
      imgElement.style.opacity = 1;
    }, 600);
  }

  setInterval(fadeToNextImage, 4500);
});


// Audio solo button functionality
// Keep a global list of all audio objects currently playing
const allAudios = [];

document.querySelectorAll('.sample-player').forEach(player => {
  const fullAudio = new Audio(player.dataset.audioFull);
  const soloAudio = new Audio(player.dataset.audioSolo);

  // Add both audios to global array for management
  allAudios.push(fullAudio, soloAudio);

  let current = fullAudio;      // Start with full mix
  let isSoloed = false;

  const playBtn = player.querySelector('.play-pause');
  const soloBtn = player.querySelector('.solo-button');
  const progressBar = player.querySelector('.progress-bar');
  const progress = player.querySelector('.progress');

  // Helper function: pause all other audios except the current one
  function pauseOthers() {
    allAudios.forEach(audio => {
      if (audio !== current && !audio.paused) {
        audio.pause();
        // Also reset any play buttons that might be affected
        // (You may want to sync UI here if needed)
      }
    });
  }

  // Play/pause toggle
  playBtn.addEventListener('click', () => {
    if (current.paused) {
      pauseOthers();     // Pause any other playing audios
      current.play();
      playBtn.textContent = '⏸';
    } else {
      current.pause();
      playBtn.textContent = '▶';
    }
  });

  // Update progress bar based on current audio time
  function updateProgress() {
    if (!isNaN(current.duration) && current.duration > 0) {
      const percent = (current.currentTime / current.duration) * 100;
      progress.style.width = percent + '%';
    }
  }
  fullAudio.addEventListener('timeupdate', updateProgress);
  soloAudio.addEventListener('timeupdate', updateProgress);

  // Clicking progress bar seeks both audios to keep synced
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    fullAudio.currentTime = percent * fullAudio.duration;
    soloAudio.currentTime = percent * soloAudio.duration;
    updateProgress();
  });

  // Solo toggle button functionality
  soloBtn.addEventListener('click', () => {
    const wasPlaying = !current.paused;
    const currentTime = current.currentTime;

    // Pause current audio before switch
    current.pause();

    if (!isSoloed) {
      // Switch to solo audio
      current = soloAudio;
      soloBtn.textContent = 'Unsolo';
      soloBtn.classList.add('solo-active');
      isSoloed = true;
    } else {
      // Switch back to full mix
      current = fullAudio;
      soloBtn.textContent = 'Solo';
      soloBtn.classList.remove('solo-active');
      isSoloed = false;
    }

    // Sync new audio to current time
    current.currentTime = currentTime;

    if (wasPlaying) {
      pauseOthers();   // Pause other audios before playing new one
      current.play();
      playBtn.textContent = '⏸';
    } else {
      playBtn.textContent = '▶';
    }
  });

  // Optional: Pause both audios if one ends to reset UI
  fullAudio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
  });
  soloAudio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
  });
});




// Contact modal open/close
const contactBtn = document.getElementById('contactBtn');
const modal = document.getElementById('contactModal');
const closeBtn = modal.querySelector('.close');

contactBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal on clicking outside modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Form submission placeholder
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form submission functionality not yet implemented.');
  modal.style.display = 'none';

  // TODO: Add real email sending & SMS notification backend integration here.
});
