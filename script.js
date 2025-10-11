const slides = document.querySelectorAll('.slide');
let current = 0;
let isTransitioning = false;

function updateSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'left', 'right', 'transitioning');
    if (i === current) slide.classList.add('active');
    else if (i === current - 1) slide.classList.add('left');
    else if (i === current + 1) slide.classList.add('right');
  });
}

function changeSlide(direction) {
  if (isTransitioning) return;

  const next =
    direction === 'next'
      ? current + 1
      : current - 1;

  if (next < 0 || next >= slides.length) return;

  isTransitioning = true;

  slides[current].classList.add('transitioning');
  slides[next].classList.add('transitioning');

  current = next;
  updateSlides();

  // После завершения анимации снова разрешаем переключение
  setTimeout(() => {
    isTransitioning = false;
  }, 600);
}

function nextSlide() {
  changeSlide('next');
}

function prevSlide() {
  changeSlide('prev');
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
