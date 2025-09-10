/* ===== LENREMONT MAIN JAVASCRIPT ===== */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initTabs();
    initFAQ();
    initSmoothScroll();
    initPhoneTracking();
    initAnimations();
});

/* === СИСТЕМА ТАБОВ === */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tabs__btn');
    const tabPanes = document.querySelectorAll('.tabs__pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Убираем активный класс со всех кнопок и панелей
            tabButtons.forEach(btn => btn.classList.remove('tabs__btn--active'));
            tabPanes.forEach(pane => pane.classList.remove('tabs__pane--active'));
            
            // Добавляем активный класс к выбранной кнопке
            this.classList.add('tabs__btn--active');
            
            // Показываем соответствующую панель
            const targetPane = document.getElementById(`tab-${targetTab}`);
            if (targetPane) {
                targetPane.classList.add('tabs__pane--active');
            }
            
            // Трекинг для аналитики
            trackEvent('tab_click', targetTab);
        });
    });
}

/* === FAQ АККОРДЕОН === */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('faq__item--active');
            
            // Закрываем все другие FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('faq__item--active');
                }
            });
            
            // Переключаем состояние текущего item
            item.classList.toggle('faq__item--active');
            
            // Трекинг для аналитики
            const questionText = question.textContent.trim();
            trackEvent('faq_toggle', questionText, !isActive ? 'open' : 'close');
        });
    });
}

/* === ПЛАВНАЯ ПРОКРУТКА === */
function initSmoothScroll() {
    // Обработка кликов по ссылкам-якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Игнорируем пустые якоря
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const offsetTop = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Трекинг
                trackEvent('scroll_to_section', href);
            }
        });
    });
}

/* === ОТСЛЕЖИВАНИЕ ЗВОНКОВ === */
function initPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            const context = getPhoneContext(this);
            
            // Трекинг звонка
            trackEvent('phone_click', phoneNumber, context);
            
            // Отправка данных в CRM/аналитику
            sendPhoneClickData(phoneNumber, context);
        });
    });
}

/* === АНИМАЦИИ ПРИ ПРОКРУТКЕ === */
function initAnimations() {
    // Intersection Observer для анимации появления элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Останавливаем наблюдение за элементом после анимации
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Добавляем наблюдение за элементами
    const animatedElements = document.querySelectorAll('.service-card, .testimonial, .faq__item');
    animatedElements.forEach(el => observer.observe(el));
}

/* === УТИЛИТЫ === */

// Определение контекста клика по телефону
function getPhoneContext(element) {
    const section = element.closest('section');
    if (section) {
        const sectionClass = section.className;
        if (sectionClass.includes('header')) return 'header';
        if (sectionClass.includes('hero')) return 'hero';
        if (sectionClass.includes('hotline')) return 'hotline';
        if (sectionClass.includes('contact')) return 'contact';
    }
    return 'unknown';
}

// Трекинг событий (можно интегрировать с Google Analytics, Яндекс.Метрикой и т.д.)
function trackEvent(action, label = '', value = '') {
    console.log('Event tracked:', { action, label, value });
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'lenremont_interaction',
            event_label: label,
            value: value
        });
    }
    
    // Яндекс.Метрика
    if (typeof ym !== 'undefined') {
        ym(123456, 'reachGoal', action, { label, value });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', action, { label, value });
    }
}

// Отправка данных о кликах по телефону
function sendPhoneClickData(phone, context) {
    // Отправка данных в CRM или аналитическую систему
    fetch('/api/phone-click', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: phone,
            context: context,
            timestamp: new Date().toISOString(),
            page: window.location.href,
            userAgent: navigator.userAgent
        })
    }).catch(error => {
        console.log('Phone tracking error:', error);
    });
}

/* === ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ === */

// Показ уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-primary);
        color: white;
        padding: var(--spacing-4) var(--spacing-6);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: var(--z-toast);
        transform: translateX(100%);
        transition: transform var(--transition-base);
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Валидация форм
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Форматирование телефонных номеров
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    let formatted = '';
    
    if (value.length > 0) {
        if (value.length <= 1) {
            formatted = '+7 (' + value;
        } else if (value.length <= 4) {
            formatted = '+7 (' + value.substring(1);
        } else if (value.length <= 7) {
            formatted = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4);
        } else if (value.length <= 9) {
            formatted = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7);
        } else {
            formatted = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
        }
    }
    
    input.value = formatted;
}

// Определение устройства пользователя
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

// Проверка поддержки WebP
function supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// Lazy loading для изображений
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* === ИНИЦИАЛИЗАЦИЯ ПРИ ИЗМЕНЕНИИ РАЗМЕРА ОКНА === */
window.addEventListener('resize', debounce(function() {
    const deviceType = getDeviceType();
    document.body.setAttribute('data-device', deviceType);
    
    // Обновление высоты для мобильных браузеров
    if (deviceType === 'mobile') {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
}, 250));

// Debounce функция для оптимизации
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

/* === ЭКСПОРТ ДЛЯ ВНЕШНЕГО ИСПОЛЬЗОВАНИЯ === */
window.LenremontApp = {
    showNotification,
    validateForm,
    formatPhone,
    trackEvent,
    getDeviceType
};