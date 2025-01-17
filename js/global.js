
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('#teamCarousel');
    const items = carousel.querySelectorAll('.carousel-item');

    carousel.addEventListener('slide.bs.carousel', (event) => {
        items.forEach(item => item.querySelector('.card').style.transform = 'scale(1)');
        const activeItem = items[event.to].querySelector('.card');
        activeItem.style.transform = 'scale(1.2)';
    });
});