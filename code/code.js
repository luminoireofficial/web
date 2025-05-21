// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.code-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('hover')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // Animate cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Category filter functionality
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filter cards
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Scroll categories with arrow buttons
    const categories = document.getElementById('categories');
    const scrollLeft = document.getElementById('scrollLeft');
    const scrollRight = document.getElementById('scrollRight');
    
    function updateScrollIndicators() {
        const scrollLeftPos = categories.scrollLeft;
        const scrollWidth = categories.scrollWidth;
        const clientWidth = categories.clientWidth;
        
        // Left indicator
        if (scrollLeftPos > 10) {
            scrollLeft.style.opacity = '1';
            scrollLeft.style.pointerEvents = 'auto';
        } else {
            scrollLeft.style.opacity = '0';
            scrollLeft.style.pointerEvents = 'none';
        }
        
        // Right indicator
        if (scrollLeftPos < scrollWidth - clientWidth - 10) {
            scrollRight.style.opacity = '1';
            scrollRight.style.pointerEvents = 'auto';
        } else {
            scrollRight.style.opacity = '0';
            scrollRight.style.pointerEvents = 'none';
        }
    }
    
    // Scroll left function
    scrollLeft.addEventListener('click', function() {
        categories.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    });
    
    // Scroll right function
    scrollRight.addEventListener('click', function() {
        categories.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    });
    
    // Update indicators on scroll and resize
    categories.addEventListener('scroll', updateScrollIndicators);
    window.addEventListener('resize', updateScrollIndicators);
    
    // Initial check
    updateScrollIndicators();
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Copy code function
function copyCode(button) {
    const codeContainer = button.parentElement;
    const codeElement = codeContainer.querySelector('code');
    const codeText = codeElement.textContent;
    
    navigator.clipboard.writeText(codeText).then(() => {
        // Change button icon temporarily
        const icon = button.querySelector('i');
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
        
        // Reset icon after 2 seconds
        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-copy');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

// Toggle code card function
function toggleCodeCard(header) {
    const card = header.parentElement;
    const body = card.querySelector('.card-body');
    const arrow = header.querySelector('.toggle-arrow');
    
    body.classList.toggle('expanded');
    arrow.classList.toggle('expanded');
}