// ---- Console Load Log ----
console.log("Letigo Studios site loaded.");


// ---- Stuff for session musician scrolling shit ----


 const gallery = document.querySelector('.musicians-gallery');

if (gallery) {
  // Just basic scroll functionality, no cloning or loop resets

  // Optional: You can add any custom behavior on scroll here, 
  // but for now, it just lets the user scroll freely.
  gallery.addEventListener('scroll', () => {
    // You can add things like lazy loading or animations here if desired.
  });
}

// ---- Parallax Effect ----
const parallax = document.querySelector('.parallax-section');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  // Move the background slower than scroll for subtle effect
  parallax.style.backgroundPositionY = `${scrollTop * 0.12}px`;
});



// ---- Function for A/B buttons on sample players ----

document.querySelectorAll('.sample-player').forEach(player => {
  const audioA = new Audio(player.dataset.audioA);
  const audioB = new Audio(player.dataset.audioB);

  let current = audioA;

  const playBtn = player.querySelector('.play-pause');
  const btnA = player.querySelector('.switch-a');
  const btnB = player.querySelector('.switch-b');
  const progressBar = player.querySelector('.progress-bar');
  const progress = player.querySelector('.progress');

  // Play/Pause logic
  playBtn.addEventListener('click', () => {
    if (current.paused) {
      current.play();
      playBtn.textContent = '⏸';
    } else {
      current.pause();
      playBtn.textContent = '▶';
    }
  });

  // Update progress bar
  function updateProgress() {
    progress.style.width = (current.currentTime / current.duration) * 100 + '%';
  }
  audioA.addEventListener('timeupdate', updateProgress);
  audioB.addEventListener('timeupdate', updateProgress);

  // Click to seek
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioA.currentTime = percent * audioA.duration;
    audioB.currentTime = percent * audioB.duration;
  });

  // Switch to Mix A
  btnA.addEventListener('click', () => {
    if (current === audioA) return;
    const time = current.currentTime;
    const wasPlaying = !current.paused;
    current.pause();
    audioA.currentTime = time;
    current = audioA;
    if (wasPlaying) current.play();
    btnA.classList.add('active');
    btnB.classList.remove('active');
  });

  // Switch to Mix B
  btnB.addEventListener('click', () => {
    if (current === audioB) return;
    const time = current.currentTime;
    const wasPlaying = !current.paused;
    current.pause();
    audioB.currentTime = time;
    current = audioB;
    if (wasPlaying) current.play();
    btnB.classList.add('active');
    btnA.classList.remove('active');
  });
});


