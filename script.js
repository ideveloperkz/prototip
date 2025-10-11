const slides = document.querySelectorAll('.slide');
let current = 0;

function updateSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'left', 'right');
    if (i === current) slide.classList.add('active');
    else if (i === current - 1) slide.classList.add('left');
    else if (i === current + 1) slide.classList.add('right');
  });
}

function nextSlide() {
  if (current < slides.length - 1) {
    current++;
    updateSlides();
  }
}

function prevSlide() {
  if (current > 0) {
    current--;
    updateSlides();
  }
}

// Поддержка свайпов
let startX = 0;
document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) nextSlide();
    else prevSlide();
  }
});

updateSlides();
