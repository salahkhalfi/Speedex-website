/**
 * GROUPE SÉCURITÉ SPEEDEX 007
 * Main JavaScript File - Vanilla JS
 * ========================================
 */

(function() {
    'use strict';

    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const mobileToggle = document.getElementById('mobileToggle');
                    const navMenu = document.getElementById('navMenu');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileToggle.classList.remove('active');
                    }
                }
            });
        });
    };

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const initMobileMenu = () => {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            });
        }
    };

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const initHeaderScroll = () => {
        const header = document.getElementById('header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    };

    // ========================================
    // ACTIVE NAVIGATION LINK
    // ========================================
    const initActiveNav = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const highlightNav = () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', highlightNav);
        highlightNav(); // Initial check
    };

    // ========================================
    // ANIMATED COUNTERS
    // ========================================
    const initCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const animatedCounters = new Set(); // Track which counters have been animated

        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        const checkCounters = () => {
            const triggerBottom = window.innerHeight * 0.85;

            counters.forEach(counter => {
                // Skip if already animated
                if (animatedCounters.has(counter)) return;

                const rect = counter.getBoundingClientRect();
                const top = rect.top;

                // Trigger animation when counter is visible
                if (top < triggerBottom && top > 0) {
                    animateCounter(counter);
                    animatedCounters.add(counter);
                }
            });
        };

        // Check on scroll
        window.addEventListener('scroll', checkCounters);
        
        // Check immediately on page load (in case counters are already visible)
        setTimeout(checkCounters, 100);
    };

    // ========================================
    // FAQ ACCORDION
    // ========================================
    const initFAQ = () => {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    };

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    const initContactForm = () => {
        const form = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);

                // Basic validation
                if (!data.nom || !data.email || !data.telephone || !data.service || !data.message) {
                    showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    showFormMessage('Veuillez entrer une adresse courriel valide.', 'error');
                    return;
                }

                // Phone validation (basic)
                const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
                if (!phoneRegex.test(data.telephone)) {
                    showFormMessage('Veuillez entrer un numéro de téléphone valide.', 'error');
                    return;
                }

                // Simulate form submission
                // In production, replace this with actual API call
                try {
                    // Show loading state
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                    submitBtn.disabled = true;

                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // Success
                    showFormMessage('Merci! Votre demande a été envoyée avec succès. Nous vous contacterons sous peu.', 'success');
                    form.reset();

                    // Reset button
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 500);

                    // Log form data (for development)
                    console.log('Form submitted:', data);

                    // In production, you would send data to your backend:
                    /*
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });

                    if (response.ok) {
                        showFormMessage('Merci! Votre demande a été envoyée avec succès.', 'success');
                        form.reset();
                    } else {
                        throw new Error('Erreur lors de l\'envoi');
                    }
                    */

                } catch (error) {
                    showFormMessage('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.', 'error');
                    console.error('Form submission error:', error);
                    
                    // Reset button
                    const submitBtn = form.querySelector('button[type="submit"]');
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer la demande';
                    submitBtn.disabled = false;
                }
            });
        }

        function showFormMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const initBackToTop = () => {
        const backToTopBtn = document.getElementById('backToTop');

        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // ========================================
    // ANIMATION ON SCROLL
    // ========================================
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll(`
            .service-card,
            .testimonial-card,
            .cert-card,
            .contact-card,
            .about-feature
        `);

        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    };

    // ========================================
    // PHONE NUMBER CLICK TRACKING
    // ========================================
    const initPhoneTracking = () => {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Phone call initiated:', link.getAttribute('href'));
                // Add analytics tracking here
                // Example: gtag('event', 'phone_call', { phone_number: link.getAttribute('href') });
            });
        });
    };

    // ========================================
    // EMAIL CLICK TRACKING
    // ========================================
    const initEmailTracking = () => {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        
        emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Email initiated:', link.getAttribute('href'));
                // Add analytics tracking here
                // Example: gtag('event', 'email_click', { email: link.getAttribute('href') });
            });
        });
    };

    // ========================================
    // LAZY LOADING IMAGES
    // ========================================
    const initLazyLoading = () => {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    // ========================================
    // PREVENT FORM RESUBMISSION
    // ========================================
    const preventResubmission = () => {
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    };

    // ========================================
    // INITIALIZE ALL FUNCTIONS
    // ========================================
    const init = () => {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initializeApp();
            });
        } else {
            initializeApp();
        }
    };

    const initializeApp = () => {
        console.log('🚀 Groupe Sécurité Speedex 007 - Website Initialized');

        // Initialize all features
        smoothScroll();
        initMobileMenu();
        initHeaderScroll();
        initActiveNav();
        initCounters();
        initFAQ();
        initContactForm();
        initBackToTop();
        initScrollAnimations();
        initPhoneTracking();
        initEmailTracking();
        initLazyLoading();
        preventResubmission();

        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');

        // Log initialization
        console.log('✅ All features initialized successfully');
    };

    // Start the application
    init();

    // ========================================
    // EXPORT FOR POTENTIAL USE
    // ========================================
    window.SpeedexApp = {
        version: '1.0.0',
        initialized: true
    };

})();

// ========================================
// UTILITY FUNCTIONS (Global)
// ========================================

/**
 * Format phone number for display
 */
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

/**
 * Validate email address
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone number
 */
function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// ANALYTICS & TRACKING (Optional)
// ========================================

/**
 * Track custom events
 * Replace with your analytics solution (Google Analytics, etc.)
 */
function trackEvent(eventName, eventData = {}) {
    console.log('📊 Event tracked:', eventName, eventData);
    
    // Example for Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Example for Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', eventName, eventData);
    }
}

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', (e) => {
    console.error('❌ JavaScript Error:', e.error);
    // Send error to logging service if needed
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Unhandled Promise Rejection:', e.reason);
    // Send error to logging service if needed
});
