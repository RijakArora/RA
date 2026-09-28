// ==========================================================
// Settings — EDIT these
// ==========================================================
// Where contact-form messages go. With no FORM_ENDPOINT the form opens the
// visitor's email app pre-filled and addressed to CONTACT_EMAIL.
const CONTACT_EMAIL = "you@example.com";
// Optional: a Formspree (https://formspree.io) or similar endpoint, e.g.
// "https://formspree.io/f/abcdwxyz", to receive messages without a mail app.
const FORM_ENDPOINT = "";

document.documentElement.classList.add("js");

// ---------- Theme toggle ----------
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-toggle");

function currentTheme() {
  const set = root.getAttribute("data-theme");
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

themeBtn.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---------- Mobile nav ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navLinks.classList.toggle("open", open);
}

navToggle.addEventListener("click", () => {
  setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// ---------- Header border on scroll ----------
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

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

  const revealEls = document.querySelectorAll(
    ".section-head, .about-grid, .skills-grid .card, .timeline-item, .project, .contact"
  );
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          reveal.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => {
    el.classList.add("reveal");
    reveal.observe(el);
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

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
