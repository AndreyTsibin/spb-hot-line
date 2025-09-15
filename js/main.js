/*
===========================================
! JAVASCRIPT $
===========================================

-B>B D09; A>45@68B 2AN JavaScript ;>38:C A09B0:
- 5@5:;NG5=85 B01>2 2 A5:F88 pricing
- FAQ 0::>@45>= (1C45B 4>102;5= ?>765)
- @C30O 8=B5@0:B82=>ABL

*/

// ===================================================
// $#&,!", PRICING "
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    // =8F80;870F8O pricing B01>2
    initPricingTabs();
    // =8F80;870F8O FAQ 0::>@45>=0
    initFAQAccordion();
    // =8F80;870F8O :0@CA5;8 >B7K2>2
    initTestimonialsCarousel();
});

function initPricingTabs() {
    // >;CG05< 2A5 :=>?:8 B01>2
    const tabButtons = document.querySelectorAll('.pricing__tab');
    // >;CG05< 2A5 :>=B5=BK B01>2
    const tabContents = document.querySelectorAll('.pricing__tab-content');

    // A;8 M;5<5=BK =5 =0945=K, 2KE>48<
    if (tabButtons.length === 0 || tabContents.length === 0) {
        console.warn('Pricing tabs elements not found');
        return;
    }

    // >102;O5< >1@01>BG8: :;8:0 4;O :064>9 :=>?:8 B010
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // >;CG05< 7=0G5=85 data-tab
            const targetTab = this.getAttribute('data-tab');
            
            if (!targetTab) {
                console.warn('Tab button missing data-tab attribute');
                return;
            }
            
            // 5@5:;NG05< B01K
            switchTab(targetTab, tabButtons, tabContents);
        });
    });

    console.log('Pricing tabs initialized successfully');
}

function switchTab(targetTab, tabButtons, tabContents) {
    // #18@05< 0:B82=K9 :;0AA C 2A5E :=>?>: B01>2
    tabButtons.forEach(button => {
        button.classList.remove('pricing__tab--active');
    });
    
    // #18@05< 0:B82=K9 :;0AA C 2A5E :>=B5=B>2 B01>2
    tabContents.forEach(content => {
        content.classList.remove('pricing__tab-content--active');
    });
    
    // >102;O5< 0:B82=K9 :;0AA : 2K1@0==>9 :=>?:5
    const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
    if (activeButton) {
        activeButton.classList.add('pricing__tab--active');
    }
    
    // >102;O5< 0:B82=K9 :;0AA : A>>B25BAB2CNI5<C :>=B5=BC
    const activeContent = document.querySelector(`[data-content="${targetTab}"]`);
    if (activeContent) {
        activeContent.classList.add('pricing__tab-content--active');
    }
    
    // >38@C5< ?5@5:;NG5=85 4;O >B;04:8
    console.log(`Switched to tab: ${targetTab}`);
}

// ===================================================
// #""+ $#&
// ===================================================

// $C=:F8O 4;O ?;02=>9 ?@>:@CB:8 : O:>@N (5A;8 ?>=04>18BAO)
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

// -:A?>@B DC=:F89 4;O 2>7<>6=>3> 8A?>;L7>20=8O 2 4@C38E A:@8?B0E
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