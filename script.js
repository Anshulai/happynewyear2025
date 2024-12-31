const messageInput = document.getElementById('messageInput');
const displayText = document.getElementById('displayText');
const messageDisplay = document.getElementById('messageDisplay');
const floatingHearts = document.querySelector('.floating-hearts');

// Update the display text as user types
messageInput.addEventListener('input', function() {
    displayText.textContent = this.value;
});
// Create a new file called particles.js

class ParticleSystem {
    constructor() {
        // Initialize the particle container
        this.container = document.getElementById('particles-js');
        this.particles = [];
        this.maxParticles = 50;  // Adjust this number to control particle density
        
        // Configuration for particle appearance and behavior
        this.config = {
            colors: ['#ff6b6b', '#ee5253', '#ff9999'],  // Romantic color palette
            minSize: 3,
            maxSize: 6,
            minSpeed: 1,
            maxSpeed: 3,
            fadeSpeed: 0.02
        };

        // Bind the animation method to maintain context
        this.animate = this.animate.bind(this);
    }

    // Create a single particle with random properties
    createParticle() {
        const particle = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: this.randomBetween(this.config.minSize, this.config.maxSize),
            color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
            speedX: this.randomBetween(-this.config.maxSpeed, this.config.maxSpeed),
            speedY: this.randomBetween(-this.config.maxSpeed, this.config.maxSpeed),
            opacity: Math.random(),
            fadeDirection: Math.random() > 0.5 ? 1 : -1
        };

        return particle;
    }

    // Initialize the particle system
    init() {
        // Create initial batch of particles
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }

        // Start the animation loop
        this.animate();

        // Add window resize handler
        window.addEventListener('resize', () => {
            this.container.width = window.innerWidth;
            this.container.height = window.innerHeight;
        });
    }

    // Utility function for random number generation
    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Update particle positions and properties
    updateParticle(particle) {
        // Move the particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Handle particle opacity for fade effect
        particle.opacity += 0.01 * particle.fadeDirection;
        if (particle.opacity >= 1) particle.fadeDirection = -1;
        if (particle.opacity <= 0) particle.fadeDirection = 1;

        // Wrap particles around screen edges
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
    }

    // Draw a single particle
    drawParticle(particle) {
        const element = document.createElement('div');
        element.className = 'particle';
        element.style.left = `${particle.x}px`;
        element.style.top = `${particle.y}px`;
        element.style.width = `${particle.size}px`;
        element.style.height = `${particle.size}px`;
        element.style.background = particle.color;
        element.style.opacity = particle.opacity;
        this.container.appendChild(element);
    }

    // Main animation loop
    animate() {
        // Clear existing particles
        this.container.innerHTML = '';

        // Update and draw each particle
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        // Continue animation loop
        requestAnimationFrame(this.animate);
    }
}

// Initialize the particle system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const particleSystem = new ParticleSystem();
    particleSystem.init();
});
// Array of romantic gradients
const backgrounds = [
    'linear-gradient(135deg, #ff6b6b, #ee5253)',
    'linear-gradient(135deg, #fd79a8, #e84393)',
    'linear-gradient(135deg, #ff9ff3, #f368e0)',
    'linear-gradient(135deg, #ffa502, #ff6348)',
    'linear-gradient(135deg, #ff4757, #ff6b81)',
];

let currentBackgroundIndex = 0;

// Function to change background
function changeBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    messageDisplay.style.background = backgrounds[currentBackgroundIndex];
}

// Function to add floating hearts
function addHearts() {
    for (let i = 0; i < 5; i++) {
        createHeart();
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.classList.add('heart');
    
    // Random starting position
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    
    // Random animation duration and delay
    heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
    heart.style.animationDelay = Math.random() + 's';
    
    floatingHearts.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Add initial hearts
for (let i = 0; i < 10; i++) {
    createHeart();
}

// Add hearts periodically
setInterval(addHearts, 3000);
