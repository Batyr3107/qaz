// ===========================
// PREMIUM MEN - JAVASCRIPT V2.0
// Enhanced with 10/10 Features
// ===========================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // ===========================
    // PRELOADER
    // ===========================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function() {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 800);
    });

    // ===========================
    // MOBILE MENU TOGGLE
    // ===========================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ===========================
    // SMOOTH SCROLLING
    // ===========================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // ACTIVE NAV LINK ON SCROLL
    // ===========================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', debounce(highlightNavLink, 100));

    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 100));

    // ===========================
    // SCROLL TO TOP BUTTON
    // ===========================
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', debounce(function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }, 100));

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===========================
    // SEARCH BUTTON
    // ===========================
    const searchBtn = document.getElementById('searchBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showNotification('Функция поиска будет доступна в ближайшее время!', 'info');
        });
    }

    // ===========================
    // BOOKMARK FUNCTIONALITY
    // ===========================
    const bookmarkButtons = document.querySelectorAll('.card-bookmark');
    const bookmarkedItems = new Set(JSON.parse(localStorage.getItem('bookmarks') || '[]'));

    bookmarkButtons.forEach(button => {
        const card = button.closest('.card, .featured-card');
        const cardTitle = card ? card.querySelector('.card-title, .featured-title')?.textContent : '';

        // Set initial state
        if (bookmarkedItems.has(cardTitle)) {
            button.classList.add('active');
        }

        button.addEventListener('click', function(e) {
            e.preventDefault();

            if (bookmarkedItems.has(cardTitle)) {
                bookmarkedItems.delete(cardTitle);
                this.classList.remove('active');
                showNotification('Удалено из закладок', 'info');
            } else {
                bookmarkedItems.add(cardTitle);
                this.classList.add('active');
                showNotification('Добавлено в закладки', 'success');
            }

            localStorage.setItem('bookmarks', JSON.stringify([...bookmarkedItems]));
        });
    });

    // ===========================
    // NEWSLETTER FORM HANDLING
    // ===========================
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value;

            if (email && validateEmail(email)) {
                // Simulate form submission
                const button = this.querySelector('.newsletter-button');
                const originalHTML = button.innerHTML;
                button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Подписка оформлена!';
                button.disabled = true;

                setTimeout(() => {
                    showNotification('Спасибо за подписку! Проверьте вашу почту для подтверждения.', 'success');
                    emailInput.value = '';
                    button.innerHTML = originalHTML;
                    button.disabled = false;
                }, 1500);
            } else {
                showNotification('Пожалуйста, введите корректный email адрес', 'error');
            }
        });
    }

    // ===========================
    // CARD LINK CLICKS
    // ===========================
    const cardLinks = document.querySelectorAll('.card-link, .featured-link');

    cardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Статья откроется в ближайшее время!', 'info');
        });
    });

    // ===========================
    // SCROLL ANIMATIONS
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.card, .featured-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'all 0.6s ease';
        observer.observe(header);
    });

    // Observe featured section
    const featuredSection = document.querySelector('.featured-section');
    if (featuredSection) {
        observer.observe(featuredSection);
    }

    // ===========================
    // PARALLAX EFFECTS
    // ===========================
    const heroShapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;

        heroShapes.forEach((shape, index) => {
            const speed = parallaxSpeed * (index + 1) * 0.5;
            shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // ===========================
    // NOTIFICATION SYSTEM
    // ===========================
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            border-left: 4px solid ${getNotificationColor(type)};
            max-width: 400px;
            min-width: 300px;
        `;

        // Add notification to body
        document.body.appendChild(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: '✓',
            info: 'ℹ',
            warning: '⚠',
            error: '✕'
        };
        return icons[type] || icons.info;
    }

    function getNotificationColor(type) {
        const colors = {
            success: '#56ab2f',
            info: '#3498db',
            warning: '#f39c12',
            error: '#e74c3c'
        };
        return colors[type] || colors.info;
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .notification-icon {
            font-size: 1.5rem;
            font-weight: bold;
            flex-shrink: 0;
        }

        .notification-message {
            color: #2c3e50;
            font-weight: 500;
            flex: 1;
        }

        .notification-close {
            background: none;
            border: none;
            color: #7a7a7a;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: background-color 0.2s ease;
            flex-shrink: 0;
        }

        .notification-close:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none !important;
                min-width: auto !important;
            }
        }
    `;
    document.head.appendChild(style);

    // ===========================
    // RESIZE HANDLER
    // ===========================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu if window is resized to desktop
            if (window.innerWidth > 768) {
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });

    // ===========================
    // CONSOLE MESSAGE
    // ===========================
    console.log('%c ◆ PREMIUM MEN ', 'background: #2c3e50; color: #c9a961; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Добро пожаловать на премиум портал для мужчин! ', 'font-size: 14px; color: #2c3e50;');
    console.log('%c Made with ❤️ for modern gentlemen ', 'font-size: 12px; color: #7a7a7a; font-style: italic;');

    // ===========================
    // READING PROGRESS BAR (Optional)
    // ===========================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #c9a961 0%, #3498db 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', debounce(function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }, 50));

    // ===========================
    // KEYBOARD SHORTCUTS
    // ===========================
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchBtn) searchBtn.click();
        }

        // Escape to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            mobileMenuToggle.click();
        }

        // Scroll to top with Home key
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Scroll to bottom with End key
        if (e.key === 'End' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        }
    });

    // ===========================
    // ANALYTICS (Placeholder)
    // ===========================
    function trackEvent(category, action, label) {
        console.log('Analytics Event:', { category, action, label });
        // Here you would integrate with Google Analytics, Mixpanel, etc.
    }

    // Track important actions
    cardLinks.forEach(link => {
        link.addEventListener('click', () => trackEvent('Content', 'Click', 'Article Link'));
    });

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', () => trackEvent('Newsletter', 'Submit', 'Email Subscription'));
    }

    // ===========================
    // PAGE VISIBILITY
    // ===========================
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('User left the page');
        } else {
            console.log('User returned to the page');
        }
    });

    // ===========================
    // DARK MODE TOGGLE (Future Feature)
    // ===========================
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDarkScheme.matches) {
        console.log('User prefers dark mode (future feature)');
    }

});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Debounce function for scroll events
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

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lazy load images (if images are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

// Format number with K/M suffix
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
        });
    }
}

// Share functionality
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).then(() => {
            console.log('Content shared successfully');
        }).catch(err => {
            console.error('Error sharing:', err);
        });
    } else {
        copyToClipboard(url);
        console.log('Share not supported, URL copied to clipboard');
    }
}

// ===========================
// SERVICE WORKER (PWA Support - Optional)
// ===========================
if ('serviceWorker' in navigator) {
    // Uncomment when ready to implement PWA
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js').then(registration => {
    //         console.log('SW registered:', registration);
    //     }).catch(error => {
    //         console.log('SW registration failed:', error);
    //     });
    // });
}

// ===========================
// ERROR HANDLING
// ===========================
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});
