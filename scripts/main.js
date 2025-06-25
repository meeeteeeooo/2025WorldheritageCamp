document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in-up').forEach((el, i) => {
    el.style.animationDelay = (i * 0.2) + 's';
  });

  // スライダー機能
  const slides = document.querySelectorAll('.slider .slide');
  const slidesContainer = document.querySelector('.slider .slides');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const indicatorsContainer = document.querySelector('.slider-indicators');
  let current = 0;
  let autoSlideTimer = null;
  let indicatorDots = [];

  function updateIndicators(index) {
    if (!indicatorDots.length) return;
    indicatorDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function showSlide(index) {
    if (!slidesContainer) return;
    // 範囲チェック
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    slidesContainer.style.transform = `translateX(${-index * 100}%)`;
    current = index;
    updateIndicators(index);
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function startAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function setupIndicators() {
    if (!indicatorsContainer) return;
    indicatorsContainer.innerHTML = '';
    indicatorDots = [];
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'slider-indicator-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        showSlide(i);
        startAutoSlide();
      });
      indicatorsContainer.appendChild(dot);
      indicatorDots.push(dot);
    }
  }

  if (prevBtn && nextBtn && slides.length && slidesContainer && indicatorsContainer) {
    setupIndicators();

    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoSlide();
    });

    showSlide(current);
    startAutoSlide();
  }

  // 参加費プルダウン
  const feeArea = document.getElementById('fee-area');
  const feeAmount = document.getElementById('fee-amount');
  const feeAmountMiddle = document.getElementById('fee-amount-middle');
  if (feeArea && feeAmount && feeAmountMiddle) {
    const feeMap = {
      kanto: { elementary: '40,000円', junior: '55,000円' },
      kansai: { elementary: '30,000円', junior: '40,000円' },
      nagoya: { elementary: '35,000円', junior: '45,000円' },
      hiroshima: { elementary: '10,000円', junior: '10,000円' }
    };
    function updateFee() {
      const val = feeMap[feeArea.value] || feeMap['kanto'];
      feeAmount.textContent = val.elementary;
      feeAmountMiddle.textContent = val.junior;
    }
    feeArea.addEventListener('change', updateFee);
    updateFee();
  }

  // 学生カード ポップアップ
  const studentCards = document.querySelectorAll('.student-list .student');
  const modal = document.getElementById('student-modal');
  const modalTitle = document.getElementById('student-modal-title');
  const modalMsg = document.getElementById('student-modal-message');
  const modalClose = document.querySelector('.student-modal-close');

  if (studentCards.length && modal && modalTitle && modalMsg && modalClose) {
    studentCards.forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const name = card.getAttribute('data-name') || '';
        const msg = card.getAttribute('data-message') || '';
        modalTitle.textContent = name + 'から一言！';
        modalMsg.textContent = msg;
        modal.style.display = 'flex';
        // フォーカスを閉じるボタンに
        modalClose.focus();
      });
    });
    function closeModal() {
      modal.style.display = 'none';
    }
    modalClose.addEventListener('click', closeModal);
    modalClose.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') closeModal();
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', e => {
      if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
        closeModal();
      }
    });
  }

  // ページトップへ戻るボタン
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
