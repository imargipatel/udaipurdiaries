// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth scrolling for anchor links
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

// Navbar scroll effect - keeping consistent styling
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Add a subtle shadow when scrolled for better visual separation
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.classList.add('fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('fade-in');
                    }
                });
            });
        });
    }
});

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (modal && modalImg && caption && closeBtn) {
        // Open modal when clicking on gallery items
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const overlay = this.querySelector('.gallery-overlay');
                
                if (img) {
                    modal.style.display = 'block';
                    modalImg.src = img.src;
                    modalImg.alt = img.alt;
                    
                    if (overlay) {
                        const title = overlay.querySelector('h3');
                        const description = overlay.querySelector('p');
                        caption.innerHTML = `<h3>${title ? title.textContent : ''}</h3><p>${description ? description.textContent : ''}</p>`;
                    }
                }
            });
        });

        // Close modal when clicking the X
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Flip Card Animation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.destination-card, .gallery-item, .flip-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Enhanced Parallax Effect for Hero Section
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && window.innerWidth > 768) { // Only on desktop
        // Get all parallax layers
        const layer1 = hero.querySelector('.parallax-bg-1');
        const layer2 = hero.querySelector('.parallax-bg-2');
        const layer3 = hero.querySelector('.parallax-bg-3');
        const layer4 = hero.querySelector('.parallax-bg-4');
        
        // Different speeds for each layer (creating depth)
        if (layer1) layer1.style.transform = `translateY(${scrolled * 0.1}px)`;
        if (layer2) layer2.style.transform = `translateY(${scrolled * 0.2}px)`;
        if (layer3) layer3.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (layer4) layer4.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestParallaxUpdate);

// Smooth parallax initialization
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth transition for parallax layers
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach(layer => {
        layer.style.transition = 'transform 0.1s ease-out';
    });
});

// Active Navigation Link Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Form Validation (if contact form exists)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #8B4513;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
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
});

