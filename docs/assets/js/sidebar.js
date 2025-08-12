// Sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create mobile menu toggle button
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '☰';
  menuToggle.setAttribute('aria-label', 'Toggle menu');
  document.body.appendChild(menuToggle);

  const sidebar = document.querySelector('.sidebar');
  
  // Toggle sidebar on mobile
  menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('active');
      }
    }
  });

  // Highlight current page in navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.toc-item a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.includes(linkPath) || 
        (currentPath.endsWith('/') && linkPath.endsWith('/index.html'))) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
});