// script.js

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out',
    mirror: false
  });

  // Initialize particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#d4af37"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#d4af37",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMenuButton = document.getElementById('close-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMenuButton) {
    closeMenuButton.addEventListener('click', function() {
      mobileMenu.classList.add('translate-x-full');
      document.body.style.overflow = 'auto';
    });
  }

  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('translate-x-full');
      document.body.style.overflow = 'auto';
    });
  });

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // The lower the slower

  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(() => animateCounter(counter), 1);
    } else {
      counter.innerText = target;
    }
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission handling
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Show loading state
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      // Simulate form submission (replace with actual form submission code)
      setTimeout(() => {
        // Show success message
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitButton.style.background = 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
          submitButton.style.background = '';
        }, 3000);
      }, 2000);
    });
  }

  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.shape');
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  // Video lazy loading
  const videoContainers = document.querySelectorAll('.video-card');
  if (videoContainers.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const iframe = entry.target.querySelector('iframe');
          if (iframe && !iframe.src) {
            iframe.src = iframe.getAttribute('data-src');
            videoObserver.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.1 });

    videoContainers.forEach(container => {
      videoObserver.observe(container);
    });
  }

  // Text animation effects
  const animatedTexts = document.querySelectorAll('.gold-gradient-text, .section-title');
  animatedTexts.forEach(text => {
    text.addEventListener('mouseenter', function() {
      this.style.background = 'linear-gradient(135deg, #f1e5ac 0%, #d4af37 100%)';
      this.style.webkitBackgroundClip = 'text';
      this.style.backgroundClip = 'text';
      this.style.webkitTextFillColor = 'transparent';
    });
    
    text.addEventListener('mouseleave', function() {
      this.style.background = 'linear-gradient(135deg, #d4af37 0%, #f1e5ac 100%)';
      this.style.webkitBackgroundClip = 'text';
      this.style.backgroundClip = 'text';
      this.style.webkitTextFillColor = 'transparent';
    });
  });

  // Add subtle animation to service cards on scroll
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length > 0) {
    const serviceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateY(0) scale(1)';
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.2 });

    serviceCards.forEach(card => {
      card.style.transform = 'translateY(50px) scale(0.95)';
      card.style.opacity = '0';
      card.style.transition = 'all 0.6s ease-out';
      serviceObserver.observe(card);
    });
  }

  // Add gold particle effect on click
  document.addEventListener('click', function(e) {
    createGoldParticle(e.clientX, e.clientY);
  });

  function createGoldParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.background = '#d4af37';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.zIndex = '9999';
    particle.style.boxShadow = '0 0 10px #d4af37, 0 0 20px #d4af37';
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 2;
    const size = 0.5 + Math.random() * 1;
    const life = 1000 + Math.random() * 500;
    
    particle.style.transform = `scale(${size})`;
    
    let posX = x;
    let posY = y;
    
    const animateParticle = () => {
      posX += Math.cos(angle) * speed;
      posY += Math.sin(angle) * speed;
      
      particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      
      if (parseFloat(particle.style.opacity) <= 0) {
        document.body.removeChild(particle);
        return;
      }
      
      requestAnimationFrame(animateParticle);
    };
    
    setTimeout(() => {
      animateParticle();
    }, 10);
    
    setTimeout(() => {
      if (document.body.contains(particle)) {
        document.body.removeChild(particle);
      }
    }, life);
  }

  // Add scroll to top button
  const scrollTopButton = document.createElement('button');
  scrollTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollTopButton.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gold text-black rounded-full shadow-lg z-40 opacity-0 invisible transition-all duration-300 flex items-center justify-center';
  scrollTopButton.style.background = 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)';
  document.body.appendChild(scrollTopButton);

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollTopButton.classList.remove('opacity-0', 'invisible');
      scrollTopButton.classList.add('opacity-100', 'visible');
    } else {
      scrollTopButton.classList.remove('opacity-100', 'visible');
      scrollTopButton.classList.add('opacity-0', 'invisible');
    }
  });

  // Add typing animation to hero text
  const heroText = document.querySelector('.hero-section p');
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Add magnetic effect to buttons
  const buttons = document.querySelectorAll('.gold-button, .border-button');
  buttons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.style.setProperty('--x', `${x}px`);
      this.style.setProperty('--y', `${y}px`);
    });
  });

  // Initialize YouTube video API
  const loadYouTubeAPI = () => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };

  loadYouTubeAPI();

  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-700 z-50';
  progressBar.style.width = '0%';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });

  console.log('Premium portfolio initialized successfully!');
});

// YouTube API callback
function onYouTubeIframeAPIReady() {
  // This function will be called when the YouTube API is ready
  document.querySelectorAll('iframe').forEach(iframe => {
    if (iframe.src.includes('youtube.com')) {
      new YT.Player(iframe, {
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
    }
  });
}

function onPlayerStateChange(event) {
  // Handle video state changes if needed
}

// Add custom cursor effect
document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor hidden md:block';
  document.body.appendChild(cursor);

  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'custom-cursor-follower hidden md:block';
  document.body.appendChild(cursorFollower);

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animate() {
    followerX += (mouseX - followerX) / 6;
    followerY += (mouseY - followerY) / 6;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animate);
  }

  animate();

  document.querySelectorAll('a, button, .gold-button, .border-button, .social-icon').forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-active');
      cursorFollower.classList.add('cursor-follower-active');
    });
    
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-active');
      cursorFollower.classList.remove('cursor-follower-active');
    });
  });
});

// Add styles for custom cursor
const cursorStyles = `
  .custom-cursor {
    position: fixed;
    width: 8px;
    height: 8px;
    background: #d4af37;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
  }
  
  .custom-cursor-follower {
    position: fixed;
    width: 30px;
    height: 30px;
    border: 1px solid #d4af37;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .cursor-active {
    transform: scale(1.5);
    background: #f1e5ac;
  }
  
  .cursor-follower-active {
    transform: scale(1.5);
    opacity: 0.5;
  }
  
  @media (max-width: 768px) {
    .custom-cursor,
    .custom-cursor-follower {
      display: none !important;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);