// Keyboard Navigation for Gallery
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            // Previous image logic
            console.log('Previous image');
        } else if (e.key === 'ArrowRight') {
            // Next image logic
            console.log('Next image');
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based functionality here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Destination Detail Modal Data
const destinationData = {
    'City Palace': {
        image: 'assets/images/destinations/city palace1.jpg',
        description: 'The magnificent City Palace is a stunning architectural marvel that stands as a testament to Udaipur\'s royal heritage. Built over 400 years by successive rulers of the Mewar dynasty, this sprawling palace complex offers breathtaking views of Lake Pichola and the surrounding Aravalli hills.',
        location: 'Old City, Udaipur',
        history: 'Built in 1559 by Maharana Udai Singh II, the City Palace has been continuously expanded by his successors. The palace complex consists of 11 palaces, all built by different rulers but designed to look like a unified structure.',
        highlights: [
            'Stunning architecture blending Rajasthani, Mughal, and European styles',
            'Panoramic views of Lake Pichola and surrounding hills',
            'Intricate mirror work and frescoes throughout the palace',
            'The Crystal Gallery featuring rare crystal furniture',
            'The Durbar Hall with its beautiful chandeliers',
            'Museum showcasing royal artifacts and historical items'
        ],
        entryFee: '₹300 for adults, ₹100 for children',
        timings: '9:30 AM - 5:30 PM (Daily)',
        bestTime: 'October to March for pleasant weather',
        duration: '2-3 hours',
        tips: 'Visit early morning to avoid crowds. The palace offers spectacular sunset views from the terrace. Audio guides are available in multiple languages.'
    },
    'Lake Pichola': {
        image: 'assets/images/destinations/lake pichola1.jpg',
        description: 'Lake Pichola is the heart and soul of Udaipur, an artificial freshwater lake that has become the city\'s most iconic landmark. Surrounded by hills, palaces, and temples, this serene lake offers some of the most picturesque views in Rajasthan.',
        location: 'Heart of Udaipur',
        history: 'Built in 1362 AD by Pichhu Banjara, a gypsy banjara who transported grain during the reign of Maharana Lakha. The lake was later extended by Maharana Udai Singh II after he founded the city of Udaipur.',
        highlights: [
            'Boat rides offering stunning palace and temple views',
            'Jag Mandir and Jag Niwas (Lake Palace) islands',
            'Beautiful sunrise and sunset views',
            'Photography opportunities at every angle',
            'Peaceful atmosphere away from city hustle',
            'View of City Palace from the water'
        ],
        entryFee: '₹400 for adults (boat ride), ₹200 for children',
        timings: '10:00 AM - 6:00 PM (Boat rides)',
        bestTime: 'October to March, especially during sunset',
        duration: '1-2 hours for boat ride',
        tips: 'Sunset boat rides are highly recommended for the best photography. Book tickets in advance during peak season. The lake is most beautiful during monsoon when water levels are high.'
    },
    'Fateh Sagar Lake': {
        image: 'assets/images/destinations/fateh sagar lake.jpg',
        description: 'Fateh Sagar Lake is a beautiful artificial lake located north of Lake Pichola, offering a more peaceful and less touristy experience. The lake is surrounded by hills and dotted with three islands, making it a perfect spot for relaxation and photography.',
        location: 'North of Lake Pichola',
        history: 'Built in 1678 by Maharana Jai Singh and later reconstructed by Maharana Fateh Singh after it was washed away in floods. The lake was named after Maharana Fateh Singh.',
        highlights: [
            'Three scenic islands in the middle of the lake',
            'Nehru Park on one of the islands',
            'Less crowded than Lake Pichola',
            'Beautiful hill views around the lake',
            'Popular spot for locals and tourists alike',
            'Great for evening walks and photography'
        ],
        entryFee: '₹150 for adults (boat ride), ₹75 for children',
        timings: '9:00 AM - 6:00 PM (Boat rides)',
        bestTime: 'October to March, evenings are particularly pleasant',
        duration: '1-2 hours',
        tips: 'Visit during evening hours for beautiful lighting. The lake is perfect for families with children. Try the local street food around the lake area.'
    },
    'Jag Mandir': {
        image: 'assets/images/destinations/jag mandir.jpg',
        description: 'Jag Mandir is a stunning island palace located on Lake Pichola, often referred to as the "Lake Garden Palace." This architectural gem served as a summer resort for the royal family and now stands as one of Udaipur\'s most romantic and picturesque destinations.',
        location: 'Island on Lake Pichola',
        history: 'Built in 1551 by Maharana Karan Singh and later expanded by Maharana Jagat Singh I. The palace was used as a refuge by Prince Khurram (later Emperor Shah Jahan) when he rebelled against his father, Emperor Jahangir.',
        highlights: [
            'Beautiful island palace architecture',
            'Stunning views of the lake and surrounding hills',
            'Historical significance as Shah Jahan\'s refuge',
            'Perfect for romantic dinners and events',
            'Photography opportunities from every angle',
            'Peaceful atmosphere away from the mainland'
        ],
        entryFee: '₹400 for adults (includes boat ride), ₹200 for children',
        timings: '10:00 AM - 6:00 PM',
        bestTime: 'October to March, sunset visits are magical',
        duration: '2-3 hours including boat ride',
        tips: 'Book sunset dinner packages for a romantic experience. The palace is popular for destination weddings. Photography is allowed throughout the palace.'
    },
    'Jagdish Temple': {
        image: 'assets/images/destinations/jagdhish temple1.jpg',
        description: 'Jagdish Temple is one of the most famous and architecturally significant temples in Udaipur. Dedicated to Lord Vishnu, this magnificent temple showcases exquisite Indo-Aryan architecture and serves as a spiritual center for devotees and tourists alike.',
        location: 'Near City Palace',
        history: 'Built in 1651 by Maharana Jagat Singh I, who ruled Mewar from 1628 to 1652. The temple took 25 years to complete and is considered one of the finest examples of Indo-Aryan architecture in Rajasthan.',
        highlights: [
            'Magnificent Indo-Aryan architecture',
            'Intricate carvings and sculptures',
            'Active temple with daily prayers and rituals',
            'Beautiful courtyard and pillared hall',
            'Spiritual atmosphere and peaceful ambiance',
            'Close proximity to City Palace'
        ],
        entryFee: 'Free entry',
        timings: '5:00 AM - 9:00 PM (Daily)',
        bestTime: 'Early morning for prayers or evening for peaceful visit',
        duration: '30-45 minutes',
        tips: 'Remove shoes before entering. Photography is allowed but be respectful during prayer times. Visit during evening aarti for a spiritual experience.'
    },
    'Saheliyon ki Bari': {
        image: 'assets/images/destinations/saheliyonkibaari1.jpeg',
        description: 'Saheliyon ki Bari, or "Garden of the Maidens," is a beautiful garden complex built for the royal ladies of Udaipur. This charming garden features fountains, kiosks, marble elephants, and a lotus pool, creating a serene and romantic atmosphere.',
        location: 'North of Fateh Sagar Lake',
        history: 'Built in the 18th century by Maharana Sangram Singh II for the royal ladies and their friends. The garden was designed as a leisure spot for the women of the royal household.',
        highlights: [
            'Beautiful marble elephants and fountains',
            'Lotus pool with stunning reflections',
            'Well-maintained gardens and pathways',
            'Peaceful atmosphere perfect for relaxation',
            'Photography opportunities throughout',
            'Less crowded compared to other attractions'
        ],
        entryFee: '₹10 for adults, ₹5 for children',
        timings: '8:00 AM - 7:00 PM (Daily)',
        bestTime: 'October to March, early morning or late afternoon',
        duration: '1-2 hours',
        tips: 'Visit during monsoon when fountains are operational. The garden is perfect for family picnics. Photography is allowed throughout the complex.'
    },
    'Bagore ki Haveli': {
        image: 'assets/images/destinations/Bagore Ki Haveli.jpg',
        description: 'Bagore ki Haveli is a magnificent 18th-century haveli located on the banks of Lake Pichola at Gangaur Ghat. This beautifully restored heritage building now serves as a museum showcasing the rich cultural heritage of Rajasthan and hosts traditional cultural performances.',
        location: 'Gangaur Ghat, Lake Pichola',
        history: 'Built in the 18th century by Amarchand Badwa, the Prime Minister of Mewar. The haveli was later restored and converted into a museum to preserve the cultural heritage of Rajasthan.',
        highlights: [
            'Beautiful traditional Rajasthani architecture',
            'Museum with royal artifacts and cultural exhibits',
            'Traditional dance and music performances',
            'Stunning views of Lake Pichola',
            'Intricate mirror work and frescoes',
            'Cultural heritage preservation'
        ],
        entryFee: '₹100 for adults, ₹50 for children',
        timings: '9:30 AM - 5:30 PM (Museum), 7:00 PM - 8:00 PM (Cultural shows)',
        bestTime: 'October to March, evening shows are popular',
        duration: '2-3 hours including cultural show',
        tips: 'Book cultural show tickets in advance. The evening shows are highly recommended. Combine visit with Lake Pichola boat ride.'
    },
    'Monsoon Palace': {
        image: 'assets/images/destinations/Monsoon Palace.jpg',
        description: 'The Monsoon Palace, also known as Sajjangarh Palace, is perched on a hilltop offering panoramic views of Udaipur city and its lakes. Built as an astronomical center and monsoon palace, it now serves as a popular tourist destination for its breathtaking sunset views.',
        location: 'Sajjangarh Hills, Udaipur',
        history: 'Built in 1884 by Maharana Sajjan Singh, who intended it to be an astronomical center. The palace was designed to track monsoon clouds and was used as a summer resort by the royal family.',
        highlights: [
            'Panoramic views of Udaipur city and lakes',
            'Spectacular sunset views',
            'Hilltop location with cool breeze',
            'Photography opportunities',
            'Less crowded compared to city attractions',
            'Beautiful drive up the hill'
        ],
        entryFee: '₹100 for adults, ₹50 for children',
        timings: '8:00 AM - 6:00 PM (Daily)',
        bestTime: 'October to March, sunset time (5:30-6:30 PM)',
        duration: '2-3 hours including travel time',
        tips: 'Visit during sunset for the best views. The drive up the hill is scenic but can be steep. Bring a camera for panoramic shots.'
    },
    'Vintage Car Museum': {
        image: 'assets/images/destinations/vintage car museum.jpg',
        description: 'The Vintage Car Museum showcases an impressive collection of classic cars that once belonged to the royal family of Mewar. This unique museum offers a glimpse into the luxurious lifestyle of the Maharanas and their passion for automobiles.',
        location: 'Garden Hotel, Udaipur',
        history: 'The museum houses a collection of royal cars from the Mewar dynasty, including vehicles used by various Maharanas. These cars represent the royal family\'s love for luxury and automotive excellence.',
        highlights: [
            'Collection of royal vintage cars',
            'Well-preserved historical vehicles',
            'Insight into royal lifestyle',
            'Photography opportunities',
            'Air-conditioned museum space',
            'Guided tours available'
        ],
        entryFee: '₹300 for adults, ₹150 for children',
        timings: '9:00 AM - 9:00 PM (Daily)',
        bestTime: 'October to March, any time of day',
        duration: '1-2 hours',
        tips: 'Photography is allowed. The museum is air-conditioned, making it a good option during hot afternoons. Combine with other nearby attractions.'
    },
    'Doodh Talai Lake': {
        image: 'assets/images/destinations/dudh talai.jpg',
        description: 'Doodh Talai Lake is a small but picturesque lake located near Lake Pichola, famous for its ropeway that takes visitors to the Karni Mata Temple. This spot offers excellent sunset views and a peaceful atmosphere away from the main tourist areas.',
        location: 'Near Lake Pichola',
        history: 'The lake and ropeway were developed to provide access to the Karni Mata Temple and offer tourists an alternative viewpoint of Udaipur. The ropeway system was installed to make the temple accessible to all visitors.',
        highlights: [
            'Cable car ride to Karni Mata Temple',
            'Excellent sunset views',
            'Less crowded than main attractions',
            'Photography opportunities',
            'Peaceful lake setting',
            'Temple visit included'
        ],
        entryFee: '₹200 for adults (ropeway), ₹100 for children',
        timings: '9:00 AM - 6:00 PM (Ropeway)',
        bestTime: 'October to March, sunset time',
        duration: '1-2 hours including ropeway ride',
        tips: 'Visit during sunset for the best experience. The ropeway offers great views of the city. Combine with other nearby attractions.'
    },
    'Ahar Cenotaphs': {
        image: 'assets/images/destinations/ahar cenotaphs.jpg',
        description: 'Ahar Cenotaphs is the royal cremation ground of the Mewar rulers, featuring beautifully carved marble domes and memorials. This serene and historically significant site offers a peaceful atmosphere and showcases the architectural skills of the royal craftsmen.',
        location: 'Ahar, 2 km from Udaipur',
        history: 'The cenotaphs were built over several centuries to honor the deceased rulers of the Mewar dynasty. Each cenotaph represents the resting place of a Maharana and showcases the architectural style of their respective eras.',
        highlights: [
            'Beautifully carved marble domes',
            'Historical significance',
            'Peaceful and serene atmosphere',
            'Photography opportunities',
            'Less touristy destination',
            'Insight into royal traditions'
        ],
        entryFee: '₹30 for adults, ₹15 for children',
        timings: '9:00 AM - 5:00 PM (Daily)',
        bestTime: 'October to March, early morning or late afternoon',
        duration: '1-2 hours',
        tips: 'Visit early morning for the best photography light. The site is peaceful and perfect for quiet contemplation. Photography is allowed throughout.'
    },
    'Eklingji Temple': {
        image: 'assets/images/destinations/eklingji temple.jpg',
        description: 'Eklingji Temple is a famous Shiva temple located 22 km from Udaipur, serving as the patron deity of the Mewar dynasty. This ancient temple complex features intricate architecture and holds great religious significance for the people of Rajasthan.',
        location: '22 km from Udaipur',
        history: 'The temple has been the patron deity of the Mewar rulers for centuries. The current structure was built by Maharana Raimal in the 15th century, though the temple\'s history dates back much earlier.',
        highlights: [
            'Ancient Shiva temple architecture',
            'Religious significance',
            'Intricate carvings and sculptures',
            'Active temple with daily prayers',
            'Historical importance',
            'Peaceful spiritual atmosphere'
        ],
        entryFee: 'Free entry',
        timings: '4:30 AM - 7:00 PM (Daily)',
        bestTime: 'October to March, early morning for prayers',
        duration: '1-2 hours including travel',
        tips: 'Remove shoes before entering. Photography may be restricted in some areas. Visit during morning prayers for a spiritual experience.'
    },
    'Ambrai Ghat': {
        image: 'assets/images/destinations/ambrai ghat1.jpg',
        description: 'Ambrai Ghat is a beautiful waterfront area on Lake Pichola, offering some of the most stunning views of the lake and the City Palace. This peaceful spot is perfect for photography, evening walks, and enjoying the serene beauty of Udaipur.',
        location: 'Lake Pichola waterfront',
        history: 'The ghat has been a significant part of Udaipur\'s waterfront for centuries, serving as a gathering place for locals and a viewpoint for the royal palaces. It has been maintained and beautified over the years.',
        highlights: [
            'Stunning views of Lake Pichola',
            'Perfect photography spot',
            'Peaceful evening atmosphere',
            'View of City Palace from water',
            'Less crowded than main attractions',
            'Great for romantic walks'
        ],
        entryFee: 'Free entry',
        timings: '24 hours (best at sunset)',
        bestTime: 'October to March, sunset time',
        duration: '1-2 hours',
        tips: 'Visit during sunset for the best views and photography. The ghat is perfect for romantic walks. Bring a camera for stunning shots.'
    },
    'Hathi Pol Bazaar': {
        image: 'assets/images/destinations/hathipolbazaar.jpg',
        description: 'Hathi Pol Bazaar is a vibrant traditional market in the old city, famous for its authentic Rajasthani handicrafts, especially traditional paintings like Pichwai and Phad art. This bustling bazaar offers a true taste of local culture and shopping.',
        location: 'Old City, near City Palace',
        history: 'The bazaar has been a center of traditional arts and crafts for centuries, with local artisans passing down their skills through generations. It continues to be a hub for authentic Rajasthani artwork.',
        highlights: [
            'Traditional Rajasthani paintings (Pichwai & Phad)',
            'Handicrafts and colorful fabrics',
            'Authentic local shopping experience',
            'Direct interaction with artisans',
            'Reasonable prices for quality items',
            'Cultural immersion opportunity'
        ],
        entryFee: 'Free entry',
        timings: '9:00 AM - 8:00 PM (Daily)',
        bestTime: 'October to March, morning or evening',
        duration: '2-3 hours for shopping',
        tips: 'Bargain politely for better prices. Most shops are run by local artisans. Look for authentic Pichwai paintings and traditional handicrafts.'
    },
    'Bada Bazaar': {
        image: 'assets/images/destinations/bada bazaar.png',
        description: 'Bada Bazaar is the oldest and busiest market in Udaipur, offering a wide variety of traditional items including Bandhani sarees, silver jewelry, Mojris, and ethnic wear. This authentic market provides a genuine local shopping experience.',
        location: 'Old City, Udaipur',
        history: 'As one of the oldest markets in Udaipur, Bada Bazaar has been serving locals and visitors for centuries. It continues to be a hub for traditional Rajasthani goods and authentic local products.',
        highlights: [
            'Bandhani & Batik printed sarees',
            'Silver jewelry and ornaments',
            'Traditional Mojris (footwear)',
            'Camel leather bags',
            'Ethnic wear and accessories',
            'Authentic local products'
        ],
        entryFee: 'Free entry',
        timings: '9:00 AM - 8:00 PM (Daily)',
        bestTime: 'October to March, morning or evening',
        duration: '2-3 hours for shopping',
        tips: 'Bargain for better prices. Best place for ethnic wear and silver ornaments. Look for authentic Bandhani work and traditional Mojris.'
    },
    'Bapu Bazaar': {
        image: 'assets/images/destinations/bapu bazaar.jpg',
        description: 'Bapu Bazaar is a local-style market offering a mix of everything from clothes and textiles to gadgets and household goods. This authentic bazaar provides a more local shopping experience compared to tourist-oriented markets.',
        location: 'Old City, Udaipur',
        history: 'Bapu Bazaar has evolved as a local market serving the everyday needs of Udaipur residents while also attracting tourists looking for authentic local products and reasonable prices.',
        highlights: [
            'Mix of clothes, textiles, and gadgets',
            'Stationery and household goods',
            'Local-style shopping experience',
            'Udaipur T-shirts and cotton wear',
            'Reasonable prices',
            'Authentic local atmosphere'
        ],
        entryFee: 'Free entry',
        timings: '9:00 AM - 8:00 PM (Daily)',
        bestTime: 'October to March, morning or evening',
        duration: '1-2 hours for shopping',
        tips: 'Great for Udaipur T-shirts and comfortable cotton wear. More local-style bazaar with authentic products. Bargain for better prices.'
    },
    'Moti Chowk Bazaar': {
        image: 'assets/images/destinations/moti chowk.jpg',
        description: 'Moti Chowk Bazaar, located near Jagdish Temple, is famous for its handicrafts, traditional jewelry, and art shops. This picturesque market area is filled with shops selling antiques, miniature paintings, and traditional art pieces.',
        location: 'Near Jagdish Temple',
        history: 'The bazaar has been a center for traditional arts and crafts, with local artisans and shopkeepers specializing in miniature paintings, handicrafts, and traditional jewelry for generations.',
        highlights: [
            'Handicrafts and traditional jewelry',
            'Antiques and miniature paintings',
            'Art shops and galleries',
            'Picturesque streets',
            'Hand-painted souvenirs',
            'Marble carvings and artifacts'
        ],
        entryFee: 'Free entry',
        timings: '9:00 AM - 8:00 PM (Daily)',
        bestTime: 'October to March, morning or evening',
        duration: '2-3 hours for shopping',
        tips: 'Don\'t miss hand-painted souvenirs and marble carvings. The area is perfect for art lovers. Look for authentic miniature paintings and traditional handicrafts.'
    }
};

// Destination Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const destinationModal = document.getElementById('destinationModal');
    const flipCards = document.querySelectorAll('.flip-card');
    
    if (destinationModal && flipCards.length > 0) {
        // Add click event to all destination cards
        flipCards.forEach(card => {
            card.addEventListener('click', function() {
                const titleElement = this.querySelector('h3');
                if (titleElement) {
                    const destinationName = titleElement.textContent.trim();
                    openDestinationModal(destinationName);
                }
            });
        });

        // Close modal functionality
        const closeBtn = destinationModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeDestinationModal);
        }

        // Close modal when clicking outside
        destinationModal.addEventListener('click', function(e) {
            if (e.target === destinationModal) {
                closeDestinationModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && destinationModal.style.display === 'block') {
                closeDestinationModal();
            }
        });
    }
});

