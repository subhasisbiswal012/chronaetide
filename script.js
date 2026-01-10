// ============================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================
const CONFIG = {
    username: "Kairavi",
    password: "Chora",
    girlName: "Kairavi",
    boyName: "Chora",
    loginFailMessage: "The stars do not align. Try again, my dear.",
    loginSuccessMessage: "Welcome to your constellation of dreams..."
};

// ============================================
// STAR GENERATION
// ============================================
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// ============================================
// AUDIO MANAGEMENT
// ============================================
const backgroundMusic = document.getElementById('backgroundMusic');
const globalAudioControl = document.getElementById('globalAudioControl');
const musicIcon = document.getElementById('musicIcon');
const musicMutedIcon = document.getElementById('musicMutedIcon');

let isMusicPlaying = false;

function startBackgroundMusic() {
    if (!isMusicPlaying) {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicIcon.style.display = 'block';
            musicMutedIcon.style.display = 'none';
        }).catch(err => console.log('Audio play failed:', err));
    }
}

globalAudioControl.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicIcon.style.display = 'block';
        musicMutedIcon.style.display = 'none';
        isMusicPlaying = true;
    } else {
        backgroundMusic.pause();
        musicIcon.style.display = 'none';
        musicMutedIcon.style.display = 'block';
        isMusicPlaying = false;
    }
});

// Video audio controls - FIXED: Show muted icon initially
document.querySelectorAll('.video-audio-control').forEach(control => {
    const videoId = control.dataset.videoId;
    const video = document.querySelector(`video[data-video-id="${videoId}"]`);
    const volumeOn = control.querySelector('.volume-on');
    const volumeOff = control.querySelector('.volume-off');
    
    // Set initial state - videos start muted
    if (video && video.muted) {
        volumeOn.style.display = 'none';
        volumeOff.style.display = 'block';
    }
    
    control.addEventListener('click', function(e) {
        e.stopPropagation();

        if (video.muted) {
            video.muted = false;
            volumeOn.style.display = 'block';
            volumeOff.style.display = 'none';
        } else {
            video.muted = true;
            volumeOn.style.display = 'none';
            volumeOff.style.display = 'block';
        }
    });
});

// ============================================
// LOGIN HANDLING
// ============================================
let isAuthenticated = false;
const synth = window.speechSynthesis;

function speak(text) {
    if (synth.speaking) {
        synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    synth.speak(utterance);
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageBox = document.getElementById('messageBox');

    startBackgroundMusic();

    if (username === CONFIG.username && password === CONFIG.password) {
        isAuthenticated = true;
        messageBox.textContent = CONFIG.loginSuccessMessage;
        messageBox.className = 'message-box success show';
        
        speak(CONFIG.loginSuccessMessage);

        setTimeout(() => {
            document.getElementById('loginOverlay').classList.add('hidden');
            messageBox.classList.remove('show');
        }, 2000);
    } else {
        messageBox.textContent = CONFIG.loginFailMessage;
        messageBox.className = 'message-box error show';
        
        speak(CONFIG.loginFailMessage);

        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
});

// ============================================
// LOADING MANAGEMENT
// ============================================
window.addEventListener('load', function() {
    const videos = document.querySelectorAll('video');
    const moonImage = document.getElementById('moonImage');
    let loadedCount = 0;
    const totalAssets = videos.length + 1;

    function checkAllLoaded() {
        loadedCount++;
        if (loadedCount >= totalAssets) {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 500);
        }
    }

    videos.forEach(video => {
        if (video.readyState >= 3) {
            checkAllLoaded();
        } else {
            video.addEventListener('loadeddata', checkAllLoaded);
        }
    });

    if (moonImage.complete) {
        checkAllLoaded();
    } else {
        moonImage.addEventListener('load', checkAllLoaded);
        moonImage.addEventListener('error', checkAllLoaded);
    }

    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 5000);
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
function handleScroll() {
    const memoryItems = document.querySelectorAll('.memory-item');
    const windowHeight = window.innerHeight;
    const windowCenter = windowHeight / 2;
    
    // Moon fade based on scroll position
    const moon = document.querySelector('.moon');
    const heroSection = document.querySelector('.hero');
    
    if (moon && heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        const heroHeight = heroRect.height;
        
        // Simple logic:
        // - When heroBottom >= heroHeight (at top), opacity = 1
        // - When heroBottom <= 0 (scrolled past hero), opacity = 0
        // - Fade happens in the second half of the hero section
        
        if (heroBottom >= heroHeight * 0.5) {
            // In the top half of hero - fully visible
            moon.style.opacity = 1;
        } else if (heroBottom <= 0) {
            // Scrolled past hero - fully hidden
            moon.style.opacity = 0;
        } else {
            // In the bottom half of hero - fade out
            // heroBottom goes from heroHeight*0.5 to 0
            // opacity goes from 1 to 0
            const fadeProgress = heroBottom / (heroHeight * 0.5);
            moon.style.opacity = Math.max(0, Math.min(1, fadeProgress));
        }
    }

    memoryItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + (rect.height / 2);

        if (rect.top < windowHeight && rect.bottom > 0) {
            item.classList.add('visible');
        }

        const videoContainer = item.querySelector('.video-container');
        const video = videoContainer.querySelector('video');
        
        if (Math.abs(itemCenter - windowCenter) < 200) {
            videoContainer.classList.add('active');
            video.play().catch(err => console.log('Video play failed:', err));
        } else {
            videoContainer.classList.remove('active');
            video.pause();
        }
    });
}

