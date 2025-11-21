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
    // SEARCH MODAL & FUNCTIONALITY
    // ===========================
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchModalOverlay = document.getElementById('searchModalOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Search database (all content on the site)
    const searchDatabase = [
        { category: 'Мода', icon: '👔', title: 'Минимализм и элегантность', description: 'Как создать базовый гардероб, который подчеркнет ваш статус и индивидуальность', url: '#fashion' },
        { category: 'Мода', icon: '🎩', title: 'Идеальная посадка', description: 'Секреты выбора костюма премиум класса', url: '#fashion' },
        { category: 'Мода', icon: '👞', title: 'Детали решают всё', description: 'Must-have аксессуары этого сезона', url: '#fashion' },
        { category: 'Стиль жизни', icon: '✈️', title: 'Эксклюзивные направления', description: 'Топ-10 мест для истинных ценителей', url: '#lifestyle' },
        { category: 'Стиль жизни', icon: '🏠', title: 'Мужское пространство', description: 'Обустройство дома с характером и стилем', url: '#lifestyle' },
        { category: 'Стиль жизни', icon: '🎨', title: 'Искусство и коллекции', description: 'Инвестиции в культурное наследие', url: '#lifestyle' },
        { category: 'Стиль жизни', icon: '🎭', title: 'Искусство жить красиво', description: 'Философия современного джентльмена', url: '#featured' },
        { category: 'Технологии', icon: '🏎️', title: 'Новинки суперкаров', description: 'Обзор самых желанных автомобилей года', url: '#tech' },
        { category: 'Технологии', icon: '📱', title: 'Умные технологии', description: 'Топ устройств для дома и офиса', url: '#tech' },
        { category: 'Технологии', icon: '🎧', title: 'Hi-Fi системы', description: 'Звук премиум качества', url: '#tech' },
        { category: 'Фитнес', icon: '💪', title: 'Программы для профи', description: 'Эффективные тренировки от экспертов', url: '#fitness' },
        { category: 'Фитнес', icon: '🥗', title: 'Рацион чемпиона', description: 'Сбалансированное питание для результата', url: '#fitness' },
        { category: 'Фитнес', icon: '🧘', title: 'Баланс тела и духа', description: 'Восстановление и профилактика', url: '#fitness' },
        { category: 'Бизнес', icon: '💼', title: 'От стартапа к империи', description: 'Истории успеха и практические советы', url: '#business' },
        { category: 'Бизнес', icon: '📈', title: 'Умное вложение', description: 'Диверсификация портфеля', url: '#business' },
        { category: 'Бизнес', icon: '👥', title: 'Навыки управления', description: 'Как вдохновлять команду', url: '#business' },
        { category: 'Бизнес', icon: '🎯', title: 'Стратегии успеха', description: 'Секреты от топ-менеджеров', url: '#featured' },
        { category: 'Часы', icon: '⌚', title: 'Легендарные модели', description: 'Часы, которые меняют статус', url: '#watches' },
        { category: 'Часы', icon: '⏱️', title: 'Искусство часового дела', description: 'История великих мануфактур', url: '#watches' },
        { category: 'Часы', icon: '💎', title: 'Часы как актив', description: 'Модели, растущие в цене', url: '#watches' },
        { category: 'Часы', icon: '🏆', title: '10 легендарных часов', description: 'Для коллекционера', url: '#featured' }
    ];

    let selectedResultIndex = -1;

    // Open search modal
    function openSearchModal() {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 100);
    }

    // Close search modal
    function closeSearchModal() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        selectedResultIndex = -1;
        renderSearchResults([]);
    }

    // Render search results
    function renderSearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <p>${searchInput.value ? 'Ничего не найдено' : 'Начните вводить для поиска'}</p>
                </div>
            `;
            return;
        }

        const html = results.map((result, index) => `
            <div class="search-result-item ${index === selectedResultIndex ? 'active' : ''}" data-index="${index}" data-url="${result.url}">
                <div class="search-result-icon">${result.icon}</div>
                <div class="search-result-content">
                    <div class="search-result-category">${result.category}</div>
                    <div class="search-result-title">${highlightMatch(result.title, searchInput.value)}</div>
                    <div class="search-result-description">${highlightMatch(result.description, searchInput.value)}</div>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = html;

        // Add click handlers
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const url = item.dataset.url;
                closeSearchModal();
                window.location.href = url;
            });
        });
    }

    // Highlight matching text
    function highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background-color: rgba(201, 169, 97, 0.3); color: inherit; padding: 0 2px; border-radius: 2px;">$1</mark>');
    }

    // Perform search
    function performSearch(query) {
        if (!query) {
            renderSearchResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = searchDatabase.filter(item => {
            return (
                item.title.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery) ||
                item.category.toLowerCase().includes(lowerQuery)
            );
        });

        renderSearchResults(results);
        selectedResultIndex = -1;
    }

    // Event listeners
    if (searchBtn) {
        searchBtn.addEventListener('click', openSearchModal);
    }

    if (searchModalOverlay) {
        searchModalOverlay.addEventListener('click', closeSearchModal);
    }

    if (searchClose) {
        searchClose.addEventListener('click', closeSearchModal);
    }

    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            performSearch(e.target.value);
        }, 200));

        searchInput.addEventListener('keydown', (e) => {
            const results = document.querySelectorAll('.search-result-item');

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedResultIndex = Math.min(selectedResultIndex + 1, results.length - 1);
                updateSelectedResult();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedResultIndex = Math.max(selectedResultIndex - 1, -1);
                updateSelectedResult();
            } else if (e.key === 'Enter' && selectedResultIndex >= 0) {
                e.preventDefault();
                const selectedItem = results[selectedResultIndex];
                if (selectedItem) {
                    selectedItem.click();
                }
            }
        });
    }

    function updateSelectedResult() {
        const results = document.querySelectorAll('.search-result-item');
        results.forEach((item, index) => {
            if (index === selectedResultIndex) {
                item.classList.add('active');
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.classList.remove('active');
            }
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
    // CARD LINK CLICKS & SHARE
    // ===========================
    const cardLinks = document.querySelectorAll('.card-link, .featured-link');

    cardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Статья откроется в ближайшее время!', 'info');
        });
    });

    // Social share functionality
    function shareOnSocial(platform, title, url) {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);

        const shareUrls = {
            vk: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`,
            telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
            trackEvent('Social', 'Share', platform);
        }
    }

    // Add share menu to cards (on hover)
    document.querySelectorAll('.card, .featured-card').forEach(card => {
        const title = card.querySelector('.card-title, .featured-title')?.textContent || '';
        const link = card.querySelector('.card-link, .featured-link')?.getAttribute('href') || window.location.href;

        // Create share button (hidden by default, shown on hover)
        const shareBtn = document.createElement('button');
        shareBtn.className = 'card-share-btn';
        shareBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
        `;
        shareBtn.setAttribute('aria-label', 'Поделиться');

        shareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showShareMenu(title, window.location.origin + link, e.target);
        });

        const footer = card.querySelector('.card-footer, .featured-meta');
        if (footer) {
            footer.appendChild(shareBtn);
        }
    });

    function showShareMenu(title, url, button) {
        // Check if native share is available
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            }).then(() => {
                showNotification('Спасибо за то, что делитесь!', 'success');
                trackEvent('Social', 'Share', 'Native');
            }).catch(() => {
                // User cancelled or error occurred
            });
        } else {
            // Show custom share menu
            const menu = document.createElement('div');
            menu.className = 'share-menu';
            menu.innerHTML = `
                <button class="share-option" data-platform="vk">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.94h-1.33c-.52 0-.68-.42-1.61-1.35-.82-.77-1.18-.87-1.38-.87-.28 0-.37.09-.37.51v1.23c0 .33-.1.52-1 .52-1.49 0-3.14-.9-4.31-2.6-1.75-2.5-2.23-4.39-2.23-4.77 0-.2.09-.39.51-.39h1.33c.38 0 .52.18.67.59.74 2.15 1.97 4.03 2.48 4.03.19 0 .28-.09.28-.57v-2.22c-.06-.99-.58-1.08-.58-1.43 0-.16.13-.32.34-.32h2.09c.32 0 .43.17.43.54v2.99c0 .32.14.43.23.43.19 0 .34-.11.69-.46 1.07-1.2 1.84-3.05 1.84-3.05.1-.21.28-.39.66-.39h1.33c.4 0 .49.2.4.54-.16.78-1.85 3.3-1.85 3.3-.15.26-.21.37 0 .66.15.21.64.62 1.21 1.24.54.58 1.08 1.17 1.21 1.54.12.38-.07.57-.48.57z"/>
                    </svg>
                    ВКонтакте
                </button>
                <button class="share-option" data-platform="telegram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                    Telegram
                </button>
                <button class="share-option" data-platform="whatsapp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                </button>
                <button class="share-option" data-platform="copy">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Копировать ссылку
                </button>
            `;

            // Position menu near the button
            const rect = button.getBoundingClientRect();
            menu.style.cssText = `
                position: fixed;
                top: ${rect.bottom + 10}px;
                left: ${rect.left - 150}px;
                z-index: 9999;
            `;

            document.body.appendChild(menu);

            // Add click handlers
            menu.querySelectorAll('.share-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const platform = option.getAttribute('data-platform');
                    if (platform === 'copy') {
                        copyToClipboard(url);
                        showNotification('Ссылка скопирована!', 'success');
                    } else {
                        shareOnSocial(platform, title, url);
                    }
                    menu.remove();
                });
            });

            // Close menu when clicking outside
            setTimeout(() => {
                document.addEventListener('click', function closeMenu() {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }, 100);
            });
        }
    }

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
    // DARK MODE TOGGLE
    // ===========================
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Get saved theme or use system preference
    function getSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return prefersDarkScheme.matches ? 'dark' : 'light';
    }

    // Apply theme
    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1d23' : '#2c3e50');
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        showNotification(`Тема переключена на ${newTheme === 'dark' ? 'тёмную' : 'светлую'}`, 'success');
    }

    // Initialize theme
    applyTheme(getSavedTheme());

    // Event listener for theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

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

