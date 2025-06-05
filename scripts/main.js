document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in-up').forEach((el, i) => {
    el.style.animationDelay = (i * 0.2) + 's';
  });
});
