const root = document.documentElement;

// ---------- Theme toggle ----------
const themeBtn = document.querySelector(".theme-toggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function currentTheme() {
  return root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
}
function updateThemeLabel() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  themeBtn.setAttribute("aria-label", `Switch to ${next} theme`);
}

themeBtn.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
  updateThemeLabel();
});
systemDark.addEventListener("change", updateThemeLabel);
updateThemeLabel();

// ---------- Highlight the section in view ----------
const navLinks = [...document.querySelectorAll(".section-nav a")];
if ("IntersectionObserver" in window && navLinks.length) {
  const byId = new Map(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.remove("active"));
        const link = byId.get(entry.target.id);
        if (link) link.classList.add("active");
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );
  document.querySelectorAll(".content .section[id]").forEach((s) => spy.observe(s));
}

// ---------- Copy email ----------
const copyBtn = document.querySelector(".copy-email");
const copyStatus = document.querySelector(".copy-status");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = "Copied";
    } catch (e) {
      // Fall back to selecting the address so it can be copied manually
      const range = document.createRange();
      range.selectNodeContents(document.querySelector(".email"));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      copyStatus.textContent = "Press Ctrl+C / ⌘C to copy";
    }
    setTimeout(() => { copyStatus.textContent = ""; }, 2500);
  });
}

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
