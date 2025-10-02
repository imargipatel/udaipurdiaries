// Gallery filtering logic
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  if (!filterButtons.length || !items.length) return;

  function setActive(btn){
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function filter(category){
    items.forEach(item => {
      const cat = item.getAttribute('data-category') || '';
      if (category === 'all' || cat === category) {
        item.style.display = '';
        // subtle animation reset
        requestAnimationFrame(() => {
          item.style.opacity = 1;
          item.style.transform = 'translateY(0) scale(1)';
        });
      } else {
        // hide
        item.style.opacity = 0;
        item.style.transform = 'translateY(8px) scale(0.98)';
        setTimeout(()=> item.style.display = 'none', 350);
      }
    });
  }

  // click handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      setActive(btn);
      filter(category);
    });
  });

  // Initialize - show all
  filterButtons.find(b => b.dataset.filter === 'all')?.classList.add('active');
  filter('all');
});
