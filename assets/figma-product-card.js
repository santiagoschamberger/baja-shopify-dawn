class FigmaProductCard extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.onAddButtonClick.bind(this));
  }

  onAddButtonClick(event) {
    const addButton = event.target.closest('.figma-add-button');
    if (!addButton) return;

    event.preventDefault();
    
    const productUrl = addButton.dataset.productUrl;
    if (productUrl) {
      // Navigate to product page for now
      // In a real implementation, you might want to add to cart directly
      window.location.href = productUrl;
    }
  }
}

// Initialize all Figma product cards
document.addEventListener('DOMContentLoaded', function() {
  // Add click handlers to all add buttons
  document.querySelectorAll('.figma-add-button').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      
      // Add loading state
      this.style.opacity = '0.7';
      this.style.pointerEvents = 'none';
      
      const productUrl = this.dataset.productUrl;
      
      if (productUrl) {
        // Add a small delay for better UX
        setTimeout(() => {
          window.location.href = productUrl;
        }, 200);
      } else {
        // Reset button if no URL
        setTimeout(() => {
          this.style.opacity = '1';
          this.style.pointerEvents = 'auto';
        }, 200);
      }
    });
  });

  // Add hover effects for better interaction feedback
  document.querySelectorAll('.figma-product-card').forEach(card => {
    const image = card.querySelector('.figma-card-image');
    const addButton = card.querySelector('.figma-add-button');
    
    if (image && addButton) {
      card.addEventListener('mouseenter', function() {
        // Subtle animation on hover
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          addButton.style.transform = 'scale(1.05)';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          addButton.style.transform = 'scale(1)';
        }
      });
    }
  });
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FigmaProductCard;
} 