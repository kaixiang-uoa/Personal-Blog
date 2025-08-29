// Main JavaScript file for Personal Blog System showcase

document.addEventListener('DOMContentLoaded', function () {
    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add smooth scroll behavior for all anchor links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.arch-card, .feature-card, .tech-category, .deployment-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Enhanced hover effects for tech pills
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.2)';
        });

        pill.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Enhanced hover effects for tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Click tracking for analytics
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            console.log('Button clicked:', this.textContent.trim());
            // You can add analytics tracking here
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-navigation');
    });

    // Loading animation
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // Enhanced scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #10b981);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Theme detection and toggle
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(e) {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    prefersDark.addListener(setTheme);
    setTheme(prefersDark);

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }

    // Error handling
    window.addEventListener('error', function (e) {
        console.error('Page error:', e.error);
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add typing effect to hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.textContent) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Uncomment to enable typing effect
        // typeWriter();
    }

    // Add counter animation for stats (if needed)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // Console welcome message
    console.log(`
    🏗️ Personal Blog System Showcase
    
    Welcome to the project showcase! This page demonstrates:
    - Modern web technologies
    - Responsive design
    - Performance optimization
    - Accessibility features
    
    Built with ❤️ using vanilla HTML, CSS, and JavaScript
    
    Features:
    - Smooth scrolling navigation
    - Intersection Observer animations
    - Scroll progress indicator
    - Enhanced hover effects
    - Performance monitoring
    `);

    // Add some fun interactions
    const cards = document.querySelectorAll('.arch-card, .feature-card, .tech-category, .deployment-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple effect to buttons
    const buttonsWithRipple = document.querySelectorAll('.btn');
    buttonsWithRipple.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
