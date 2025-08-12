// Navigation and Sidebar Functionality
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    // Toggle sidebar on hamburger menu click
    if (hamburgerMenu) {
      hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
      });
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
      });
    }

    // Highlight active page in navigation
    function highlightActiveLink() {
      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll('.toc-item a');
      
      navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        
        // Remove any existing active class
        link.classList.remove('active');
        
        // Check if this is the current page
        if (currentPath === linkPath || 
            (currentPath.endsWith('/') && linkPath === currentPath + 'index.html') ||
            (linkPath.endsWith('/') && currentPath === linkPath.slice(0, -1))) {
          link.classList.add('active');
        }
      });
    }

    highlightActiveLink();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offset = 80; // Account for fixed header
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
      // ESC key closes sidebar
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
      }
      
      // Arrow keys for prev/next navigation
      if (e.altKey) {
        const navPrev = document.querySelector('.nav-prev a');
        const navNext = document.querySelector('.nav-next a');
        
        if (e.key === 'ArrowLeft' && navPrev) {
          navPrev.click();
        } else if (e.key === 'ArrowRight' && navNext) {
          navNext.click();
        }
      }
    });

    // Handle responsive behavior
    function handleResize() {
      if (window.innerWidth > 768) {
        // Remove mobile classes on desktop
        hamburgerMenu.classList.remove('active');
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
  });
})();