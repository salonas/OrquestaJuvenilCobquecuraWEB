document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    burger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.innerHTML = '<i class="fas fa-bars"></i>';
      }

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animate stats counter
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          clearInterval(counter);
          stat.textContent = target;
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('stats')) {
          animateStats();
        }

        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .card, .gallery-item, .event-card').forEach(section => {
    observer.observe(section);
  });

  // Load events dynamically
  const eventsGrid = document.querySelector('.events-grid');

  const events = [
    {
      title: "Concierto de Primavera",
      date: "15 Octubre 2025",
      location: "Plaza de Armas, Cobquecura",
      description: "Disfruta de un repertorio clásico y contemporáneo interpretado por nuestros talentosos jóvenes músicos.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Festival Musical Infantil",
      date: "22 Noviembre 2025",
      location: "Teatro Municipal, Cobquecura",
      description: "Nuestros estudiantes más jóvenes presentan su primer concierto del año con piezas sencillas y emotivas.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Gala Navideña",
      date: "15 Diciembre 2025",
      location: "Iglesia de Cobquecura",
      description: "Celebra la navidad con nuestro tradicional concierto de villancicos y piezas clásicas navideñas.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Render events dynamically
  if (eventsGrid) {
    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-info">
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-date"><i class="fas fa-calendar-alt"></i> ${event.date}</p>
                    <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p class="event-description">${event.description}</p>
                </div>
            `;
      eventsGrid.appendChild(card);
      observer.observe(card);
    });
  }
});