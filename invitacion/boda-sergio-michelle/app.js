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
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // pequeño stagger por hijo
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
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* --------- Music Toggle --------- */
  const musicBtn = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  const audio = document.getElementById('bgMusic');
  let playing = false;

  if (audio) {
    audio.volume = 0.35;
  }

  musicBtn.addEventListener('click', () => {
    if (!playing) {
      const p = audio.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          playing = true;
          musicBtn.classList.add('playing');
          musicIcon.textContent = '♫';
        }).catch(() => { /* bloqueado por navegador */ });
      } else {
        playing = true;
        musicBtn.classList.add('playing');
        musicIcon.textContent = '♫';
      }
    } else {
      audio.pause();
      playing = false;
      musicBtn.classList.remove('playing');
      musicIcon.textContent = '♪';
    }
  });

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
