// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');

let currentImages = [];
let currentIndex = 0;

// Open lightbox when image is clicked
document.querySelectorAll('.project-images img').forEach(img => {
    img.addEventListener('click', function() {
        const project = this.getAttribute('data-project');
        currentImages = Array.from(document.querySelectorAll(`img[data-project="${project}"]`));
        currentIndex = parseInt(this.getAttribute('data-index'));
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
    lightboxImg.src = currentImages[currentIndex].src;
    lightboxImg.alt = currentImages[currentIndex].alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
    }
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Add syntax highlighting for code snippets
document.addEventListener('DOMContentLoaded', function() {
    const codeElements = document.querySelectorAll('.code-snippet code');
    
    codeElements.forEach(code => {
        const text = code.textContent;
        // Simple SQL syntax highlighting
        const highlighted = text
            .replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|COUNT|AVG|SUM|MIN|MAX|ROUND|AS|AND|OR|NOT|IN|BETWEEN|LIKE|IS NULL|IS NOT NULL)\b/gi, '<span class="keyword">$1</span>')
            .replace(/\b(INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|VIEW|INDEX|PRIMARY KEY|FOREIGN KEY|UNIQUE|CHECK|DEFAULT|VALUES|SET)\b/gi, '<span class="keyword">$1</span>')
            .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
            .replace(/--.*$/gm, '<span class="comment">$&</span>');
        
        code.innerHTML = highlighted;
    });
});