// ============================================
// GOLDEN THREAD PATH GENERATION
// ============================================
function updateThreadPath() {
    const memoryGallery = document.querySelector('.memory-gallery');
    const memoryItems = document.querySelectorAll('.memory-item');
    const tarotSection = document.querySelector('.tarot-section');
    
    if (!memoryItems.length) return;

    const galleryRect = memoryGallery.getBoundingClientRect();
    const tarotRect = tarotSection ? tarotSection.getBoundingClientRect() : null;
    const galleryWidth = galleryRect.width;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    let pathData = '';
    let svgHeight = 0;
    
    if (isMobile) {
        // Mobile: Smooth flowing S-curves down center connecting to each video
        const centerX = galleryWidth / 2;
        
        // Get first video position
        const firstItem = memoryItems[0];
        const firstVideoContainer = firstItem.querySelector('.video-container');
        const firstVideoRect = firstVideoContainer.getBoundingClientRect();
        const firstRelativeTop = firstItem.getBoundingClientRect().top - galleryRect.top + window.scrollY;
        const firstVideoY = firstRelativeTop + (firstItem.getBoundingClientRect().height / 2);
        
        // Start from top center
        pathData = `M ${centerX} 0`;
        
        // Smooth curve to first video
        pathData += ` C ${centerX} ${firstVideoY * 0.3}, ${centerX} ${firstVideoY * 0.7}, ${centerX} ${firstVideoY}`;
        
        let prevY = firstVideoY;
        
        // Connect all videos with smooth S-curves
        for (let i = 1; i < memoryItems.length; i++) {
            const item = memoryItems[i];
            const itemRect = item.getBoundingClientRect();
            const relativeTop = itemRect.top - galleryRect.top + window.scrollY;
            const videoY = relativeTop + (itemRect.height / 2);
            
            const distance = videoY - prevY;
            
            // Smooth S-curve amplitude
            const amplitude = Math.min(60, galleryWidth * 0.15);
            const direction = i % 2 === 0 ? 1 : -1;
            
            // Control points for smooth S-curve
            const cp1Y = prevY + distance * 0.25;
            const cp2Y = prevY + distance * 0.75;
            
            pathData += ` C ${centerX + (amplitude * direction)} ${cp1Y}, ${centerX - (amplitude * direction)} ${cp2Y}, ${centerX} ${videoY}`;
            
            prevY = videoY;
            svgHeight = Math.max(svgHeight, videoY);
        }
        
        // Flow to tarot section
        if (tarotRect) {
            const tarotRelativeTop = tarotRect.top - galleryRect.top + window.scrollY;
            const tarotY = tarotRelativeTop + 50;
            const distanceToTarot = tarotY - prevY;
            
            pathData += ` C ${centerX + 30} ${prevY + distanceToTarot * 0.3}, ${centerX - 30} ${prevY + distanceToTarot * 0.7}, ${centerX} ${tarotY}`;
            
            svgHeight = tarotY + 50;
        } else {
            svgHeight = prevY + 200;
        }
        
    } else {
        // Desktop/Tablet: Smooth flowing S-curves connecting directly to each video center
        const startX = galleryWidth / 2;
        
        // Get first video position
        const firstItem = memoryItems[0];
        const firstVideoContainer = firstItem.querySelector('.video-container');
        const firstVideoRect = firstVideoContainer.getBoundingClientRect();
        const firstRelativeTop = firstItem.getBoundingClientRect().top - galleryRect.top + window.scrollY;
        const firstRelativeLeft = firstVideoRect.left - galleryRect.left;
        const firstVideoX = firstRelativeLeft + (firstVideoRect.width / 2);
        const firstVideoY = firstRelativeTop + (firstItem.getBoundingClientRect().height / 2);
        
        // Start from top center
        pathData = `M ${startX} 0`;
        
        // Smooth entry curve to first video
        const entryMidY = firstVideoY * 0.5;
        pathData += ` C ${startX} ${entryMidY * 0.5}, ${firstVideoX} ${entryMidY}, ${firstVideoX} ${firstVideoY}`;
        
        let prevX = firstVideoX;
        let prevY = firstVideoY;
        
        // Connect remaining videos with smooth S-curves
        for (let i = 1; i < memoryItems.length; i++) {
            const item = memoryItems[i];
            const itemRect = item.getBoundingClientRect();
            const videoContainer = item.querySelector('.video-container');
            const videoRect = videoContainer.getBoundingClientRect();
            
            const relativeTop = itemRect.top - galleryRect.top + window.scrollY;
            const relativeVideoLeft = videoRect.left - galleryRect.left;
            
            const videoX = relativeVideoLeft + (videoRect.width / 2);
            const videoY = relativeTop + (itemRect.height / 2);
            
            const xDistance = videoX - prevX;
            const yDistance = videoY - prevY;
            
            // Calculate smooth S-curve control points
            // The curve should go: down first, then across, then down to target
            const midY = prevY + yDistance * 0.5;
            
            // First control point: mostly vertical movement from previous point
            const cp1X = prevX;
            const cp1Y = midY;
            
            // Second control point: mostly vertical movement to target point
            const cp2X = videoX;
            const cp2Y = midY;
            
            pathData += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${videoX} ${videoY}`;
            
            prevX = videoX;
            prevY = videoY;
            svgHeight = Math.max(svgHeight, videoY);
        }
        
        // Flow to tarot section with smooth curve
        if (tarotRect) {
            const tarotRelativeTop = tarotRect.top - galleryRect.top + window.scrollY;
            const tarotCenterX = galleryWidth / 2;
            const tarotY = tarotRelativeTop + 50;
            
            const xDistToTarot = tarotCenterX - prevX;
            const yDistToTarot = tarotY - prevY;
            const midY = prevY + yDistToTarot * 0.5;
            
            // Smooth curve to center of tarot section
            pathData += ` C ${prevX} ${midY}, ${tarotCenterX} ${midY}, ${tarotCenterX} ${tarotY}`;
            
            svgHeight = tarotY + 50;
        } else {
            svgHeight = prevY + 200;
        }
    }
    
    // Update SVG paths
    const svg = document.querySelector('.golden-thread svg');
    if (!svg) return;
    
    const threadPath = svg.querySelector('.thread-path');
    const threadGlow = svg.querySelector('.thread-glow');
    const threadShimmer = svg.querySelector('.thread-shimmer');
    const hiddenPath = svg.querySelector('#threadPath');
    
    svg.setAttribute('viewBox', `0 0 ${galleryWidth} ${svgHeight}`);
    svg.style.width = galleryWidth + 'px';
    svg.style.height = svgHeight + 'px';
    
    if (threadPath) threadPath.setAttribute('d', pathData);
    if (threadGlow) threadGlow.setAttribute('d', pathData);
    if (threadShimmer) threadShimmer.setAttribute('d', pathData);
    if (hiddenPath) hiddenPath.setAttribute('d', pathData);
}

// Debounce helper
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

// Throttle helper for smoother resize
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Track previous width to detect actual resize
let previousWidth = window.innerWidth;

// Update thread on load and resize
window.addEventListener('load', function() {
    // Delay initial calculation to ensure DOM is fully rendered
    setTimeout(updateThreadPath, 100);
    setTimeout(updateThreadPath, 500);
});

// Handle resize with proper recalculation
window.addEventListener('resize', debounce(function() {
    const currentWidth = window.innerWidth;
    
    // Only recalculate if width actually changed (not just height/scroll)
    if (Math.abs(currentWidth - previousWidth) > 10) {
        previousWidth = currentWidth;
        
        // Force scroll to top briefly to get accurate measurements
        const currentScroll = window.scrollY;
        
        // Recalculate after a short delay for DOM to settle
        setTimeout(() => {
            updateThreadPath();
        }, 100);
    }
}, 150));

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 10);
    });

    handleScroll();
    
    setTimeout(updateThreadPath, 500);
    
    // Initialize tarot carousel
    initTarotCarousel();
});

// ============================================
// TAROT CARD FUNCTIONALITY
// ============================================

// Flip card function
function flipCard(cardElement) {
    const isFlipped = cardElement.classList.contains('flipped');
    
    // Toggle flip
    cardElement.classList.toggle('flipped');
    
    // Play chime sound
    const chimeSound = document.getElementById('chimeSound');
    if (chimeSound) {
        chimeSound.currentTime = 0;
        chimeSound.play().catch(err => console.log('Chime play failed:', err));
    }
    
    // Create glitter effect
    if (!isFlipped) {
        createGlitterEffect(cardElement);
    }
}

// Create glitter/sparkle effect
function createGlitterEffect(cardElement) {
    const glitterContainer = cardElement.querySelector('.glitter-container');
    const cardRect = cardElement.getBoundingClientRect();
    
    // Create multiple glitter particles
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const glitter = document.createElement('div');
            glitter.className = 'glitter';
            
            // Random position around the card
            const x = Math.random() * cardRect.width;
            const y = Math.random() * cardRect.height;
            
            glitter.style.left = x + 'px';
            glitter.style.top = y + 'px';
            
            // Random size
            const size = Math.random() * 8 + 4;
            glitter.style.width = size + 'px';
            glitter.style.height = size + 'px';
            
            // Random animation duration
            glitter.style.animationDuration = (Math.random() * 0.5 + 0.8) + 's';
            
            glitterContainer.appendChild(glitter);
            
            // Remove after animation
            setTimeout(() => {
                glitter.remove();
            }, 1500);
        }, i * 30);
    }
}

// Initialize tarot carousel
function initTarotCarousel() {
    const track = document.getElementById('tarotTrack');
    const wrapper = document.querySelector('.tarot-cards-wrapper');
    const leftArrow = document.getElementById('carouselLeft');
    const rightArrow = document.getElementById('carouselRight');
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.tarot-card-container');
    
    if (!track || !leftArrow || !rightArrow || cards.length === 0) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Check if we need carousel
    function needsCarousel() {
        return window.innerWidth <= 1100;
    }
    
    // Check if tablet (show peek of side cards)
    function isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1100;
    }
    
    // Check if mobile (show only one card)
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Get card dimensions
    function getCardWidth() {
        if (cards.length === 0) return 300;
        return cards[0].offsetWidth;
    }
    
    function getGap() {
        const trackStyle = window.getComputedStyle(track);
        return parseInt(trackStyle.gap) || 30;
    }
    
    // Calculate the offset to center the current card
    function calculateCenterOffset(index) {
        const cardWidth = getCardWidth();
        const gap = getGap();
        const wrapperWidth = wrapper.offsetWidth;
        
        // Position of the card's left edge
        const cardPosition = index * (cardWidth + gap);
        
        // Offset to center the card in the wrapper
        const centerOffset = (wrapperWidth - cardWidth) / 2;
        
        return centerOffset - cardPosition;
    }
    
    // Update carousel position
    function updateCarousel(animate = true) {
        if (!needsCarousel()) {
            track.style.transform = 'translateX(0)';
            track.style.transition = 'none';
            return;
        }
        
        const offset = calculateCenterOffset(currentIndex);
        
        if (animate) {
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide with infinite loop
    function goToSlide(index, animate = true) {
        // Infinite loop logic
        if (index < 0) {
            currentIndex = totalCards - 1;
        } else if (index >= totalCards) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateCarousel(animate);
    }
    
    // Arrow click handlers
    leftArrow.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    rightArrow.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isDragging = true;
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging || !needsCarousel()) return;
        
        const currentX = e.changedTouches[0].screenX;
        const diff = currentX - touchStartX;
        const baseOffset = calculateCenterOffset(currentIndex);
        
        // Live drag feedback
        track.style.transition = 'none';
        track.style.transform = `translateX(${baseOffset + diff}px)`;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const swipeThreshold = 50;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - go to next
                goToSlide(currentIndex + 1);
            } else {
                // Swipe right - go to previous
                goToSlide(currentIndex - 1);
            }
        } else {
            // Snap back to current card
            updateCarousel(true);
        }
    }, { passive: true });
    
    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel(false);
        }, 100);
    });
    
    // Initial update (start at first card, centered)
    currentIndex = 0;
    setTimeout(() => {
        updateCarousel(false);
    }, 100);
}