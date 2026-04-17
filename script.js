// FitFlow - Main JavaScript

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

// Initial check
revealOnScroll();

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Multi-Step Booking Form
let currentStep = 1;
const totalSteps = 5;

const form = document.getElementById('booking-form');
const thankYou = document.getElementById('thank-you');
const stepIndicators = document.querySelectorAll('.step-indicator');

// Show specific step
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show current step
    const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentStepEl) {
        currentStepEl.classList.remove('hidden');
    }
    
    // Update indicators
    stepIndicators.forEach((ind, index) => {
        if (index < step) {
            ind.classList.remove('bg-gray-200');
            ind.classList.add('bg-primary');
        } else {
            ind.classList.remove('bg-primary');
            ind.classList.add('bg-gray-200');
        }
    });
    
    currentStep = step;
}

// Validate current step fields
function validateStep(step) {
    const stepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (!stepEl) return true;
    
    const requiredFields = stepEl.querySelectorAll('[required]');
    let valid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            valid = false;
            field.classList.add('border-red-500');
            field.classList.add('ring-2');
            field.classList.add('ring-red-200');
        } else {
            field.classList.remove('border-red-500');
            field.classList.remove('ring-2');
            field.classList.remove('ring-red-200');
        }
    });
    
    return valid;
}

// Clear validation on input
function clearValidation(e) {
    if (e.target.value.trim()) {
        e.target.classList.remove('border-red-500');
        e.target.classList.remove('ring-2');
        e.target.classList.remove('ring-red-200');
    }
}

// Add input listeners to clear validation
document.querySelectorAll('input[required], select[required]').forEach(field => {
    field.addEventListener('input', clearValidation);
    field.addEventListener('change', clearValidation);
});

// Next button handlers
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (validateStep(currentStep) && currentStep < totalSteps) {
            showStep(currentStep + 1);
        }
    });
});

// Previous button handlers
document.querySelectorAll('.prev-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    });
});

// Enter key on firstName to focus lastName
document.getElementById('firstName')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('lastName')?.focus();
    }
});

// Enter key on lastName to proceed to step 2 (with validation)
document.getElementById('lastName')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (validateStep(1)) {
            showStep(2);
        }
    }
});

// Enter key on email to move to phone
document.getElementById('email')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (document.getElementById('email')?.value.trim()) {
            document.getElementById('phone')?.focus();
        } else {
            validateStep(2);
        }
    }
});

// Enter key on phone to continue to step 3 (with validation)
document.getElementById('phone')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (validateStep(2)) {
            showStep(3);
        }
    }
});

// Form submission
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all steps before submission
    let allValid = true;
    for (let i = 1; i <= totalSteps; i++) {
        if (!validateStep(i)) {
            allValid = false;
            // Go to first invalid step
            showStep(i);
            break;
        }
    }
    
    if (!allValid) return;
    
    // Get user's first name for thank you message
    const firstName = document.getElementById('firstName')?.value || 'there';
    document.getElementById('user-name').textContent = firstName;
    
    // Hide form, show thank you
    form.classList.add('hidden');
    document.querySelector('.step-indicator').parentElement.classList.add('hidden');
    thankYou.classList.remove('hidden');
});

// Reset form function (global for onclick)
window.resetForm = function() {
    form?.reset();
    thankYou.classList.add('hidden');
    document.querySelector('.step-indicator').parentElement.classList.remove('hidden');
    form.classList.remove('hidden');
    showStep(1);
};

// Testimonials Swiper
document.addEventListener('DOMContentLoaded', function() {
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.testimonial-next',
            prevEl: '.testimonial-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        },
    });
});
