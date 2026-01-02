document.addEventListener('DOMContentLoaded', () => {

    // ==================== ANIMATION DU TITRE ====================
    const titleChars = document.querySelectorAll('.animated-title .char');
    titleChars.forEach((char, index) => {
        char.style.animationDelay = `${index * 0.05}s`;
    });


    // ==================== MENU HAMBURGER RESPONSIVE ====================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // ==================== MODE SOMBRE/CLAIR ====================
    const themeSwitch = document.querySelector('#checkbox');

    // Vérifier le thème sauvegardé dans le localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    
    // ==================== FILTRE DU PORTFOLIO ====================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Gérer le style du bouton actif
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filtrer les éléments
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });


    // ==================== ANIMATION DES COMPÉTENCES AU SCROLL ====================
    const skillsSection = document.querySelector('#expertise');
    const skillBars = document.querySelectorAll('.skill-bar');

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level;
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target); // Pour que l'animation ne se joue qu'une fois
            }
        });
    }, {
        threshold: 0.5 // Se déclenche quand 50% de la section est visible
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
});