// ===========================
// PREMIUM FEATURES V5.0
// Ultra-Premium Enhancements
// ===========================

// Premium Navbar Scroll Effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for glassmorphism effect
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// Premium Parallax Effect for Hero Sections
function premiumParallax() {
    const parallaxElements = document.querySelectorAll('.hero, .category-hero');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    }, { passive: true });
}

// Initialize parallax if elements exist
if (document.querySelector('.hero, .category-hero')) {
    premiumParallax();
}

// Premium Scroll Animations with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            // Optional: unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Observe cards and sections for scroll animations
const animateOnScroll = document.querySelectorAll('.card, .team-member, .value-card, .stat-item, .faq-item');
animateOnScroll.forEach(element => {
    observer.observe(element);
});

// Premium Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#" or "#search"
        if (href === '#' || href === '#search') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for navbar height

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Premium Card Hover Effect Enhancement
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create subtle spotlight effect
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Premium Button Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple-effect');

    const ripple = button.getElementsByClassName('ripple-effect')[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

const rippleButtons = document.querySelectorAll('.cta-btn, .btn-primary, .form-submit-btn, .filter-btn');
rippleButtons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Premium Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                const target = parseInt(statNumber.textContent);
                statNumber.dataset.animated = 'true';
                animateCounter(statNumber, target);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Premium Image Lazy Loading with Fade-in
function premiumLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';

                img.onload = () => {
                    img.style.opacity = '1';
                    img.removeAttribute('data-src');
                };

                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

premiumLazyLoad();

// Premium Cursor Effect (optional, for desktop)
if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.classList.add('premium-cursor');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '0.6';
    });

    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });

    // Enhance cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, input, textarea');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'var(--secondary-color)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--accent-color)';
        });
    });
}

