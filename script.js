// ==========================================================
// Settings — EDIT these
// ==========================================================
// Where contact-form messages go. With no FORM_ENDPOINT the form opens the
// visitor's email app pre-filled and addressed to CONTACT_EMAIL.
const CONTACT_EMAIL = "you@example.com";
// Optional: a Formspree (https://formspree.io) or similar endpoint, e.g.
// "https://formspree.io/f/abcdwxyz", to receive messages without a mail app.
const FORM_ENDPOINT = "";

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// ---------- Preloader ----------
const preloader = document.querySelector(".preloader");
function hidePreloader() { preloader && preloader.classList.add("done"); }
window.addEventListener("load", () => setTimeout(hidePreloader, 350));
setTimeout(hidePreloader, 2500); // never block the page for long

// ---------- Theme switch (uiverse switch: checked = dark) ----------
const themeInput = document.querySelector(".theme-switch__checkbox");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function currentTheme() {
  return root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
}
function syncSwitch() { themeInput.checked = currentTheme() === "dark"; }
syncSwitch();

themeInput.addEventListener("change", () => {
  const next = themeInput.checked ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});
systemDark.addEventListener("change", () => {
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (!saved) syncSwitch();
});

// ---------- Mobile nav ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navLinks.classList.toggle("open", open);
}
navToggle.addEventListener("click", () => setMenu(navToggle.getAttribute("aria-expanded") !== "true"));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav")) setMenu(false);
});

// ---------- Scroll progress ----------
const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  root.style.setProperty("--progress", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Cursor spotlight ----------
const spotlight = document.querySelector(".spotlight");
if (finePointer && !reduceMotion) {
  window.addEventListener("pointermove", (e) => {
    spotlight.style.setProperty("--mx", e.clientX + "px");
    spotlight.style.setProperty("--my", e.clientY + "px");
    spotlight.classList.add("on");
  }, { passive: true });
  document.addEventListener("pointerleave", () => spotlight.classList.remove("on"));
}

// ---------- Rotating hero word ----------
const rotator = document.querySelector(".rotator");
if (rotator && !reduceMotion) {
  const words = rotator.dataset.words.split("|");
  let i = 0;
  setInterval(() => {
    rotator.classList.add("out");
    setTimeout(() => {
      i = (i + 1) % words.length;
      rotator.textContent = words[i];
      rotator.classList.remove("out");
    }, 450);
  }, 2800);
}

// ---------- 3D tilt on project cards ----------
if (finePointer && !reduceMotion) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

// ---------- Count-up stats ----------
function countUp(el) {
  const target = Number(el.dataset.count);
  if (!target || reduceMotion) return;
  const start = performance.now();
  const dur = 1400;
  const tick = (now) => {
    const t = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ---------- Active nav link + reveal on scroll ----------
if ("IntersectionObserver" in window) {
  const links = new Map(
    [...navLinks.querySelectorAll('a[href^="#"]')].map((a) => [a.getAttribute("href").slice(1), a])
  );
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove("active"));
        const link = links.get(entry.target.id);
        if (link) link.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

  const groups = [
    ".hero-text > *", ".hero-visual",
    ".section-head", ".about-text", ".stats li",
    ".skills-grid > *", ".timeline-item", ".projects-grid > *", ".contact-wrap",
  ];
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        entry.target.querySelectorAll("[data-count]").forEach(countUp);
        reveal.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  groups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, idx) => {
      el.classList.add("reveal");
      el.style.setProperty("--delay", `${Math.min(idx, 5) * 0.09}s`);
      reveal.observe(el);
    });
  });
}

// ---------- Contact form ----------
const form = document.getElementById("contact-form");
const statusEl = form.querySelector(".form-status");

function setStatus(msg, isError) {
  statusEl.textContent = msg;
  statusEl.classList.toggle("error", Boolean(isError));
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll("input, textarea")];
  let valid = true;
  fields.forEach((f) => {
    const ok = f.checkValidity() && f.value.trim() !== "";
    f.classList.toggle("invalid", !ok);
    f.setAttribute("aria-invalid", String(!ok));
    if (!ok) valid = false;
  });
  if (!valid) {
    setStatus("Please fill in every field with a valid email.", true);
    return;
  }

  const data = Object.fromEntries(new FormData(form));

  if (!FORM_ENDPOINT) {
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("Opening your email app…");
    return;
  }

  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  setStatus("Sending…");
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(res.statusText);
    form.reset();
    setStatus("Thanks! Your message has been sent.");
  } catch (err) {
    setStatus(`Something went wrong. Please email me at ${CONTACT_EMAIL}.`, true);
  } finally {
    btn.disabled = false;
  }
});
form.querySelectorAll("input, textarea").forEach((f) =>
  f.addEventListener("input", () => { f.classList.remove("invalid"); f.removeAttribute("aria-invalid"); })
);

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
