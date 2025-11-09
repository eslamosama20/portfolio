// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Images - Load all images from the asmaa image folder
const gallery = document.getElementById('gallery');
const imagePaths = [
    'IMG-20251015-WA0044.jpg', 'IMG-20251015-WA0045.jpg', 'IMG-20251015-WA0046.jpg',
    'IMG-20251015-WA0047.jpg', 'IMG-20251015-WA0048.jpg', 'IMG-20251015-WA0049.jpg',
    'IMG-20251015-WA0050.jpg', 'IMG-20251015-WA0051.jpg', 'IMG-20251015-WA0052.jpg',
    'IMG-20251015-WA0053.jpg', 'IMG-20251015-WA0054.jpg', 'IMG-20251015-WA0055.jpg',
    'IMG-20251015-WA0056.jpg', 'IMG-20251015-WA0057.jpg', 'IMG-20251015-WA0058.jpg',
    'IMG-20251015-WA0059.jpg', 'IMG-20251015-WA0060.jpg', 'IMG-20251015-WA0061.jpg',
    'IMG-20251015-WA0062.jpg', 'IMG-20251015-WA0063.jpg', 'IMG-20251015-WA0064.jpg',
    'IMG-20251015-WA0065.jpg', 'IMG-20251109-WA0123.jpg', 'IMG-20251109-WA0124.jpg',
    'IMG-20251109-WA0125.jpg', 'IMG-20251109-WA0126.jpg', 'IMG-20251109-WA0128.jpg',
    'IMG-20251109-WA0129.jpg', 'IMG-20251109-WA0130.jpg', 'IMG-20251109-WA0131.jpg',
    'IMG-20251109-WA0132.jpg', 'IMG-20251109-WA0133.jpg', 'IMG-20251109-WA0134.jpg',
    'IMG-20251109-WA0135.jpg', 'IMG-20251109-WA0136.jpg', 'IMG-20251109-WA0137.jpg',
    'IMG-20251109-WA0138.jpg', 'IMG-20251109-WA0139.jpg', 'IMG-20251109-WA0140.jpg',
    'IMG-20251109-WA0141.jpg', 'IMG-20251109-WA0142.jpg', 'IMG-20251109-WA0143.jpg',
    'IMG-20251109-WA0144.jpg', 'IMG-20251109-WA0145.jpg', 'IMG-20251109-WA0146.jpg',
    'IMG-20251109-WA0147.jpg', 'IMG-20251109-WA0148.jpg', 'IMG-20251109-WA0149.jpg',
    'IMG-20251109-WA0150.jpg', 'IMG-20251109-WA0151.jpg', 'IMG-20251109-WA0152.jpg',
    'IMG-20251109-WA0153.jpg', 'IMG-20251109-WA0154.jpg', 'IMG-20251109-WA0155.jpg',
    'IMG-20251109-WA0156.jpg'
];

// Randomly assign categories to images for demo purposes
const categories = ['brand', 'social', 'print'];
let allImages = [];

imagePaths.forEach((path, index) => {
    const category = categories[index % 3]; // Distribute evenly
    const item = {
        path: encodeURI(`asmaa image/${path}`),
        category: category,
        index: index
    };
    allImages.push(item);
    
    const galleryItem = document.createElement('div');
    galleryItem.className = `gallery-item ${category}`;
    galleryItem.dataset.category = category;
    galleryItem.dataset.index = index;
    
    const img = document.createElement('img');
    img.src = item.path;
    img.alt = `Design Work ${index + 1}`;
    img.loading = 'lazy';
    
    // Add error handling
    img.onerror = function() {
        console.error('Failed to load image:', item.path);
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23ddd" width="400" height="400"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Not Found%3C/text%3E%3C/svg%3E';
    };
    
    galleryItem.appendChild(img);
    gallery.appendChild(galleryItem);
    
    // Add click event for lightbox
    galleryItem.addEventListener('click', () => openLightbox(index));
});

// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.dataset.filter;
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.dataset.category === filterValue) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    lightbox.style.display = 'block';
    lightboxImg.src = allImages[index].path;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= allImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = allImages.length - 1;
    }
    
    lightboxImg.src = allImages[currentImageIndex].path;
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => changeImage(-1));
nextBtn.addEventListener('click', () => changeImage(1));

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    }
});

// Scroll Animation for sections (excluding portfolio to prevent image disappearing)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section:not(.portfolio)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Portfolio section should always be visible
const portfolioSection = document.querySelector('.portfolio');
if (portfolioSection) {
    portfolioSection.style.opacity = '1';
    portfolioSection.style.transform = 'translateY(0)';
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    }
    
    lastScroll = currentScroll;
});

console.log('Portfolio loaded successfully! Total images:', allImages.length);
