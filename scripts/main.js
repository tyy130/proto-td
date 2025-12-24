/* Extracted from index.html <script> block */

// Year
const yearEl = document.getElementById("y");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Reveal motion
const els = Array.from(document.querySelectorAll(".reveal"));
const scroller = document.getElementById("chapters");

if (typeof IntersectionObserver !== 'undefined') {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        io.unobserve(e.target);
      }
    }
  }, { 
    threshold: 0.14,
    root: scroller // Use the snap container as root
  });
  els.forEach(el => io.observe(el));
} else {
  // Fallback for environments without IntersectionObserver (tests/headless)
  els.forEach(el => el.classList.add('on'));
}

// Jump controls
const go = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};
document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => go(btn.getAttribute("data-go")));
});

// Lane highlight interaction
const lanes = Array.from(document.querySelectorAll(".lane"));
const setActive = (lane) => {
  lanes.forEach(el => {
    const is = el.getAttribute("data-lane") === lane;
    
    // If it's the clicked lane, toggle. If it's another lane, close it.
    if (is) {
      el.classList.toggle("expanded");
    } else {
      el.classList.remove("expanded");
    }
  });
};
lanes.forEach(el => {
  el.addEventListener("click", () => setActive(el.getAttribute("data-lane")));
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(el.getAttribute("data-lane"));
    }
  });
});
