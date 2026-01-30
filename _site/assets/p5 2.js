// Lock scroll
function lockScroll() {
  document.body.style.overflow = 'hidden';
}

// Unlock scroll
function unlockScroll() {
  document.body.style.overflow = 'auto';
}

// Move horizontally between sections
function moveToSection(container) {
  const section = document.getElementById(container);
  section.scrollIntoView({behavior: 'smooth', block: 'start'});
}

// Listen for scroll events
window.addEventListener('scroll', function() {
  lockScroll();
});

// Listen for click events
const sections = document.querySelectorAll('.section');
for (let i = 0; i < sections.length; i++) {
  const section = sections[i];
  section.addEventListener('click', function() {
    unlockScroll();
    moveToSection(this.id);
  });
}