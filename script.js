document.addEventListener('DOMContentLoaded', () => {
  // 1. Variáveis da Navbar
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // 2. Efeito de Scroll na Navbar (Troca de Cores)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      // Fundo branco
      navbar.classList.add('glass-light', 'shadow-lg', 'py-3');
      navbar.classList.remove('py-5', 'bg-transparent');
      
      // Letras escuras nos links e botão mobile
      navLinks.forEach(link => {
        link.classList.remove('text-white', 'hover:text-gray-200');
        link.classList.add('text-gray-700', 'hover:text-brand-blue');
      });
      if (mobileToggle) {
        mobileToggle.classList.remove('text-white');
        mobileToggle.classList.add('text-brand-blue');
      }
    } else {
      // Fundo transparente
      navbar.classList.remove('glass-light', 'shadow-lg', 'py-3');
      navbar.classList.add('py-5', 'bg-transparent');
      
      // Letras brancas nos links e botão mobile
      navLinks.forEach(link => {
        link.classList.remove('text-gray-700', 'hover:text-brand-blue');
        link.classList.add('text-white', 'hover:text-gray-200');
      });
      if (mobileToggle) {
        mobileToggle.classList.remove('text-brand-blue');
        mobileToggle.classList.add('text-white');
      }
    }
  });

  // 3. Toggle do Menu Mobile
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = mobileToggle.querySelector('i');
      if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // 4. Animações de Scroll (Reveal)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // 5. Animação dos Contadores (Números)
  const statsSection = document.getElementById('stats-section');
  let animated = false;

  const animateValue = (id, end, duration, suffix = '') => {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * end) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateValue('stat-1', 100, 2000, '%');
        animateValue('stat-2', 6, 1500, '');
        animateValue('stat-3', 360, 2000, '°');
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});