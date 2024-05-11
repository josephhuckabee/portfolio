// Select all cards with the class 'card'
const cards = document.querySelectorAll('.card');

// Loop through each card and add a click event listener
cards.forEach((card) => {
    card.addEventListener('click', () => {
        // Get the card-body element inside the clicked card
        const cardBody = card.querySelector('.card-body');

        // Toggle the 'hidden' class to show/hide the content
        if (cardBody) { // Ensure there's a card-body element
            cardBody.classList.toggle('hidden');
        }
    });
});