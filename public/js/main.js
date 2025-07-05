const testimonials = [
    { name: 'Jane Smith', review: 'Absolutely stunning views and great service.', rating: 5 },
    { name: 'Michael Brown', review: 'The stay was very comfortable and cozy.', rating: 4 },
    { name: 'Sarah Lee', review: 'A perfect place to unwind and relax.', rating: 5 },
    { name: 'Emma Davis', review: 'Clean rooms and a peaceful atmosphere.', rating: 4 },
    { name: 'David Johnson', review: 'Highly recommended for nature lovers!', rating: 5 },
    { name: 'Laura White', review: 'Affordable and beautiful location.', rating: 4 },
    { name: 'Robert Taylor', review: 'A unique and unforgettable experience.', rating: 5 },
    { name: 'Olivia Green', review: 'Lovely staff and amazing surroundings.', rating: 5 }
];

const track = document.getElementById('testimonials-track');

const allCards = [...testimonials, ...testimonials]; // Duplicate for infinite loop
allCards.forEach(t => {
    const card = document.createElement('div');
    card.classList.add('testimonial-card');

    const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);

    card.innerHTML = `
      <p class="guest-review">"${t.review}"</p>
      <p class="rating">${stars}</p>
      <p class="guest-name">- ${t.name}</p>
    `;
    track.appendChild(card);
});