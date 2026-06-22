// ===================================
// DIGITAL CORE IT SOLUTIONS - JAVASCRIPT
// ===================================

// Mobile menu toggle with body scroll prevention
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active') ? 'true' : 'false');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            const firstLink = navLinks.querySelector('a');
            if (firstLink) firstLink.focus();
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-wrapper')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
            menuToggle.focus();
        }
    });
}

// Animated text on home page
const animatedText = document.getElementById('animatedText');
if (animatedText) {
    const services = [
        'Website Development',
        'Mobile App Development',
        'Management Systems',
        'Network Installation',
        'CCTV Security Systems',
        'Computer Repair',
        'Data Recovery',
        '24/7 Technical Support'
    ];

    let currentServiceIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeService() {
        const currentService = services[currentServiceIndex];
        
        if (isDeleting) {
            currentCharIndex--;
        } else {
            currentCharIndex++;
        }

        animatedText.textContent = currentService.substring(0, currentCharIndex);

        let typingSpeed = isDeleting ? 30 : 50;

        if (!isDeleting && currentCharIndex === currentService.length) {
            typingSpeed = 2000; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentServiceIndex = (currentServiceIndex + 1) % services.length;
            typingSpeed = 500; // Pause before typing next service
        }

        setTimeout(typeService, typingSpeed);
    }

    typeService();
}

// Hero Carousel Auto-play and Navigation
const dots = document.querySelectorAll('.carousel-dot');
const carouselSlides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;
let carouselInterval;

function showSlide(n) {
    currentSlide = (n + carouselSlides.length) % carouselSlides.length;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-play carousel every 3.33 seconds (matches animation duration)
if (carouselSlides.length > 0) {
    carouselInterval = setInterval(nextSlide, 3333);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(carouselInterval);
        showSlide(index);
        // Resume auto-play after 5 seconds
        carouselInterval = setInterval(nextSlide, 3333);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio filter
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.classList.add('active');
        } else {
            item.style.display = 'none';
            item.classList.remove('active');
        }
    });
}

