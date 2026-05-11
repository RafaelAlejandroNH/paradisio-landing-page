/* ============================================
   MICHELLE & SERGIO · INVITACIÓN
   ============================================ */

(function () {
  'use strict';

  /* --------- Guest name from URL --------- */
  const params = new URLSearchParams(window.location.search);
  const guest = params.get('guest');
  const guestCard = document.getElementById('guestCard');
  const guestName = document.getElementById('guestName');

  if (guest && guest.trim().length > 0) {
    guestName.textContent = decodeURIComponent(guest);
  } else {
    guestName.textContent = 'Nuestros seres queridos';
  }

  /* --------- Countdown --------- */
  // 23 de Mayo 2026, 3:00 PM hora local
  const targetDate = new Date(2026, 4, 23, 15, 0, 0).getTime();

  const elDays  = document.getElementById('cdDays');
  const elHours = document.getElementById('cdHours');
  const elMins  = document.getElementById('cdMins');
  const elSecs  = document.getElementById('cdSecs');

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMins.textContent = '00';
      elSecs.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    elDays.textContent  = pad(d);
    elHours.textContent = pad(h);
    elMins.textContent  = pad(m);
    elSecs.textContent  = pad(s);
  }
  tick();
  setInterval(tick, 1000);

  /* --------- Reveal on Scroll --------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentElement;
          const siblings = parent ? Array.from(parent.querySelectorAll(':scope > .reveal')) : [];
          const idx = siblings.indexOf(entry.target);
          const delay = idx >= 0 ? Math.min(idx * 90, 700) : 0;
          setTimeout(() => entry.target.classList.add('in'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(el => io.observe(el));

    // Animación de los separadores florales
    const breakSvgs = document.querySelectorAll('.section-break svg');
    const ioBreak = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          ioBreak.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    breakSvgs.forEach(el => ioBreak.observe(el));

  } else {
    revealEls.forEach(el => el.classList.add('in'));
    document.querySelectorAll('.section-break svg').forEach(el => el.classList.add('in'));
  }

  /* --------- Music --------- */
  const musicBtn  = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  const audio     = document.getElementById('bgMusic');
  let playing = false;

  if (audio) audio.volume = 0.3;

  function startMusic() {
    if (playing || !audio) return;
    audio.play().then(() => {
      playing = true;
      musicBtn.classList.add('playing');
      musicIcon.textContent = '♫';
    }).catch(() => {});
  }

  function stopMusic() {
    if (!audio) return;
    audio.pause();
    playing = false;
    musicBtn.classList.remove('playing');
    musicIcon.textContent = '♪';
  }

  musicBtn.addEventListener('click', () => {
    playing ? stopMusic() : startMusic();
  });

  /* --------- Splash --------- */
  const splash = document.getElementById('splash');

  function openInvitation() {
    if (!splash) return;

    // Arrancar música (el click ya fue, el navegador lo permite)
    startMusic();

    // Animación de cierre
    splash.classList.add('closing');
    splash.addEventListener('transitionend', () => {
      splash.classList.add('hidden');
    }, { once: true });

    // Revelar hero inmediatamente
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 200 + i * 80);
    });
  }

  if (splash) {
    splash.addEventListener('click',     openInvitation, { once: true });
    splash.addEventListener('touchend',  openInvitation, { once: true, passive: true });
    splash.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openInvitation();
    }, { once: true });
  }

  /* --------- RSVP --------- */
  const rsvpBtn = document.getElementById('rsvpBtn');
  if (rsvpBtn) {
    rsvpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const who = (guest && guest.trim().length > 0) ? decodeURIComponent(guest) : '';
      const msg = encodeURIComponent(
        `Hola Michelle y Sergio 💍\n\n` +
        (who ? `Soy ${who} y ` : '') +
        `quiero confirmar mi asistencia a su boda el 23 de Mayo. ¡Felicidades!`
      );
      // Reemplaza el número si es necesario
      window.open(`https://wa.me/523310394617?text=${msg}`, '_blank');
    });
  }

  /* --------- Suave parallax en hero (muy sutil) --------- */
  const hero = document.querySelector('.hero .paper');
  if (hero && window.matchMedia('(min-width: 720px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        hero.style.transform = `translateY(${y * 0.05}px)`;
      }
    }, { passive: true });
  }

})();
