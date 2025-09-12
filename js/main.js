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

// -:A?>@B DC=:F89 4;O 2>7<>6=>3> 8A?>;L7>20=8O 2 4@C38E A:@8?B0E
window.LENREMONT = {
    initPricingTabs: initPricingTabs,
    switchTab: switchTab,
    smoothScrollTo: smoothScrollTo
};