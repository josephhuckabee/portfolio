"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Select all cards with the class 'card'
  const cards = document.querySelectorAll('.card');

  // Loop through each card to set accessibility attributes and add event listeners
  cards.forEach((card) => {
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.setAttribute('aria-expanded', 'false');

    const toggleCardBody = () => {
      const cardBody = card.querySelector('.card-body');
      if (cardBody) {
        cardBody.classList.toggle('hidden');
        const isExpanded = !cardBody.classList.contains('hidden');
        card.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      }
    };

    card.addEventListener('click', () => {
      toggleCardBody();
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCardBody();
      }
    });
  });
});