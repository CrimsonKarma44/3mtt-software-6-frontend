// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.remove('ph-sun');
        themeIcon.classList.add('ph-moon');
    } else {
        themeIcon.classList.remove('ph-moon');
        themeIcon.classList.add('ph-sun');
    }
});

// Tab Switching Logic
const tabs = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.view');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Hide all views
        views.forEach(v => v.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show corresponding view
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Show/Hide Password Logic
const togglePasswordBtns = document.querySelectorAll('.icon-btn');
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const icon = btn.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('ph-eye');
            icon.classList.add('ph-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('ph-eye-slash');
            icon.classList.add('ph-eye');
        }
    });
});

// Disable form submission reloads (Optional)
document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would connect to your backend!
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerText;
        btn.innerText = 'Processing...';
        setTimeout(() => {
            btn.innerText = originalText;
        }, 1500);
    });
});

// Canvas Background Animation
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);


const particles = [];
const NUMBER_OF_PARTICLES = 70;

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x >= width) this.vx *= -1;
        if (this.y <= 0 || this.y >= height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Dimmer particles to fit the darker theme
        ctx.fillStyle = 'rgba(59, 130, 246, 0.25)';
        ctx.fill();
    }
}

for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                const opacity = 1 - (distance / 150);
                // Subtlayer lines
                ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.15})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();
