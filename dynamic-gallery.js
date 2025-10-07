// Dynamic Gallery System
// Loads images from folders based on category selection

class DynamicGallery {
    constructor() {
        this.categories = {
            'all': 'All',
            'palaces': 'Palaces',
            'lakes': 'Lakes', 
            'ghats': 'Ghats',
            'bazaar': 'Bazaar',
            'art-handicrafts': 'Art & Handicrafts',
            'restaurants-cafes': 'Restaurants and Cafes',
            'temples': 'Temples',
            'gardens': 'Gardens',
            'museums': 'Museums'
        };

        this.folderMapping = {
            'palaces': 'Palaces',
            'lakes': 'Lakes',
            'ghats': 'Ghats', 
            'bazaar': 'Bazaar',
            'art-handicrafts': 'Restaurants and Cafes', // Using available folder
            'restaurants-cafes': 'Restaurants and Cafes',
            'temples': 'Temples',
            'gardens': 'Gardens',
            'museums': 'Museums'
        };

        this.imageCache = new Map();
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.createFilterButtons();
        this.loadAllImages();
        this.setupEventListeners();
    }

    createFilterButtons() {
        const filterContainer = document.querySelector('.filter-buttons');
        if (!filterContainer) return;

        // Clear existing buttons
        filterContainer.innerHTML = '';

        // Create buttons for each category
        Object.entries(this.categories).forEach(([key, label]) => {
            const button = document.createElement('button');
            button.className = `filter-btn ${key === 'all' ? 'active' : ''}`;
            button.setAttribute('data-filter', key);
            button.textContent = label;
            filterContainer.appendChild(button);
        });
    }

    async loadAllImages() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        // Show loading state
        galleryGrid.innerHTML = '<div class="loading">Loading gallery...</div>';