// Service navigation scroll
function scrollToService(serviceId) {
    const element = document.getElementById(serviceId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// FAQ Expandable items
document.querySelectorAll('.faq-item.expandable').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item.expandable').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // Create WhatsApp message
        const whatsappMessage = `Hello Digital Core IT Solutions!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`;

        // Open WhatsApp with pre-filled message
        const encodedMessage = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/255764830663?text=${encodedMessage}`, '_blank');

        // Show thank you message
        alert('Thank you! Your message will be sent via WhatsApp. We will respond shortly.');
        
        // Reset form
        contactForm.reset();
    });
}

// Get URL parameters for pre-filling forms
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Pre-fill service field if coming from service page
const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    const serviceParam = getUrlParameter('service');
    const packageParam = getUrlParameter('package');
    
    if (serviceParam) {
        serviceSelect.value = serviceParam;
    } else if (packageParam) {
        serviceSelect.value = packageParam.includes('website') ? 'Website Development' :
                             packageParam.includes('app') ? 'Mobile App' :
                             packageParam.includes('system') ? 'Management System' :
                             packageParam.includes('network') ? 'Network Setup' :
                             packageParam.includes('cctv') ? 'CCTV Installation' :
                             packageParam.includes('repair') ? 'Computer Repair' :
                             packageParam.includes('software') ? 'Software Installation' :
                             packageParam.includes('recovery') ? 'Data Recovery' :
                             packageParam.includes('support') ? 'Technical Support' : '';
    }
}

// Set active nav link
function setActiveNavLink() {
    const currentLocation = location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentLocation.split('/').pop() || 
            (currentLocation.endsWith('/') && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// Smooth scroll on page load if hash exists
window.addEventListener('load', () => {
    if (window.location.hash) {
        setTimeout(() => {
            const element = document.querySelector(window.location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
});

// Initialize portfolio filter buttons
document.querySelectorAll('.filter-btn').forEach((btn, index) => {
    if (index === 0) btn.classList.add('active');
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Lazy load images if needed
const images = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .project-card, .testimonial-card, .reason').forEach(el => {
    observer.observe(el);
});

// Accessible dropdown for mobile
function setupResponsiveBehavior() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.nav-links').forEach(nav => {
            nav.setAttribute('role', 'navigation');
        });
    }
}

setupResponsiveBehavior();
window.addEventListener('resize', setupResponsiveBehavior);

// Log page view for analytics
console.log('Digital Core IT Solutions Website Loaded');

(function(){
  // Accessibility & performance enhancements
  if (!document.querySelector('.skip-link')) {
    const skip = document.createElement('a');
    skip.href = '#main';
    skip.className = 'skip-link';
    skip.textContent = 'Skip to content';
    document.body.insertBefore(skip, document.body.firstChild);
    const main = document.querySelector('main') || document.querySelector('.hero') || document.querySelector('.container');
    if (main && !main.id) main.id = 'main';
  }

  // Set native lazy loading for images without loading attribute
  document.querySelectorAll('img:not([loading])').forEach(img => img.setAttribute('loading','lazy'));

  // Ensure interactive elements have accessible tap targets
  document.querySelectorAll('button, .btn, .nav-links a').forEach(el => {
    el.style.touchAction = 'manipulation';
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex','0');
  });
})();

/* ===== ANIMATED TESTIMONIALS DATA ===== */
const testimonials = [
    {
        text: "Digital Core created our business website and it completely transformed our online presence. We've seen a 40% increase in inquiries since launch. The team was professional, responsive, and delivered on time.",
        name: "John Mwase",
        role: "Business Owner, Retail Store"
    },
    {
        text: "The network installation and ongoing support from Digital Core has been exceptional. We've had zero downtime since implementation, and their 24/7 support gives us peace of mind. Highly recommended!",
        name: "Grace Kipchoge",
        role: "IT Manager, Educational Institution"
    },
    {
        text: "Their data recovery service saved our business when we accidentally deleted critical files. The team recovered everything confidentially and professionally. Worth every shilling!",
        name: "Peter Njoroge",
        role: "Operations Manager, Corporate Office"
    },
    {
        text: "The custom mobile app they developed for our store has revolutionized our operations. Inventory management, order tracking, and customer communication all in one place. Outstanding work!",
        name: "Sarah Mwase",
        role: "E-commerce Store Owner"
    },
    {
        text: "Our school management system has simplified administrative tasks tremendously. Student records, attendance, grades - everything is now organized and accessible. The training was thorough and staff adapted quickly.",
        name: "Dr. James Kipchoge",
        role: "School Principal"
    },
    {
        text: "The booking website they created has increased our reservations by 60%. Integration with WhatsApp and Google Maps works perfectly. Customer support is always there when we need help.",
        name: "Michael Banda",
        role: "Hotel Manager"
    },
    {
        text: "Their CCTV installation is top-notch. Remote viewing from my phone, clear footage, and reliable 24/7 recording. Installation was clean and professional. I sleep better knowing our mall is secure.",
        name: "Esther Kariuki",
        role: "Security Manager, Shopping Mall"
    },
    {
        text: "Digital Core's inventory management system has reduced our stock discrepancies by 95%. The system is intuitive, fast, and reliable. Their training and support made implementation smooth.",
        name: "Rashid Toure",
        role: "Manufacturing Manager"
    },
    {
        text: "The clinic management system has improved our patient care significantly. Appointment scheduling, medical records, and billing are all integrated. Digital Core's support team is always responsive.",
        name: "Lucy Mamba",
        role: "Clinic Owner"
    },
    {
        text: "Their computer repair and maintenance services have been invaluable. Quick response times, professional diagnostics, and effective solutions. Our downtime has been minimized significantly.",
        name: "Charles Kipkemboi",
        role: "IT Director, Bank"
    },
    {
        text: "The 24/7 support plan we subscribed to has been a lifesaver. Any issue gets resolved quickly by their knowledgeable team. Peace of mind is worth more than gold in today's digital world.",
        name: "Njeri Kipkemboi",
        role: "Office Administrator"
    },
    {
        text: "The delivery tracking app they built for our restaurant has streamlined operations. Customers love being able to track their orders in real-time. Digital Core's innovative approach is impressive.",
        name: "David Banda",
        role: "Restaurant Owner"
    }
];

let currentTestimonialIndex = 0;
let testimonialAutoPlayInterval;

function displayTestimonial(index) {
    const carousel = document.querySelector('.animated-testimonials-carousel');
    if (!carousel) return;

    // Update carousel content
    const testimonial = testimonials[index];
    carousel.innerHTML = `
        <div class="carousel-testimonial active" data-index="${index}">
            <div class="testimonial-content-animated">
                <div class="testimonial-quote-icon">"</div>
                <p class="testimonial-text-animated">${testimonial.text}</p>
                <div class="testimonial-attribution">
                    <strong>${testimonial.name}</strong>
                    <span>${testimonial.role}</span>
                </div>
            </div>
        </div>
    `;

    // Update carousel dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function goToTestimonial(index) {
    currentTestimonialIndex = index;
    displayTestimonial(index);
    resetAutoPlay();
}

function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    displayTestimonial(currentTestimonialIndex);
}

function resetAutoPlay() {
    clearInterval(testimonialAutoPlayInterval);
    testimonialAutoPlayInterval = setInterval(nextTestimonial, 8000);
}

// Initialize testimonials carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.animated-testimonials-carousel')) {
        displayTestimonial(0);
        testimonialAutoPlayInterval = setInterval(nextTestimonial, 8000);
    }
});

/* ===== ENHANCED CONTACT FORM WITH MULTI-CHANNEL SUPPORT ===== */
const originalContactFormHandler = document.querySelector('#contactForm');

if (originalContactFormHandler) {
    originalContactFormHandler.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const service = document.getElementById('service')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        // Validate required fields
        if (!name || !email || !service || !message) {
            alert('Please fill in all required fields (marked with *)');
            return;
        }
        
        // Option 1: Send via email (default)
        sendViaEmail(name, email, phone, service, message);
        
        // Option 2: Also send via WhatsApp for immediate contact
        // Uncomment below to enable dual-channel notification
        // sendViaWhatsApp(name, email, phone, service, message);
    });
}

function sendViaEmail(name, email, phone, service, message) {
    // Construct email message
    const subject = encodeURIComponent(`New Service Inquiry - ${service}`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Service: ${service}\n\n` +
        `Message:\n${message}\n\n` +
        `---\n` +
        `This message was sent through the Digital Core website contact form.`
    );
    
    // Open email client
    window.location.href = `mailto:jerwinjeanadam591@gmail.com?subject=${subject}&body=${body}&cc=${email}`;
    
    // Show success message
    showNotification('Email client opened! Please complete sending your message.');
    
    // Reset form
    setTimeout(() => {
        document.getElementById('contactForm').reset();
    }, 1000);
}

