// Blocks fade in as they scroll into view.
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
    io.observe(el);
  });
} else {
  items.forEach((el) => el.classList.add("in"));
}

// Header gets a thin line once the page moves; the phone button shows after the first screen.
const header = document.getElementById("top");
const float = document.getElementById("float");
const contact = document.getElementById("contact");
let contactVisible = false;

if ("IntersectionObserver" in window && contact) {
  new IntersectionObserver(([e]) => {
    contactVisible = e.isIntersecting;
    onScroll();
  }).observe(contact);
}

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 8);
  float.classList.toggle("show", y > window.innerHeight * 0.8 && !contactVisible);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// On phones there is no mouse: a tap lights up the package, like hovering does.
document.querySelectorAll(".pack").forEach((card) => {
  card.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    document.querySelectorAll(".pack.on").forEach((c) => c !== card && c.classList.remove("on"));
    card.classList.add("on");
  });
});