function openDestinationModal(destinationName) {
    const modal = document.getElementById('destinationModal');
    const data = destinationData[destinationName];
    
    if (!data) {
        console.error('Destination data not found:', destinationName);
        return;
    }

    // Populate modal with destination data
    const modalImage = document.getElementById('modalImage');
    modalImage.src = data.image;
    modalImage.alt = destinationName;
    document.getElementById('modalTitle').textContent = destinationName;
    document.getElementById('modalDescription').textContent = data.description;
    
    // Handle image loading with enhanced display
    modalImage.onload = function() {
        this.style.opacity = '1';
        
        // Detect if image is portrait or landscape
        const isPortrait = this.naturalHeight > this.naturalWidth;
        const container = this.parentElement;
        
        if (isPortrait) {
            // For portrait images, ensure they're properly centered and sized
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
            this.style.maxHeight = '75vh';
            this.style.width = 'auto';
        } else {
            // For landscape images, maintain current behavior
            this.style.maxWidth = '100%';
            this.style.maxHeight = '80vh';
        }
    };
    
    modalImage.onerror = function() {
        this.style.opacity = '1';
        this.src = 'assets/images/placeholder.jpg'; // Fallback image
    };
    
    // Add click to expand functionality
    modalImage.onclick = function() {
        showFullscreenImage(this.src, this.alt);
    };
    document.getElementById('modalLocation').textContent = data.location;
    document.getElementById('modalHistory').textContent = data.history;
    document.getElementById('modalEntryFee').textContent = data.entryFee;
    document.getElementById('modalTimings').textContent = data.timings;
    document.getElementById('modalBestTime').textContent = data.bestTime;
    document.getElementById('modalDuration').textContent = data.duration;

    // Populate highlights
    const highlightsList = document.getElementById('modalHighlights');
    highlightsList.innerHTML = '';
    data.highlights.forEach(highlight => {
        const li = document.createElement('li');
        li.textContent = highlight;
        highlightsList.appendChild(li);
    });

    // Show/hide tips section
    const tipsSection = document.getElementById('modalTipsSection');
    if (data.tips) {
        document.getElementById('modalTips').textContent = data.tips;
        tipsSection.style.display = 'block';
    } else {
        tipsSection.style.display = 'none';
    }

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeDestinationModal() {
    const modal = document.getElementById('destinationModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fullscreen image functionality
function showFullscreenImage(src, alt) {
    // Create fullscreen overlay
    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.className = 'fullscreen-image';
    fullscreenDiv.innerHTML = `<img src="${src}" alt="${alt}">`;
    
    // Add to body
    document.body.appendChild(fullscreenDiv);
    document.body.style.overflow = 'hidden';
    
    // Close on click
    fullscreenDiv.onclick = function() {
        document.body.removeChild(fullscreenDiv);
        document.body.style.overflow = 'auto';
    };
    
    // Close on escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(fullscreenDiv);
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    // Show all items
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    // Show only items that match the filter
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.style.display = 'block';
                        item.classList.add('fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('fade-in');
                    }
                }
            });
        });
    });

    // Image modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close');

    // Add click event to all gallery images
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        item.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = img.src;
            captionText.innerHTML = overlay.querySelector('h3').textContent + '<br>' + overlay.querySelector('p').textContent;
        });
    });

    // Close modal when clicking the close button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});