        try {
            // Load images for each category
            for (const [categoryKey, folderName] of Object.entries(this.folderMapping)) {
                await this.loadImagesFromFolder(categoryKey, folderName);
            }

            // Display all images initially
            this.displayImages('all');
        } catch (error) {
            console.error('Error loading images:', error);
            galleryGrid.innerHTML = '<div class="error">Error loading gallery images.</div>';
        }
    }

    async loadImagesFromFolder(categoryKey, folderName) {
        // Only load images for categories that actually have images
        const imageLists = {
            'Palaces': [
                'cp1.jpg', 'cp2.jpg', 'cp3.jpg', 'cp4.jpg', 'cp5.jpg',
                'cp6.jpg', 'cp7.jpg', 'cp8.jpg', 'cp9.jpg', 'cp10.jpg', 'cp11.jpg'
            ]
        };

        const images = imageLists[folderName] || [];
        
        if (images.length === 0) {
            // For categories without images, create placeholder data
            const placeholderData = [{
                src: `https://via.placeholder.com/400x300/8B4513/ffffff?text=${encodeURIComponent(this.categories[categoryKey])}`,
                alt: `${this.categories[categoryKey]} - Coming Soon`,
                title: `${this.categories[categoryKey]} - Coming Soon`,
                description: `More ${this.categories[categoryKey].toLowerCase()} images will be added soon!`,
                category: categoryKey,
                isPlaceholder: true
            }];
            this.imageCache.set(categoryKey, placeholderData);
            return;
        }

        const imageData = images.map((imageName, index) => ({
            src: `assets/images/gallery/${folderName}/${imageName}`,
            alt: this.generateAltText(categoryKey, index + 1),
            title: this.generateTitle(categoryKey, index + 1),
            description: this.generateDescription(categoryKey, index + 1),
            category: categoryKey,
            isPlaceholder: false
        }));

        this.imageCache.set(categoryKey, imageData);
    }

    generateAltText(category, index) {
        const categoryNames = {
            'palaces': 'Palace',
            'lakes': 'Lake',
            'ghats': 'Ghat',
            'bazaar': 'Bazaar',
            'restaurants-cafes': 'Restaurant',
            'temples': 'Temple',
            'gardens': 'Garden',
            'museums': 'Museum'
        };
        return `${categoryNames[category] || 'Udaipur'} ${index}`;
    }

    generateTitle(category, index) {
        const titles = {
            'palaces': ['City Palace', 'Jag Mandir', 'Sajjangarh Palace', 'Taj Lake Palace', 'Fateh Prakash Palace', 'Shiv Niwas Palace', 'Jag Niwas Palace', 'Monsoon Palace', 'Bagore Ki Haveli', 'Crystal Gallery', 'Amar Vilas'],
            'lakes': ['Lake Pichola', 'Fateh Sagar Lake', 'Udai Sagar Lake', 'Jaisamand Lake', 'Dhebar Lake'],
            'ghats': ['Gangaur Ghat', 'Ambrai Ghat', 'Lal Ghat', 'Bagore Ghat'],
            'bazaar': ['Hathi Pol Bazaar', 'Bada Bazaar', 'Clock Tower Market', 'Jagdish Chowk'],
            'restaurants-cafes': ['Ambrai Ghat Restaurant', 'Upre Restaurant', 'Café Coffee Day'],
            'temples': ['Jagdish Temple', 'Eklingji Temple', 'Sas Bahu Temple'],
            'gardens': ['Saheliyon Ki Bari', 'Gulab Bagh', 'Fateh Sagar Garden'],
            'museums': ['City Palace Museum', 'Crystal Gallery', 'Vintage Car Museum']
        };
        return titles[category]?.[index - 1] || `${category.charAt(0).toUpperCase() + category.slice(1)} ${index}`;
    }

    generateDescription(category, index) {
        const descriptions = {
            'palaces': [
                'Royal architecture overlooking Lake Pichola',
                'Island palace in Lake Pichola',
                'Monsoon Palace with panoramic views',
                'Luxury hotel floating on Lake Pichola',
                'Heritage palace with stunning architecture',
                'Palace with beautiful courtyards',
                'Historic palace with lake views',
                'Palace built for monsoon viewing',
                'Traditional haveli with cultural shows',
                'Museum with crystal artifacts',
                'Palace with royal dining experience'
            ],
            'lakes': [
                'Heart of Udaipur with stunning reflections',
                'Beautiful lake with three islands',
                'Historic lake with scenic views',
                'Largest artificial lake in Asia',
                'Picturesque lake surrounded by hills'
            ],
            'ghats': [
                'Historic ghat with beautiful architecture',
                'Perfect spot for sunset views',
                'Colorful ghat with heritage hotels',
                'Traditional ghat with cultural significance'
            ],
            'bazaar': [
                'Vibrant market with traditional crafts',
                'Traditional market for textiles and jewelry',
                'Bustling market around historic clock tower',
                'Local market with authentic handicrafts'
            ],
            'restaurants-cafes': [
                'Dining with stunning lake views',
                'Authentic Rajasthani cuisine',
                'Coffee with panoramic lake views'
            ],
            'temples': [
                'Ancient Hindu temple with intricate carvings',
                'Sacred temple dedicated to Lord Shiva',
                'Twin temples with beautiful architecture'
            ],
            'gardens': [
                'Garden of Maidens with fountains',
                'Rose garden with peaceful atmosphere',
                'Botanical garden with diverse flora'
            ],
            'museums': [
                'Royal artifacts and historical treasures',
                'Crystal collection and palace history',
                'Vintage car collection of the royal family'
            ]
        };
        return descriptions[category]?.[index - 1] || `Beautiful view of Udaipur's ${category}`;
    }

    displayImages(category) {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';

        if (category === 'all') {
            // Display images from all categories
            this.imageCache.forEach((images) => {
                images.forEach(imageData => this.createGalleryItem(imageData, galleryGrid));
            });
        } else {
            // Display images from specific category
            const images = this.imageCache.get(category) || [];
            images.forEach(imageData => this.createGalleryItem(imageData, galleryGrid));
        }

        this.currentCategory = category;
        this.setupImageModal();
    }

    createGalleryItem(imageData, container) {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${imageData.isPlaceholder ? 'placeholder' : ''}`;
        galleryItem.setAttribute('data-category', imageData.category);

        galleryItem.innerHTML = `
            <img src="${imageData.src}" alt="${imageData.alt}" loading="lazy">
            <div class="gallery-overlay">
                <h3>${imageData.title}</h3>
                <p>${imageData.description}</p>
            </div>
        `;

        // Add click event for modal (only for real images, not placeholders)
        if (!imageData.isPlaceholder) {
            galleryItem.addEventListener('click', () => {
                this.openModal(imageData);
            });
        } else {
            galleryItem.style.cursor = 'default';
        }

        container.appendChild(galleryItem);
    }

    setupImageModal() {
        // Remove existing modal if any
        const existingModal = document.getElementById('imageModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <span class="close">&times;</span>
            <img class="modal-content" id="modalImage">
            <div id="caption"></div>
        `;

        document.body.appendChild(modal);

        // Setup modal functionality
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    openModal(imageData) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const caption = document.getElementById('caption');

        modal.style.display = 'block';
        modalImg.src = imageData.src;
        modalImg.alt = imageData.alt;
        caption.innerHTML = `<h3>${imageData.title}</h3><p>${imageData.description}</p>`;
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const category = e.target.getAttribute('data-filter');
                this.setActiveButton(e.target);
                this.displayImages(category);
            }
        });
    }

    setActiveButton(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
}

// Initialize the dynamic gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicGallery();
});
