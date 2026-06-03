// Reveal animations on scroll
const revealElements = document.querySelectorAll(
    '.feature-card, .pathway-card, .testimonial-card, .copilot-card, .stat'
);

revealElements.forEach((element) => {
    element.classList.add('reveal');
});

function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');

        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Button interaction effect
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
        button.style.opacity = '0.9';
    });

    button.addEventListener('mouseleave', () => {
        button.style.opacity = '1';
    });
});

// Animated stats counter
const counters = document.querySelectorAll('.stat h2');

counters.forEach((counter) => {

    const target = counter.innerText;
    const numericTarget = parseFloat(
        target.replace(/[^0-9.]/g, '')
    );

    let count = 0;
    const increment = numericTarget / 80;

    const updateCounter = setInterval(() => {

        count += increment;

        if (count >= numericTarget) {

            counter.innerText = target;
            clearInterval(updateCounter);

        } else {

            if (target.includes('%')) {

                counter.innerText =
                    Math.floor(count) + '%';

            } else if (target.includes('M')) {

                counter.innerText =
                    count.toFixed(1) + 'M';

            } else if (target.includes('k')) {

                counter.innerText =
                    Math.floor(count) + 'k+';

            } else {

                counter.innerText =
                    Math.floor(count);

            }
        }

    }, 20);

});