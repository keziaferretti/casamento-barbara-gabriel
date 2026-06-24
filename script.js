/* ════════════════════════════════════════════════
   Bárbara & Gabriel — 12.09.2026
   Scripts do site de casamento
   ════════════════════════════════════════════════ */

/* NAV */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 50));
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* HERO BG — suave zoom-in depois de carregar */
const heroBg = document.getElementById('heroBg');
const testImg = new Image();
testImg.onload = () => setTimeout(() => heroBg.classList.add('loaded'), 100);
testImg.src = './fotos/hero.jpg';

/* COUNTDOWN */
const wedding = new Date('2026-09-12T15:00:00');
function tick() {
  const diff = wedding - new Date();
  if (diff <= 0) {
    document.querySelector('.countdown').innerHTML =
      '<p style="font-family:var(--serif);font-style:italic;font-size:1.4rem;color:var(--green-light)">O grande dia chegou! 🎊</p>';
    return;
  }
  const pad = n => String(Math.floor(n)).padStart(2, '0');
  document.getElementById('cd-days').textContent  = pad(diff / 86400000);
  document.getElementById('cd-hours').textContent = pad((diff % 86400000) / 3600000);
  document.getElementById('cd-mins').textContent  = pad((diff % 3600000) / 60000);
  document.getElementById('cd-secs').textContent  = pad((diff % 60000) / 1000);
}
tick();
setInterval(tick, 1000);

/* SCROLL FADE IN */
const obs = new IntersectionObserver(entries =>
  entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

/* PIX COPY */
function copyPix() {
  navigator.clipboard.writeText('18981409908').then(() => {
    const msg = document.getElementById('copyMsg');
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 2500);
  });
}

/* ENVIO DA CONFIRMAÇÃO VIA WHATSAPP */
function sendRsvp(event) {
  event.preventDefault();

  const name = document.getElementById('rsvp-name').value;
  const phone = document.getElementById('rsvp-phone').value;
  const status = document.getElementById('rsvp-status').value;
  const guests = document.getElementById('rsvp-guests').value;

  let text = `Olá Bárbara e Gabriel! Segue minha confirmação de presença:\n\n`;
  text += `*Nome:* ${name}\n`;
  text += `*WhatsApp:* ${phone}\n`;
  text += `*Presença:* ${status}\n`;

  if (guests.trim() !== '') {
    text += `*Acompanhantes:* ${guests}\n`;
  }

  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=5518991679558&text=${encodedText}`;

  window.open(whatsappUrl, '_blank');
}
