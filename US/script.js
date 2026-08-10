const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Reveal sections as the visitor scrolls.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.rise').forEach((element) => revealObserver.observe(element));

// Photo modal.
const modal = $('#photoModal');
const modalImage = $('#modalImage');
const modalCaption = $('#modalCaption');

$$('.memory').forEach((memory) => {
  memory.addEventListener('click', () => {
    const image = memory.querySelector('img');
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalCaption.textContent = memory.dataset.caption;
    modal.hidden = false;
  });
});

const closeModal = () => { modal.hidden = true; };
$('#closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

// Final surprise.
$('#yesButton').addEventListener('click', () => {
  $('#finalAnswer').textContent = 'yay. now come here so I can give you the biggest hug ever ♡';
  makeHearts();
});
$('#maybeButton').addEventListener('click', () => {
  $('#finalAnswer').textContent = 'I respect the dramatic pause… but I’m still voting for us. ♡';
});

function makeHearts() {
  for (let count = 0; count < 28; count += 1) {
    const heart = document.createElement('span');
    heart.textContent = '♥';
    heart.style.cssText = `position:fixed;left:${35 + Math.random() * 30}vw;top:${55 + Math.random() * 15}vh;color:#ff4f87;font-size:${14 + Math.random() * 20}px;z-index:60;pointer-events:none;transition:transform 1.5s ease,opacity 1.5s ease;`;
    document.body.append(heart);
    requestAnimationFrame(() => { heart.style.transform = `translate(${(Math.random() - .5) * 260}px,${-180 - Math.random() * 260}px) rotate(${Math.random() * 180}deg)`; heart.style.opacity = '0'; });
    setTimeout(() => heart.remove(), 1600);
  }
}

// Optional music: add an MP3 and set its source in index.html.
const song = $('#ourSong');
const soundButton = $('#soundButton');
soundButton.addEventListener('click', async () => {
  if (!song.querySelector('source').getAttribute('src')) {
    $('#finalAnswer').textContent = 'Add your MP3 filename in index.html to play your song here. ♫';
    return;
  }
  if (song.paused) {
    try { await song.play(); soundButton.setAttribute('aria-pressed', 'true'); $('#soundText').textContent = 'pause song'; }
    catch { $('#finalAnswer').textContent = 'Tap the button once more to let your browser play the song.'; }
  } else {
    song.pause(); soundButton.setAttribute('aria-pressed', 'false'); $('#soundText').textContent = 'our song';
  }
});
