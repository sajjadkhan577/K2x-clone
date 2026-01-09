// Mobile Menu Functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const hamburger = document.getElementById('hamburger');

// Toggle mobile menu with hamburger/X transformation
function toggleMobileMenu() {
    const isOpen = mobileMenuOverlay.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    
    // Update aria label for accessibility
    mobileMenuToggle.setAttribute('aria-label', 
        isOpen ? 'Close menu' : 'Open menu'
    );
}

// Open/close mobile menu
mobileMenuToggle.addEventListener('click', toggleMobileMenu);

// Close menu when clicking outside
mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        toggleMobileMenu();
    }
});

// Close mobile menu when window is resized to desktop size
function handleResize() {
    if (window.innerWidth > 768) {
        // Close mobile menu if open
        if (mobileMenuOverlay.classList.contains('active')) {
            mobileMenuOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Add resize listener
window.addEventListener('resize', handleResize);

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// ===== MOBILE SUBMENU FUNCTIONALITY - FIXED =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile submenu functionality
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    
    console.log('Found submenu toggles:', submenuToggles.length); // Debug log
    
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Submenu toggle clicked'); // Debug log
            
            const parentItem = this.parentElement;
            console.log('Parent item:', parentItem); // Debug log
            
            // Close other open submenus
            document.querySelectorAll('.has-submenu.active').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('active');
                    const arrow = item.querySelector('.submenu-arrow');
                    if (arrow) arrow.textContent = '+';
                }
            });
            
            // Toggle current submenu
            parentItem.classList.toggle('active');
            
            const arrow = this.querySelector('.submenu-arrow');
            if (parentItem.classList.contains('active')) {
                arrow.textContent = '-';
            } else {
                arrow.textContent = '+';
            }
            
            console.log('Submenu active:', parentItem.classList.contains('active')); // Debug log
        });
    });
    
    // Close submenus when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.has-submenu')) {
                document.querySelectorAll('.has-submenu.active').forEach(item => {
                    item.classList.remove('active');
                    const arrow = item.querySelector('.submenu-arrow');
                    if (arrow) arrow.textContent = '+';
                });
            }
        }
    });
    
    // Close submenus when clicking on a submenu link
    const submenuLinks = document.querySelectorAll('.mobile-nav .submenu a');
    console.log('Submenu links found:', submenuLinks.length); // Debug log
    
    submenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Submenu link clicked'); // Debug log
            document.querySelectorAll('.has-submenu.active').forEach(item => {
                item.classList.remove('active');
                const arrow = item.querySelector('.submenu-arrow');
                if (arrow) arrow.textContent = '+';
            });
            
            // Also close mobile menu
            toggleMobileMenu();
        });
    });
    
    // Close menu when clicking on regular mobile nav links (except submenu toggles)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a:not(.submenu-toggle)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('submenu-toggle')) {
                toggleMobileMenu();
            }
        });
    });
});

// ===== SMOOTH SCROLLING =====
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for desktop nav links
    document.querySelectorAll('.desktop-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if(window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
});

// ===== HERO SLIDER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Function to show next slide
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Function to show previous slide
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Start auto slide
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 2000); // Change slide every 5 seconds
    }

    // Stop auto slide
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Event listeners for navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Pause auto slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoSlide);
        heroSlider.addEventListener('mouseleave', startAutoSlide);
        
        // Touch events for mobile
        heroSlider.addEventListener('touchstart', stopAutoSlide);
        heroSlider.addEventListener('touchend', () => {
            setTimeout(startAutoSlide, 2000);
        });
    }

    // Start auto slide initially
    startAutoSlide();

    console.log('Slider initialized with', slides.length, 'slides');
});

// ===== DROPDOWN MENU FOR DESKTOP =====
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.desktop-nav .has-dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-menu').style.opacity = '1';
            this.querySelector('.dropdown-menu').style.visibility = 'visible';
            this.querySelector('.dropdown-menu').style.transform = 'translateX(-50%) translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-menu').style.opacity = '0';
            this.querySelector('.dropdown-menu').style.visibility = 'hidden';
            this.querySelector('.dropdown-menu').style.transform = 'translateX(-50%) translateY(10px)';
        });
    });
});

// Initialize all functionality
console.log('Website loaded successfully');