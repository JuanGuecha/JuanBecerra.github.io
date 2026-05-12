/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

    /**
   * Hero scroll indicator — se oculta al hacer scroll
   */
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })

  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
    /**
   * Portfolio showcase (dots + cambio de contenido)
   */
  const portfolioBody = document.querySelector('#portfolio-body');
  const portfolioMediaHost = document.querySelector('#portfolio-media-host');
  const portfolioExperience = document.querySelector('#portfolio-feature-experience');
  const portfolioTitle = document.querySelector('#portfolio-feature-title');
  const portfolioDescription = document.querySelector('#portfolio-feature-description');
  const portfolioGallery = document.querySelector('#portfolio-feature-gallery');
  const portfolioPreview = document.querySelector('#portfolio-feature-preview');
  const portfolioDots = document.querySelectorAll('.portfolio-dot');

  if (portfolioBody && portfolioMediaHost && portfolioExperience && portfolioTitle && portfolioDescription && portfolioGallery && portfolioPreview && portfolioDots.length) {
    const portfolioProjects = [
      {
        title: 'NightLight:',
        description: 'Videojuego 2D en Pixel Art de vista superior con elementos de terror psicologico y puzzles',
        experience: '-Diseño de niveles y puzzles coherentes con la narrativa del juego, utilizando Tilemaps, Tilesets y herramientas de diseño de niveles en Unity.\n-Desarrollo de assets en 2D-estilo pixel art, implementados en Unity con sus respectivas animaciones conforme al estilo del juego.',
        gallery: [
          {
            type: 'image',
            src: 'assets/img/portfolio/Night_2.png',
            alt: 'Captura de NightLight 2'
          },
          {
            type: 'image',
            src: 'assets/img/portfolio/Night_3.png',
            alt: 'Captura de NightLight 3'
          }
        ],
        type: 'image',
        src: 'assets/img/portfolio/NighLight.png',
        alt: 'Proyecto 1',
        objectPosition: 'center 90%',
        url: 'https://sebastian-franco-gomez.itch.io/nightlight'
      },
      
      {
        title: 'My Little Abomination',
        description: 'Videojuego 2D en arte lineal con estetica "cozy" y gameplay divertido y humorístico',
        experience: 'Experiencia: implementación de sistemas base y ajustes visuales del flujo principal.',
        gallery: [
          {
            type: 'image',
            src: 'assets/img/portfolio/abomination_1.png',
            alt: 'Captura del proyecto 2'
          },
          {
            type: 'image',
            src: 'assets/img/portfolio/abomination_2.png',
            alt: 'Captura del proyecto 2'
          }
        ],
        type: 'image',
        src: 'assets/img/portfolio/abomination_0.png',
        alt: 'Proyecto 2',
        objectPosition: 'center top',
        url: 'https://juan-becerra.itch.io/my-little-abomination'
      },
      {
        title: 'Proyecto 3',
        description: 'Descripcion de las funciones del proyecto 3. Añade enfoque tecnico y valor para el usuario final.',
        experience: 'Experiencia: integración de video, presentación del prototipo y validación del resultado final.',
        gallery: [
          {
            type: 'image',
            src: 'assets/img/portfolio/branding-1.jpg',
            alt: 'Captura del proyecto 3'
          }
        ],
        type: 'video',
        src: 'assets/img/portfolio/demo.mp4',
        poster: 'assets/img/portfolio/branding-1.jpg'
      }
    
    ];

    function buildMedia(project) {
      let media;

      if (project.type === 'video') {
      media = document.createElement('video');
      media.src = project.src;
      media.poster = project.poster || '';
      media.controls = true;
      media.preload = 'metadata';
      } else {
      media = document.createElement('img');
      media.src = project.src;
      media.alt = project.alt || project.title;
      media.style.objectPosition = project.objectPosition || 'center';
      }

      if (project.url) {
      const link = document.createElement('a');
      link.href = project.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Ver ' + project.title + ' en itch.io');
      link.appendChild(media);
      return link;
      }

      return media;
    }

    function buildGalleryItem(item) {
      const media = document.createElement(item.type === 'video' ? 'video' : 'img');

      if (item.type === 'video') {
        media.src = item.src;
        media.controls = true;
        media.preload = 'metadata';
        media.playsInline = true;
        media.muted = true;
      } else {
        media.src = item.src;
        media.alt = item.alt || 'Galería del proyecto';
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'portfolio-gallery-item';
      wrapper.appendChild(media);
      return wrapper;
    }

    function buildPreviewMedia(item) {
      const media = document.createElement(item.type === 'video' ? 'video' : 'img');

      if (item.type === 'video') {
        media.src = item.src;
        media.controls = true;
        media.preload = 'metadata';
        media.playsInline = true;
        if (item.poster) {
          media.poster = item.poster;
        }
      } else {
        media.src = item.src;
        media.alt = item.alt || 'Vista ampliada de la galeria';
      }

      return media;
    }

    function setPreview(item, galleryItems, selectedIndex) {
      portfolioPreview.innerHTML = '';

      if (!item) {
        portfolioPreview.innerHTML = '<p class="portfolio-gallery-empty">Selecciona una imagen para verla ampliada.</p>';
        return;
      }

      portfolioPreview.appendChild(buildPreviewMedia(item));

      if (Array.isArray(galleryItems)) {
        galleryItems.forEach((galleryItem, index) => {
          galleryItem.classList.toggle('is-selected', index === selectedIndex);
        });
      }
    }

    function renderProject(index) {
      const project = portfolioProjects[index];
      if (!project) return;

      portfolioBody.classList.add('is-changing');

      setTimeout(() => {
        portfolioTitle.textContent = project.title;
        portfolioDescription.textContent = project.description;
        portfolioExperience.textContent = project.experience || '';
        portfolioMediaHost.innerHTML = '';
        portfolioMediaHost.appendChild(buildMedia(project));
        portfolioGallery.innerHTML = '';
        portfolioPreview.innerHTML = '';

        if (Array.isArray(project.gallery) && project.gallery.length) {
          const galleryItems = [];

          project.gallery.forEach((item, index) => {
            const galleryItem = buildGalleryItem(item);
            galleryItem.addEventListener('click', () => {
              setPreview(item, galleryItems, index);
            });
            portfolioGallery.appendChild(galleryItem);
            galleryItems.push(galleryItem);
          });

          setPreview(project.gallery[0], galleryItems, 0);
        } else {
          portfolioGallery.innerHTML = '<p class="portfolio-gallery-empty">Espacio para fotos o GIFs del proyecto.</p>';
          portfolioPreview.innerHTML = '<p class="portfolio-gallery-empty">Selecciona una imagen para verla ampliada.</p>';
        }

        portfolioDots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === index);
        });

        portfolioBody.classList.remove('is-changing');
      }, 180);
    }

    portfolioDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.getAttribute('data-index'));
        renderProject(index);
      });
    });

    renderProject(0);
  }
  /**
 * Hero scroll indicator — se oculta al hacer scroll
 * Principio: Progressive Enhancement — el icono funciona como enlace
 * aunque JS falle, pero JS mejora la experiencia ocultándolo.
 */

})();