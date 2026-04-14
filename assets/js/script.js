/* ========================================
   HUGS LIFE HOLISTIC - Vanilla JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Sticky Nav on Scroll ----
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ---- Mobile Nav Toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
      spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = toggle.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll Animations (Intersection Observer) ----
  const animEls = document.querySelectorAll('.animate-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (entry.target.dataset.delay || 0) * 1);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach(el => observer.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

  // ---- Staggered children animation ----
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = (i * 100) + 'ms';
      child.classList.add('animate-in');
    });
  });

  // ---- Contact Form Handling ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-btn');
      const success = document.getElementById('formSuccess');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        if (success) {
          success.style.display = 'block';
          setTimeout(() => { success.style.display = 'none'; }, 4000);
        }
      }, 1200);
    });
  }

  // ---- Gallery Tabs ----
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  if (galleryTabs.length > 0) {
    galleryTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        galleryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Counter Animation ----
  function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current) + (counter.dataset.suffix || '');
      }, 16);
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObs.disconnect();
      }
    }, { threshold: 0.3 });
    statsObs.observe(statsSection);
  }

  // ---- Smooth scroll for anchors ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
