/*
===========================================
JAVASCRIPT ФУНКЦИОНАЛЬНОСТЬ
===========================================

Этот файл содержит всю JavaScript логику сайта:
- Переключение табов в секции pricing
- FAQ аккордеон
- Карусель отзывов
- Другая интерактивность

*/

// ===================================================
// ФУНКЦИИ PRICING ТАБОВ
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация pricing табов
    initPricingTabs();
    // Инициализация FAQ аккордеона
    initFAQAccordion();
    // Инициализация карусели отзывов
    initTestimonialsCarousel();
});

function initPricingTabs() {
    // Получаем все кнопки табов
    const tabButtons = document.querySelectorAll('.pricing__tab');
    // Получаем все контенты табов
    const tabContents = document.querySelectorAll('.pricing__tab-content');

    // Если элементы не найдены, выходим
    if (tabButtons.length === 0 || tabContents.length === 0) {
        console.warn('Pricing tabs elements not found');
        return;
    }

    // Добавляем обработчик клика для каждой кнопки таба
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Получаем значение data-tab
            const targetTab = this.getAttribute('data-tab');

            if (!targetTab) {
                console.warn('Tab button missing data-tab attribute');
                return;
            }

            // Переключаем табы
            switchTab(targetTab, tabButtons, tabContents);
        });
    });

    console.log('Pricing tabs initialized successfully');
}

function switchTab(targetTab, tabButtons, tabContents) {
    // Убираем активный класс у всех кнопок табов
    tabButtons.forEach(button => {
        button.classList.remove('pricing__tab--active');
    });

    // Убираем активный класс у всех контентов табов
    tabContents.forEach(content => {
        content.classList.remove('pricing__tab-content--active');
    });

    // Добавляем активный класс к выбранной кнопке
    const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
    if (activeButton) {
        activeButton.classList.add('pricing__tab--active');
    }

    // Добавляем активный класс к соответствующему контенту
    const activeContent = document.querySelector(`[data-content="${targetTab}"]`);
    if (activeContent) {
        activeContent.classList.add('pricing__tab-content--active');
    }

    // Логируем переключение для отладки
    console.log(`Switched to tab: ${targetTab}`);
}

// ===================================================
// ОБЩИЕ ФУНКЦИИ
// ===================================================

// Функция для плавной прокрутки к якорю (если понадобится)
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===================================================
// FAQ АККОРДЕОН
// ===================================================

function initFAQAccordion() {
    // Получаем все кнопки вопросов FAQ
    const faqQuestions = document.querySelectorAll('.faq__question');

    // Если элементы не найдены, выходим
    if (faqQuestions.length === 0) {
        console.warn('FAQ questions not found');
        return;
    }

    // Добавляем обработчик клика для каждой кнопки
    faqQuestions.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Получаем родительский элемент .faq__item
            const faqItem = this.closest('.faq__item');

            if (!faqItem) {
                console.warn('FAQ item not found');
                return;
            }

            // Проверяем, активен ли элемент
            const isActive = faqItem.classList.contains('active');

            // Закрываем все открытые FAQ
            closeAllFAQ();

            // Если элемент не был активен, открываем его
            if (!isActive) {
                openFAQ(faqItem);
            }
        });
    });

    console.log('FAQ accordion initialized successfully');
}

function openFAQ(faqItem) {
    // Добавляем класс active
    faqItem.classList.add('active');

    // Получаем элемент ответа
    const answer = faqItem.querySelector('.faq__answer');

    if (answer) {
        // Получаем высоту контента
        const scrollHeight = answer.scrollHeight;

        // Устанавливаем max-height равную высоте контента
        answer.style.maxHeight = scrollHeight + 'px';
    }
}

function closeFAQ(faqItem) {
    // Убираем класс active
    faqItem.classList.remove('active');

    // Получаем элемент ответа
    const answer = faqItem.querySelector('.faq__answer');

    if (answer) {
        // Устанавливаем max-height в 0
        answer.style.maxHeight = '0px';
    }
}

function closeAllFAQ() {
    // Получаем все активные FAQ элементы
    const activeFAQItems = document.querySelectorAll('.faq__item.active');

    // Закрываем каждый активный элемент
    activeFAQItems.forEach(item => {
        closeFAQ(item);
    });
}

// ===================================================
// КАРУСЕЛЬ ОТЗЫВОВ
// ===================================================

function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials__carousel');
    const list = document.querySelector('.testimonials__list');
    const slides = document.querySelectorAll('.testimonials__slide');
    const prevButton = document.querySelector('.testimonials__arrow--prev');
    const nextButton = document.querySelector('.testimonials__arrow--next');
    const indicators = document.querySelectorAll('.testimonials__indicator');

    // Если элементы не найдены, выходим
    if (!carousel || !list || slides.length === 0) {
        console.warn('Testimonials carousel elements not found');
        return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Функция обновления карусели
    function updateCarousel() {
        const translateX = -currentSlide * 33.333; // Используем 33.333% для каждого слайда
        list.style.transform = `translateX(${translateX}%)`;

        // Обновляем индикаторы
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('testimonials__indicator--active', index === currentSlide);
        });

        // Обновляем состояние кнопок
        if (prevButton) {
            prevButton.disabled = currentSlide === 0;
        }
        if (nextButton) {
            nextButton.disabled = currentSlide === totalSlides - 1;
        }
    }

    // Функция перехода к следующему слайду
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    }

    // Функция перехода к предыдущему слайду
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }

    // Функция перехода к конкретному слайду
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            currentSlide = slideIndex;
            updateCarousel();
        }
    }

    // Обработчики событий для кнопок
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }

    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }

    // Обработчики событий для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Инициализация
    updateCarousel();

    console.log('Testimonials carousel initialized successfully');

    // Возвращаем объект с методами для внешнего использования
    return {
        nextSlide,
        prevSlide,
        goToSlide,
        getCurrentSlide: () => currentSlide,
        getTotalSlides: () => totalSlides
    };
}

// Экспорт функций для возможного использования в других скриптах
window.LENREMONT = {
    initPricingTabs: initPricingTabs,
    switchTab: switchTab,
    smoothScrollTo: smoothScrollTo,
    initFAQAccordion: initFAQAccordion,
    openFAQ: openFAQ,
    closeFAQ: closeFAQ,
    closeAllFAQ: closeAllFAQ,
    initTestimonialsCarousel: initTestimonialsCarousel
};