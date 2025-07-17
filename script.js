// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinksAll = document.querySelectorAll('.nav-links a, .btn[href^="#"]');
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenu.classList.remove('active');
                    }
                }
            }
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');
            
            // Close other open FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherQuestion.querySelector('.faq-toggle');
                    
                    otherAnswer.classList.remove('active');
                    otherToggle.classList.remove('active');
                    otherToggle.textContent = '+';
                }
            });
            
            // Toggle current FAQ item
            answer.classList.toggle('active');
            toggle.classList.toggle('active');
            toggle.textContent = answer.classList.contains('active') ? '×' : '+';
        });
    });

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit-card, .tip-card, .testimonial');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Header Background on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(44, 85, 48, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2c5530 0%, #4a7c59 100%)';
            header.style.backdropFilter = 'none';
        }
    });

    // CTA Button Click Tracking
    const ctaButtons = document.querySelectorAll('.btn[href*="liftdetoxcaps"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track button clicks (you can integrate with analytics here)
            console.log('CTA Button clicked:', this.textContent.trim());
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Form Validation (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Lazy Loading for Images (if images are added)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.setAttribute('data-loaded', 'true');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Scroll to Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Performance Optimization
    let ticking = false;
    function updateOnScroll() {
        // Throttle scroll events
        if (!ticking) {
            requestAnimationFrame(function() {
                // Scroll-based animations can go here
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateOnScroll);

    // Accessibility Improvements
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Focus management for mobile menu
    mobileMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Error handling for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            try {
                // Add rel attributes for security
                this.rel = 'noopener noreferrer';
            } catch (error) {
                console.warn('Error handling external link:', error);
            }
        });
    });

    // Simple analytics tracking (replace with your analytics code)
    function trackEvent(eventName, eventData) {
        console.log('Event tracked:', eventName, eventData);
        // Replace with your analytics implementation
        // Example: gtag('event', eventName, eventData);
    }

    // Track page sections viewed
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_viewed', {
                    section_id: entry.target.id,
                    section_name: entry.target.querySelector('h1, h2')?.textContent || entry.target.id
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));

    // Preload critical resources
    function preloadResource(href, as) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
    }

    // Add hover effects for better UX
    const cards = document.querySelectorAll('.benefit-card, .tip-card, .testimonial');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize tooltips (if needed)
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.dataset.tooltip;
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 1000;
                    pointer-events: none;
                `;
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }

    initTooltips();

    console.log('Site carregado com sucesso! 🌱');
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Global error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You can send errors to your logging service here
});

// Performance monitoring
window.addEventListener('load', function() {
    setTimeout(function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }, 0);
});