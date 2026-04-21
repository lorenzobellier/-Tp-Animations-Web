// ===== SCROLL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("is-visible");
      }, i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".card, .exp-item").forEach(el => {
  observer.observe(el);
});


// ===== COUNTER =====
function animateCounter(el, target, duration = 1800) {
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    el.textContent = Math.floor(target * eased).toLocaleString("fr-FR");

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, parseInt(entry.target.dataset.target));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".stat__number").forEach(el => {
  statsObserver.observe(el);
});


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ===== SAKURA PETALS =====
function createPetal() {
  const petal = document.createElement("div");

  petal.style.position = "fixed";
  petal.style.top = "-20px";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.width = 5 + Math.random() * 7 + "px";
  petal.style.height = 7 + Math.random() * 7 + "px";
  petal.style.background = "pink";
  petal.style.opacity = 0;
  petal.style.borderRadius = "50% 0 50% 0";
  petal.style.pointerEvents = "none";
  petal.style.zIndex = "50";
  petal.style.animation = `fallingPetal ${6 + Math.random() * 6}s linear forwards`;

  document.body.appendChild(petal);

  setTimeout(() => petal.remove(), 12000);
}

setInterval(createPetal, 1000);