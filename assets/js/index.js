tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fff4f1',
                    100: '#ffe8e3',
                    200: '#ffd5cc',
                    300: '#ffb9a5',
                    400: '#ff9173',
                    500: '#ff6c37',  // Your primary color
                    600: '#e65521',
                    700: '#c24418',
                    800: '#9f3b19',
                    900: '#81351b',
                }
            },
        }
    }
}

// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', function () {
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('block');
        mobileMenuButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    }
});

// Active nav link handling
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
        }

        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        }
    });
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effect to social buttons
document.querySelectorAll('footer a, .social-button').forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.2s ease';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});