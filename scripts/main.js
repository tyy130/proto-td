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

// Form Submission (osTicket Integration)
const contactForm = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // UI State: Loading
    submitBtn.classList.add('loading');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    
    try {
      // Replace with your actual proxy endpoint
      const PROXY_URL = '/.netlify/functions/osticket-proxy'; 
      
      // Construct osTicket payload
      const payload = {
        name: data.name,
        email: data.email,
        subject: `New Request: ${data.type}`,
        message: `data:text/html,<b>Type:</b> ${data.type}<br><b>Tools:</b> ${data.tools || 'None'}<br><br><b>Details:</b><br>${data.details.replace(/\n/g, '<br>')}`,
        alert: true,
        autorespond: true,
        source: 'API'
      };

      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Network response was not ok');

      // UI State: Success
      contactForm.style.display = 'none';
      successMsg.style.display = 'block';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
      console.error('Submission error:', error);
      // UI State: Error
      contactForm.style.display = 'none';
      errorMsg.style.display = 'block';
      errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.textContent = originalBtnText;
    }
  });
}
