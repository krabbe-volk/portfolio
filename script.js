// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const currentYearSpan = document.getElementById('current-year');

// Navigation Toggle
function toggleNavigation() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Hamburger Menu Animation
function toggleHamburger() {
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
}

// Event Listeners for Navigation
if (hamburger) {
    hamburger.addEventListener('click', () => {
        toggleNavigation();
        toggleHamburger();
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && 
        !e.target.closest('.main-nav')) {
        toggleNavigation();
        toggleHamburger();
    }
});

// Update copyright year
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
    animatedElements.forEach(element => observer.observe(element));
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                toggleNavigation();
                toggleHamburger();
            }

            // Scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current navigation item
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (currentPath.endsWith(itemPath)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Initialize active navigation item
document.addEventListener('DOMContentLoaded', setActiveNavItem);

// Optional: Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Initialize scroll progress if needed
// createScrollProgress();

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
}

// Intersection Observer for scroll activation
function setupCounters() {
    const counterSection = document.querySelector('.counter-section');
    if (!counterSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate circles
                const circles = entry.target.querySelectorAll('.counter-circle-progress');
                circles.forEach(circle => circle.classList.add('animate'));

                // Animate numbers
                const counters = entry.target.querySelectorAll('.counter-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Start animation when 20% of the section is visible
    });

    observer.observe(counterSection);
}

// Initialize counters when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupCounters();
}); 