// Premium Text Reveal Animation
function premiumTextReveal() {
    const textElements = document.querySelectorAll('.hero-title, .category-hero-title, .section-title');

    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';

        // Split text into words
        text.split(' ').forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.overflow = 'hidden';

            const innerSpan = document.createElement('span');
            innerSpan.textContent = word + ' ';
            innerSpan.style.display = 'inline-block';
            innerSpan.style.animation = `premium-slide-up 0.8s ease-out ${wordIndex * 0.1}s both`;

            wordSpan.appendChild(innerSpan);
            element.appendChild(wordSpan);
        });
    });
}

// Initialize text reveal on page load
if (document.readyState === 'complete') {
    premiumTextReveal();
} else {
    window.addEventListener('load', premiumTextReveal);
}

// Premium Performance Monitor (Development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    let performanceMetrics = {
        fps: 0,
        lastFrameTime: performance.now()
    };

    function measureFPS() {
        const now = performance.now();
        performanceMetrics.fps = Math.round(1000 / (now - performanceMetrics.lastFrameTime));
        performanceMetrics.lastFrameTime = now;
        requestAnimationFrame(measureFPS);
    }

    requestAnimationFrame(measureFPS);

    // Log metrics every 5 seconds
    setInterval(() => {
        console.log('🚀 Premium Performance:', {
            FPS: performanceMetrics.fps,
            Memory: performance.memory ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB` : 'N/A'
        });
    }, 5000);
}

// Premium Page Transition Effect
function premiumPageTransition() {
    // Fade in page content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

premiumPageTransition();

// Premium Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-color), var(--secondary-color));
        z-index: 10000;
        transition: width 0.1s linear;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });
}

createScrollProgress();

// Premium Easter Egg - Konami Code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiPattern.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'premium-gradient 2s ease infinite';
        setTimeout(() => {
            alert('🎉 PREMIUM MODE ACTIVATED! 🎉\n\nYou discovered the secret!');
            document.body.style.animation = '';
        }, 100);
        konamiCode = [];
    }
});

// Premium Console Welcome Message
console.log('%c◆ PREMIUM MEN v5.0 ◆',
    'font-size: 24px; font-weight: bold; color: #c9a961; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cУльтра-премиум портал с расширенными возможностями',
    'font-size: 14px; color: #3498db;');
console.log('%c• Glassmorphism эффекты\n• Parallax scrolling\n• Scroll animations\n• Premium transitions\n• Performance optimized',
    'font-size: 12px; color: #7a7a7a; line-height: 1.8;');

console.log('%c\n💎 Разработано с вниманием к деталям',
    'font-size: 12px; font-style: italic; color: #c9a961;');

// ===========================
// END PREMIUM FEATURES V5.0
// ===========================
