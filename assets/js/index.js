tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fff1f1ff',
                    100: '#ffe3e3ff',
                    200: '#ffccccff',
                    300: '#ffa5a5ff',
                    400: '#ff7373ff',
                    500: '#ff3737ff',  // Your primary color
                    600: '#e62121ff',
                    700: '#c21818ff',
                    800: '#9f1919ff',
                    900: '#811b1bff',
                }
            },
        }
    }
}

// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
let isMobileMenuOpen = false;

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent event from bubbling up

    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('block');
        mobileMenuButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
        isMobileMenuOpen = true;
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        isMobileMenuOpen = false;
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
    // Check if click is outside mobile menu and button
    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isClickOnButton = mobileMenuButton.contains(e.target);

    if (!isClickInsideMenu && !isClickOnButton && isMobileMenuOpen) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        isMobileMenuOpen = false;
    }
});

// Summary Toggle Functionality
const summaryToggle = document.getElementById('summary-toggle');
const summaryContent = document.getElementById('summary-content');
const summaryIcon = document.getElementById('summary-icon');

if (summaryToggle) {
    summaryToggle.addEventListener('click', function () {
        const isHidden = summaryContent.classList.contains('hidden');

        if (isHidden) {
            // Show summary
            summaryContent.classList.remove('hidden');
            summaryIcon.classList.remove('fa-chevron-down');
            summaryIcon.classList.add('fa-chevron-up');
            summaryToggle.classList.add('bg-gray-800');

            // Smooth height transition
            setTimeout(() => {
                summaryContent.style.opacity = '1';
                summaryContent.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // Hide summary
            summaryContent.classList.add('hidden');
            summaryIcon.classList.remove('fa-chevron-up');
            summaryIcon.classList.add('fa-chevron-down');
            summaryToggle.classList.remove('bg-gray-800');
        }
    });
}

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const faqItem = this.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        const icon = this.querySelector('i');

        // Toggle current item
        const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

        if (isOpen) {
            // Close this FAQ
            answer.style.maxHeight = '0px';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
            this.classList.remove('bg-gray-50');
        } else {
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.maxHeight = '0px';
            });
            document.querySelectorAll('.faq-question i').forEach(icn => {
                icn.classList.remove('fa-chevron-up');
                icn.classList.add('fa-chevron-down');
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('bg-gray-50');
            });

            // Open this FAQ
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
            this.classList.add('bg-gray-50');
        }
    });
});

// Initialize all FAQ answers to closed state
document.querySelectorAll('.faq-answer').forEach(answer => {
    answer.style.maxHeight = '0px';
    answer.style.transition = 'max-height 0.3s ease-out';
});



window.onload = function () {
    handleSticky();
};

function handleSticky() {
    // right sticky handle
    if (document.getElementById('rightsticky')) {
        const rightsticky = document.getElementById('rightsticky');
        let rightstickyHeight = rightsticky.clientHeight;
        console.log(rightstickyHeight, window.innerHeight);

        let rightstickyTop = rightstickyHeight - window.innerHeight;
        let rightTopValue = 0;

        if (rightstickyHeight > window.innerHeight - 56) {
            rightTopValue = rightstickyTop;
            rightsticky.style.top = `-${rightTopValue}px`;
        } else {
            rightTopValue = 56;
            rightsticky.style.top = `56px`;
        }
    }

    // left sticky handle
    if (document.getElementById('leftsticky')) {
        const leftsticky = document.getElementById('leftsticky');
        let leftstickyHeight = leftsticky.clientHeight;
        console.log(leftstickyHeight, window.innerHeight);

        let leftstickyTop = leftstickyHeight - window.innerHeight;
        let leftTopValue = 0;

        if (leftstickyHeight > window.innerHeight - 56) {
            leftTopValue = leftstickyTop;
            leftsticky.style.top = `-${leftTopValue}px`;
        } else {
            leftTopValue = 56;
            leftsticky.style.top = `56px`;
        }
    }

}
