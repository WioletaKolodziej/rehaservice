document.addEventListener('DOMContentLoaded', () => {
  const serviceForm = document.querySelector('#service-form');

  if (serviceForm) {
    serviceForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(serviceForm);
      const getValue = (name) => String(formData.get(name) || '').trim() || '-';
      const company = getValue('company');
      const person = getValue('person');
      const manufacturer = getValue('manufacturer');
      const serial = getValue('serial');
      const serviceDate = getValue('serviceDate');
      const contact = getValue('contact');
      const problem = getValue('problem');

      const subject = `Zgłoszenie serwisowe - ${company}`;
      const body = [
        'Dzień dobry,',
        '',
        'proszę o kontakt w sprawie zgłoszenia serwisowego.',
        '',
        `Firma: ${company}`,
        `Osoba zgłaszająca: ${person}`,
        `Kontakt: ${contact}`,
        `Producent: ${manufacturer}`,
        `Numer seryjny: ${serial}`,
        `Preferowana data serwisu: ${serviceDate}`,
        '',
        'Opis problemu:',
        problem,
        '',
        'Pozdrawiam',
      ].join('\n');

      window.location.href = `mailto:service@rehaservice.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof window.IntersectionObserver !== 'function') {
    return;
  }

  const runOnNextFrame =
    typeof window.requestAnimationFrame === 'function'
      ? window.requestAnimationFrame.bind(window)
      : (callback) => window.setTimeout(callback, 16);

  const heroTargets = [
    '.hero-left img',
    '.contact-info',
    '.logo',
    '.hero-right h1',
    '.hero-right .subtitle',
    '.hero-right .btn-primary',
  ];

  const sectionConfigs = [
    { root: '#inspections', items: ['h2', '.inspection-boxes .box', '.inspection-stats > div'] },
    { root: '#features', items: ['h2', '.feature-boxes .box'] },
    { root: '#about', items: ['.about-left img', 'h2', '.about-right > p', '.about-points .point'] },
    { root: '#repairs', items: ['h3[role="heading"]', '.repairs-info > p', '.manufacturers', '.pricing'] },
    { root: '.section-contact', items: ['h2', '.contact-content > p', '.btn-secondary'] },
    { root: '.service-form-section', items: ['.form-intro', '.service-form'] },
    { root: '#details', items: ['h3', 'p'] },
  ];

  const body = document.body;
  const revealElements = [];

  body.classList.add('has-animations');

  heroTargets.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (!element) return;

    element.classList.add('hero-intro');
    element.style.setProperty('--intro-delay', `${120 + index * 110}ms`);
  });

  sectionConfigs.forEach(({ root, items }) => {
    const section = document.querySelector(root);
    if (!section) return;

    const localElements = [];
    items.forEach((selector) => {
      section.querySelectorAll(selector).forEach((element) => {
        localElements.push(element);
      });
    });

    localElements.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      element.style.setProperty('--reveal-delay', `${index * 90}ms`);

      if (element.matches('.box, .point, .pricing, .service-form, .inspection-stats > div')) {
        element.classList.add('reveal-card');
      } else {
        element.classList.add('reveal-text');
      }

      if (index % 3 === 1) element.classList.add('reveal-left');
      if (index % 3 === 2) element.classList.add('reveal-right');

      revealElements.push(element);
    });
  });

  runOnNextFrame(() => {
    runOnNextFrame(() => {
      document.querySelectorAll('.hero-intro').forEach((element) => {
        element.classList.add('hero-in');
      });
    });
  });

  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.2,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
});