function sendViaWhatsApp(name, email, phone, service, message) {
    const whatsappMessage = encodeURIComponent(
        `*NEW INQUIRY FROM WEBSITE*\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Service: ${service}\n\n` +
        `Message: ${message}`
    );
    
    window.open(`https://wa.me/255764830663?text=${whatsappMessage}`, '_blank');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'contact-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== QUICK CONTACT BUTTONS - ENHANCED =====
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.href;
        if (href.includes('mailto:')) {
            // Email click
            showNotification('Opening your email client...');
        } else if (href.includes('wa.me') || href.includes('whatsapp')) {
            // WhatsApp click
            showNotification('Redirecting to WhatsApp...');
        } else if (href.includes('tel:')) {
            // Phone click
            showNotification('Opening phone dialer...');
        }
    });
});

// ===== AUTO-FILL SERVICE FROM URL PARAMETER =====
function getUrlParameter(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
}

document.addEventListener('DOMContentLoaded', function() {
    const serviceParam = getUrlParameter('package') || getUrlParameter('service');
    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            // Map package names to service values
            const serviceMap = {
                'website': 'Website Development',
                'mobile': 'Mobile App Development',
                'app': 'Mobile App Development',
                'management': 'Management System',
                'system': 'Management System',
                'network': 'Network Setup',
                'cctv': 'CCTV Installation',
                'repair': 'Computer Repair',
                'recovery': 'Data Recovery',
                'software': 'Software Installation',
                'support': '24/7 Technical Support'
            };
            
            let value = serviceParam;
            // Check if we need to map the parameter
            for (let key in serviceMap) {
                if (serviceParam.toLowerCase().includes(key)) {
                    value = serviceMap[key];
                    break;
                }
            }
            
            // Set the select value
            for (let option of serviceSelect.options) {
                if (option.text.includes(value) || option.value === value) {
                    serviceSelect.value = option.value;
                    break;
                }
            }
        }
    }
});

// ===== ENABLE ALL INTERACTIVE FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all buttons are clickable
    document.querySelectorAll('a[href^="#"], button').forEach(el => {
        el.style.cursor = 'pointer';
        el.style.pointerEvents = 'auto';
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ===== ANIMATION: SLIDE IN/OUT NOTIFICATIONS =====
if (!document.querySelector('style[data-notifications]')) {
    const style = document.createElement('style');
    style.setAttribute('data-notifications', 'true');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== AUTO-PLAY TESTIMONIALS CAROUSEL =====
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicatorsContainer = document.querySelector('.testimonials-indicators');
    
    if (testimonialCards.length > 1) {
        let currentIndex = 0;
        let autoPlayInterval;
        
        // Create indicators
        testimonialCards.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = document.querySelectorAll('.indicator');
        const testimonialGrid = document.querySelector('.testimonials-grid');
        
        function updateIndicators() {
            indicators.forEach((ind, index) => {
                ind.classList.toggle('active', index === currentIndex);
            });
        }
        
        function rotateTestimonials() {
            // Remove active class from all cards
            testimonialCards.forEach(card => card.classList.remove('active'));
            
            // Add active class to current card
            testimonialCards[currentIndex].classList.add('active');
            
            // Update indicators
            updateIndicators();
            
            // Move to next card
            currentIndex = (currentIndex + 1) % testimonialCards.length;
        }
        
        function goToSlide(index) {
            currentIndex = index;
            rotateTestimonials();
            
            // Reset auto-play
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(rotateTestimonials, 5000);
        }
        
        // Initial setup - show first card
        testimonialCards[0].classList.add('active');
        updateIndicators();
        startAutoPlay();
        
        // Pause on hover
        testimonialGrid.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        testimonialGrid.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                goToSlide((currentIndex + 1) % testimonialCards.length);
            } else if (e.key === 'ArrowLeft') {
                goToSlide((currentIndex - 1 + testimonialCards.length) % testimonialCards.length);
            }
        });
    }
});
