// ========================================
// FUNCIONALIDADES DEL MENÚ MÓVIL
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ========================================
// EFECTO SCROLL EN LA BARRA DE NAVEGACIÓN
// ========================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 25px rgba(0, 102, 255, 0.25)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ========================================
// FUNCIONALIDADES DEL MODAL
// ========================================

const modal = document.getElementById('projectModal');

function showProjectModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
        closeProjectModal();
    }
});

// ========================================
// FUNCIÓN PARA DESPLAZARSE AL VIDEO
// ========================================

function scrollToVideo() {
    const proyectosSection = document.getElementById('proyectos');
    proyectosSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        const video = document.querySelector('video');
        if (video) {
            video.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 500);
}

function scrollToContact() {
    const contactSection = document.getElementById('contacto');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// ANIMACIÓN DE ESTADÍSTICAS
// ========================================

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-value[data-target]');
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.target, 10) || 0;
                animateCounter(element, 0, target, 1500);
                observerStats.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observerStats.observe(stat));
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const stepTime = Math.max(Math.floor(duration / (range || 1)), 16);
    let current = start;
    const increment = range > 0 ? 1 : -1;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = current.toLocaleString();
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end.toLocaleString();
            clearInterval(timer);
        }
    }, stepTime);
}

window.addEventListener('load', animateStats);

// ========================================
// FUNCIONALIDAD DE FORMULARIO
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Mostrar confirmación
        showNotification('¡Mensaje Enviado! 🎉', `Gracias ${name}, te contactaremos pronto a ${email}`);
        
        // Limpiar formulario
        contactForm.reset();
        
        console.log('Mensaje de contacto:', { name, email, subject, message });
    });
}

// ========================================
// NOTIFICACIONES
// ========================================

function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(notification);

    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// ========================================
// FUNCIONES DE GALERÍA
// ========================================

function openGalleryModal(element) {
    const info = element.querySelector('.gallery-info');
    const img = element.querySelector('.gallery-image img');
    const title = info ? info.querySelector('h4').textContent : 'Imagen';
    const desc = info ? info.querySelector('p').textContent : '';
    
    showNotification('📸 ' + title, desc);

    // abrir modal sencillo con imagen grande
    const fullModal = document.createElement('div');
    fullModal.className = 'full-gallery-modal';
    fullModal.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:4000;';
    fullModal.innerHTML = `
        <div style="max-width:900px;width:95%;background:${getComputedStyle(document.body).backgroundColor};padding:20px;border-radius:12px;position:relative;">
            <button style="position:absolute;top:10px;right:12px;background:none;border:none;color:#fff;font-size:28px;cursor:pointer;">&times;</button>
            <div style="border-radius:8px;overflow:hidden;">
                ${img ? `<img src="${img.src}" alt="${img.alt}" style="width:100%;height:auto;display:block;">` : '<div style="color:#fff">Imagen no disponible</div>'}
            </div>
            <div style="color:#b0b0c3;margin-top:12px;">
                <h3 style="margin:0 0 6px 0;color:#fff">${title}</h3>
                <p style="margin:0">${desc}</p>
            </div>
        </div>
    `;
    document.body.appendChild(fullModal);

    fullModal.querySelector('button').addEventListener('click', () => fullModal.remove());
    fullModal.addEventListener('click', (e) => { if (e.target === fullModal) fullModal.remove(); });
}

// ========================================
// FUNCIONES DE PROYECTO
// ========================================

function trackProjectClick(projectName) {
    console.log(`📊 Usuario interesado en: ${projectName}`);
    showNotification('Proyecto: ' + projectName, '¡Gracias por tu interés! Pronto tendremos más detalles.');
}

// ========================================
// FUNCIONES DE EVENTOS
// ========================================

function registerEvent(eventName) {
    showNotification('✅ Registro Exitoso', `¡Gracias por registrarte a "${eventName}"! Te enviaremos más detalles pronto.`);
    console.log(`Usuario registrado para: ${eventName}`);
}

function shareEvent(eventName) {
    if (navigator.share) {
        navigator.share({
            title: 'Comunidad ANSI/TIA 3D',
            text: `¡Mira este evento: ${eventName}!`,
            url: window.location.href
        });
    } else {
        showNotification('📤 Compartir', `Evento: ${eventName} - Comparte el enlace de la página`);
    }
}

// ========================================
// EFECTO PARALLAX EN LA SECCIÓN HERO
// ========================================

const hero = document.querySelector('.hero');
const stars = document.querySelector('.stars');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    if (stars) {
        stars.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ========================================
// SCROLL SUAVE A SECCIONES
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ANIMACIONES AL ENTRAR EN VISTA
// ========================================

const observersMap = (() => {
    const callback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `slideInUp 0.6s ease forwards`;
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    };
    return new IntersectionObserver(callback, { threshold: 0.12 });
})();

document.querySelectorAll('.gallery-item, .team-member, .blog-card, .event-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    observersMap.observe(el);
});

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✨ Comunidad de Infraestructura de Redes ANSI/TIA 3D', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 ¡Bienvenido a nuestra plataforma de proyectos tecnológicos!', 'color: #0066ff; font-size: 14px;');
});

// ========================================
// AÑADIR ESTILOS DE ANIMACIÓN DINÁMICOS
// ========================================

const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .full-gallery-modal img {
        max-height: 80vh;
        object-fit: contain;
    }

    @media (max-width: 768px) {
        .notification {
            left: 20px;
            right: 20px;
        }
    }
`;
document.head.appendChild(dynamicStyle);