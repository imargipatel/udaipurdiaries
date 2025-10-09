// Dynamic Gallery with Image Loading from Assets
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    const galleryGrid = document.getElementById('galleryGrid');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noImagesMessage = document.getElementById('noImagesMessage');
    
    if (!filterButtons.length || !galleryGrid) return;

    // Global variables for keyboard navigation and touch events
    let currentImageIndex = 0;
    let currentImages = [];
    let currentCategory = 'all';
    
    // Touch event variables
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let minSwipeDistance = 50; // Minimum distance for a swipe

    // Image data mapping - maps filter categories to folder names and image info
    const imageData = {
        'palaces': {
            folder: 'Palaces',
            images: [
                { name: 'Bagore Ki Haveli.jpg', title: 'Bagore Ki Haveli', description: 'Historic haveli with beautiful architecture' },
                { name: 'Bagore Ki Haveli1.jpg', title: 'Bagore Ki Haveli Interior', description: 'Intricate interior details' },
                { name: 'Bagore Ki Haveli2.jpg', title: 'Bagore Ki Haveli Courtyard' },
                { name: 'cp1.jpg', title: 'City Palace ', description: 'Majestic view of City Palace' },
                { name: 'cp2.jpg', title: 'City Palace', description: 'Royal architecture details' },
                { name: 'cp3.jpg', title: 'City Palace ', description: 'Beautiful palace courtyard' },
                { name: 'cp4.jpg', title: 'City Palace ', description: 'Ornate palace gates' },
                { name: 'cp5.jpg', title: 'City Palace ', description: 'Grand palace hall' },
                { name: 'cp6.jpg', title: 'City Palace ', description: 'Palace terrace with lake views' },
                { name: 'cp7.jpg', title: 'City Palace ', description: 'Intricate architectural details' },
                { name: 'cp8.jpg', title: 'City Palace ', description: 'Palace garden area' },
                { name: 'cp9.jpg', title: 'City Palace ', description: 'Stunning palace facade' },
                { name: 'cp10.jpg', title: 'City Palace ', description: 'Luxurious palace interior' },
                { name: 'cp11.jpg', title: 'City Palace', description: 'Beautiful palace windows' },
                { name: 'Jag Mandir.jpg', title: 'Jag Mandir', description: 'Island palace in Lake Pichola' },
                { name: 'Jagmandir Island Palace.jpg', title: 'Jagmandir Palace', description: 'Floating palace on the lake' },
                { name: 'Monsoon Palace.jpg', title: 'Monsoon Palace', description: 'Sajjangarh Monsoon Palace' },
                { name: 'Monsoon Palace1.jpg', title: 'Monsoon Palace View', description: 'Panoramic views from Monsoon Palace' },
                { name: 'Monsoon Palace 2.jpg', title: 'Monsoon Palace Sunset', description: 'Sunset view from Monsoon Palace' },
                { name: 'Taj Lake Palace.jpg', title: 'Taj Lake Palace', description: 'Luxury hotel floating on Lake Pichola' }
            ]
        },
        'lakes': {
            folder: 'Lakes',
            images: [
                { name: 'Badi lake, Udaipur.jpg', title: 'Badi Lake', description: 'Serene Badi Lake views' },
                { name: 'Dodh Talai Lake.jpg', title: 'Dodh Talai Lake', description: 'Small lake with ropeway to Karni Mata Temple' },
                { name: 'Fateh Sagar Lake.jpg', title: 'Fateh Sagar Lake', description: 'Beautiful lake with three islands' },
                { name: 'Fateh Sagar Lake1.jpg', title: 'Fateh Sagar Lake View', description: 'Panoramic view of Fateh Sagar' },
                { name: 'Lake Pichola.jpg', title: 'Lake Pichola', description: 'Heart of Udaipur with stunning reflections' },
                { name: 'Lake Pichola1.jpg', title: 'Lake Pichola Sunset', description: 'Magical sunset over Lake Pichola' }
            ]
        },
        'ghats': {
            folder: 'Ghats',
            images: [
                { name: 'ambrai ghat.jpg', title: 'Ambrai Ghat', description: 'Historic ghat with stunning lake views' },
                { name: 'ambrai ghat1.jpg', title: 'Ambrai Ghat View', description: 'Peaceful spot perfect for photography' },
                { name: 'gangaur ghat.jpg', title: 'Gangaur Ghat', description: 'Traditional ghat with cultural significance' },
                { name: 'gangaur ghat1.jpg', title: 'Gangaur Ghat Steps', description: 'Beautiful stone steps leading to the water' },
                { name: 'gangaur ghat2.jpg', title: 'Gangaur Ghat Architecture', description: 'Intricate architectural details' },
                { name: 'gangaur ghat3.jpg', title: 'Gangaur Ghat Sunset', description: 'Magical sunset views from the ghat' },
                { name: 'gangaur ghat4.jpg', title: 'Gangaur Ghat Reflection', description: 'Stunning water reflections' },
                { name: 'gangaur ghat5.jpg', title: 'Gangaur Ghat Panorama', description: 'Panoramic view of the ghat area' }
            ]
        },
        'bazaar': {
            folder: 'Bazaar',
            images: [
                { name: 'bada bazaar.png', title: 'Bada Bazaar', description: 'Oldest and busiest market in Udaipur' },
                { name: 'bada bazaar1.jpg', title: 'Bada Bazaar Shops', description: 'Traditional shops selling ethnic wear and silver ornaments' },
                { name: 'bapu bazaar.jpg', title: 'Bapu Bazaar', description: 'Local-style bazaar with mix of everything' },
                { name: 'bapu bazaar1.jpg', title: 'Bapu Bazaar Street', description: 'Bustling street with clothes, textiles and gadgets' },
                { name: 'haathipolbazaar1.jpg', title: 'Hathi Pol Bazaar', description: 'Traditional market near City Palace' },
                { name: 'hathipolbazaar.jpg', title: 'Hathi Pol Bazaar Shops', description: 'Famous for traditional Rajasthani paintings and handicrafts' },
                { name: 'moti chowk.jpg', title: 'Moti Chowk Bazaar', description: 'Picturesque streets full of art shops and jewelry' }
            ]
        },
        'temples': {
            folder: 'Temples',
            images: [
                { name: 'jagdhish temple1.jpg', title: 'Jagdish Temple Interior', description: 'Magnificent Hindu temple dedicated to Lord Vishnu' },
                { name: 'Jagdish temple, Udaipur.jpg', title: 'Jagdish Temple', description: 'Famous temple with intricate architecture near City Palace' }
            ]
        },
        'museums': {
            folder: 'Museums',
            images: [
                { name: 'Ahar Cenotaphs in Udaipur - What Those Amazing Instagram Photos Don\'t Tell You!.jpg', title: 'Ahar Cenotaphs', description: 'Royal cremation ground of Mewar rulers with beautifully carved marble domes' },
                { name: 'Rajasthani artifacts.jpg', title: 'Rajasthani Artifacts', description: 'Traditional artifacts and cultural items on display' },
                { name: 'shilpgram.jpg', title: 'Shilpgram', description: 'Crafts village showcasing traditional arts and crafts' },
                { name: 'shilpgram1.jpg', title: 'Shilpgram Village', description: 'Traditional village setting with local artisans' },
                { name: 'vintagecarmuseum.jpg', title: 'Vintage Car Museum', description: 'Collection of royal cars from Mewar dynasty' },
                { name: 'vintagecarmuseum1.jpg', title: 'Vintage Car Collection', description: 'Historical vehicles showcasing royal heritage' }
            ]
        },
        'gardens': {
            folder: 'Gardens',
            images: [
                { name: 'Saheliyon Ki Baari.jpg', title: 'Saheliyon Ki Baari', description: 'Garden of Maidens with fountains and marble elephants' },
                { name: 'Saheliyon Ki Baari1.jpg', title: 'Saheliyon Ki Baari Fountains', description: 'Beautiful fountains and water features' },
                { name: 'Saheliyon Ki Baari2.jpg', title: 'Saheliyon Ki Baari Garden', description: 'Traditional garden built for royal ladies' }
            ]
        },
        'restaurants': {
            folder: 'Restaurants and Cafes',
            images: [
                { name: 'Upre, Udaipur.jpg', title: 'Upre Restaurant', description: 'Historic restaurant with stunning lake views and royal ambiance' },
                { name: 'Ambrai Restaurant.jpg', title: 'Ambrai Restaurant', description: 'Fine dining restaurant with stunning lake views' },
                { name: 'Aravalli Lakeview.jpg', title: 'Aravalli Lakeview Restaurant', description: 'Scenic restaurant offering panoramic views of the Aravalli hills' },
                { name: 'Jagat niwas palace, Udaipur.jpg', title: 'Jagat Niwas Palace Restaurant', description: 'Luxury dining experience in a beautiful palace setting' },
                { name: 'Jagat Niwas Palace.jpg', title: 'Jagat Niwas Palace Dining', description: 'Royal dining experience with traditional architecture' },
                { name: 'Jheel cafe (1).jpg', title: 'Jheel Cafe Interior', description: 'Cozy cafe with traditional Rajasthani ambiance' },
                { name: 'Jheel cafe.jpg', title: 'Jheel Cafe', description: 'Popular cafe known for its lake views and delicious food' },
                { name: 'The Best Places to Visit in Udaipur — A Two Day Itinerary.jpg', title: 'Udaipur Dining Guide', description: 'Comprehensive guide to the best dining experiences in Udaipur' },
                { name: 'Upre by 1559 AD.jpg', title: 'Upre by 1559 AD', description: 'Historic restaurant with royal heritage and traditional cuisine' }
            ]
        }
    };

    // Function to create gallery item HTML
    function createGalleryItem(imageInfo, category) {
        const imagePath = `assets/images/gallery/${imageData[category].folder}/${imageInfo.name}`;
        return `
            <div class="gallery-item" data-category="${category}">
                <img src="${imagePath}" alt="${imageInfo.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${imageInfo.title}</h3>
                    <p>${imageInfo.description}</p>
                </div>
            </div>
        `;
    }

    // Function to load images for a specific category
    function loadCategoryImages(category) {
        showLoading();
        galleryGrid.innerHTML = '';
        currentCategory = category;
        
        // Reset current images array
        currentImages = [];
        
        if (category === 'all') {
            // Load all categories
            Object.keys(imageData).forEach(cat => {
                imageData[cat].images.forEach(imageInfo => {
                    const galleryItem = createGalleryItem(imageInfo, cat);
                    galleryGrid.insertAdjacentHTML('beforeend', galleryItem);
                    // Add to current images array for navigation
                    currentImages.push({
                        src: `assets/images/gallery/${imageData[cat].folder}/${imageInfo.name}`,
                        alt: imageInfo.title,
                        title: imageInfo.title
                    });
                });
            });
        } else if (imageData[category]) {
            // Load specific category
            imageData[category].images.forEach(imageInfo => {
                const galleryItem = createGalleryItem(imageInfo, category);
                galleryGrid.insertAdjacentHTML('beforeend', galleryItem);
                // Add to current images array for navigation
                currentImages.push({
                    src: `assets/images/gallery/${imageData[category].folder}/${imageInfo.name}`,
                    alt: imageInfo.title,
                    title: imageInfo.title
                });
            });
        }
        
        hideLoading();
        
        // Show no images message if no images found
        if (galleryGrid.children.length === 0) {
            showNoImages();
        } else {
            hideNoImages();
        }
        
        // Add click handlers to new images
        addImageClickHandlers();
    }

    // Function to show loading spinner
    function showLoading() {
        loadingSpinner.style.display = 'block';
        galleryGrid.style.display = 'none';
        hideNoImages();
    }

    // Function to hide loading spinner
    function hideLoading() {
        loadingSpinner.style.display = 'none';
        galleryGrid.style.display = 'grid';
    }

    // Function to show no images message
    function showNoImages() {
        noImagesMessage.style.display = 'block';
    }

    // Function to hide no images message
    function hideNoImages() {
        noImagesMessage.style.display = 'none';
    }

    // Function to set active filter button
    function setActiveFilter(btn) {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    // Function to add click handlers to gallery images
    function addImageClickHandlers() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const caption = document.getElementById('caption');
        const closeBtn = document.querySelector('.close');

        galleryItems.forEach((img, index) => {
            // Add double-click handler for opening modal
            img.addEventListener('dblclick', (e) => {
                e.preventDefault();
                currentImageIndex = index;
                openModal(img);
            });

            // Add single-click handler for hover effect (optional)
            img.addEventListener('click', (e) => {
                // Prevent default to avoid conflicts
                e.preventDefault();
            });
        });

        // Close modal functionality
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal();
            });
        }

        // Close modal when clicking outside the image
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        // Close modal with Escape key and navigate with arrow keys
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        closeModal();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        navigateToNextImage();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        navigateToPreviousImage();
                        break;
                }
            }
        });

        // Add touch event handlers for mobile navigation
        addTouchEventHandlers();
    }

    // Function to open modal with proper image sizing
    function openModal(img) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const caption = document.getElementById('caption');

        modal.style.display = 'block';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        
        // Update image counter
        updateImageCounter();

        // Ensure image loads properly
        modalImg.onload = () => {
            // Reset any inline styles that might cause distortion
            modalImg.style.width = 'auto';
            modalImg.style.height = 'auto';
            modalImg.style.maxWidth = '95%';
            modalImg.style.maxHeight = '95%';
            modalImg.style.objectFit = 'contain';
        };

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModal() {
        const modal = document.getElementById('imageModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Function to navigate to next image
    function navigateToNextImage() {
        if (currentImages.length === 0) return;
        
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        updateModalImage();
        showNavigationFeedback('next');
    }

    // Function to navigate to previous image
    function navigateToPreviousImage() {
        if (currentImages.length === 0) return;
        
        currentImageIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
        updateModalImage();
        showNavigationFeedback('previous');
    }

    // Function to show visual feedback for navigation
    function showNavigationFeedback(direction) {
        const modal = document.getElementById('imageModal');
        const feedback = document.createElement('div');
        feedback.className = 'navigation-feedback';
        feedback.textContent = direction === 'next' ? '→' : '←';
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            ${direction === 'next' ? 'right' : 'left'}: 50px;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.8);
            font-size: 3rem;
            font-weight: bold;
            pointer-events: none;
            z-index: 2002;
            animation: fadeInOut 0.5s ease;
        `;
        
        modal.appendChild(feedback);
        
        // Remove feedback after animation
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 500);
    }

    // Function to update modal image
    function updateModalImage() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const caption = document.getElementById('caption');
        
        if (currentImages[currentImageIndex]) {
            modalImg.src = currentImages[currentImageIndex].src;
            modalImg.alt = currentImages[currentImageIndex].alt;
            caption.textContent = currentImages[currentImageIndex].title;
            
            // Update image counter if it exists
            updateImageCounter();
        }
    }

    // Function to update image counter display
    function updateImageCounter() {
        const caption = document.getElementById('caption');
        if (currentImages.length > 1) {
            caption.textContent = `${currentImages[currentImageIndex].title} (${currentImageIndex + 1} of ${currentImages.length})`;
        } else {
            caption.textContent = currentImages[currentImageIndex].title;
        }
    }

    // Function to add touch event handlers for mobile navigation
    function addTouchEventHandlers() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        
        if (!modal || !modalImg) return;

        // Touch start event
        modal.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });

        // Touch end event
        modal.addEventListener('touchend', (e) => {
            if (e.changedTouches.length === 1) {
                touchEndX = e.changedTouches[0].clientX;
                touchEndY = e.changedTouches[0].clientY;
                handleSwipeGesture();
            }
        }, { passive: true });

        // Prevent default touch behaviors that might interfere
        modal.addEventListener('touchmove', (e) => {
            // Allow vertical scrolling but prevent horizontal scrolling
            if (Math.abs(e.touches[0].clientX - touchStartX) > Math.abs(e.touches[0].clientY - touchStartY)) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Function to handle swipe gestures
    function handleSwipeGesture() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const deltaDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // If it's a very small movement, treat it as a tap to close
        if (deltaDistance < 10) {
            // Check if tap was on the background (not on the image)
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const rect = modalImg.getBoundingClientRect();
            
            // If tap was outside the image area, close modal
            if (touchEndX < rect.left || touchEndX > rect.right || 
                touchEndY < rect.top || touchEndY > rect.bottom) {
                closeModal();
            }
            return;
        }
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - go to previous image
                navigateToPreviousImage();
            } else {
                // Swipe left - go to next image
                navigateToNextImage();
            }
        }
    }

    // Add click handlers to filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.filter;
            setActiveFilter(btn);
            loadCategoryImages(category);
        });
    });

    // Initialize with all images
    loadCategoryImages('all');
});

// Add CSS for loading spinner and no images message
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        text-align: center;
        padding: 2rem;
    }
    
    .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #8B4513;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .no-images-message {
        text-align: center;
        padding: 3rem;
        color: #666;
        font-size: 1.1rem;
    }
    
    .gallery-item img {
        transition: transform 0.3s ease;
    }
    
    .gallery-item:hover img {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);