// ===== Animation au scroll (IntersectionObserver) =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("is-visible"), i * 130);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".card, .exp-item")
  .forEach((el) => observer.observe(el));

// ===== Compteur animé (requestAnimationFrame) =====
function animateCounter(el, target, duration = 1800) {
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * eased).toLocaleString("fr-FR");
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.target, 10));
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".stat__number")
  .forEach((el) => statsObserver.observe(el));

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== Pétales de sakura =====
function createPetal() {
  const p = document.createElement("div");
  p.style.cssText = `
    position: fixed;
    top: -20px;
    left: ${Math.random() * 100}vw;
    width: ${5 + Math.random() * 7}px;
    height: ${7 + Math.random() * 7}px;
    background: hsl(${342 + Math.random() * 18}, ${55 + Math.random() * 25}%, ${72 + Math.random() * 14}%);
    border-radius: 50% 0 50% 0;
    opacity: 0;
    pointer-events: none;
    z-index: 50;
    animation: fallingPetal ${6 + Math.random() * 6}s linear forwards;
  `;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 13000);
}

setInterval(createPetal, 1000);
