document.addEventListener('DOMContentLoaded', () => {
    // Starfield Canvas Animation
    const canvas = document.getElementById('starfield-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        const numStars = 120;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.7 + 0.3,
                speed: Math.random() * 0.15 + 0.05
            });
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();

                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }
            });
            requestAnimationFrame(drawStars);
        }
        drawStars();
    }

    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside or clicking any link inside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Bilingual Switcher Logic
    const langToggleBtn = document.getElementById('lang-toggle');
    const currentLangSpan = document.getElementById('current-lang');
    
    // Check saved language or default to TR
    let currentLang = localStorage.getItem('ayascell_lang') || 'TR';
    
    function applyLanguage(lang) {
        if (lang === 'EN') {
            document.body.classList.add('show-en');
            document.body.classList.remove('show-tr');
            document.documentElement.lang = 'en';
            if (currentLangSpan) currentLangSpan.textContent = 'EN';
        } else {
            document.body.classList.remove('show-en');
            document.body.classList.add('show-tr');
            document.documentElement.lang = 'tr';
            if (currentLangSpan) currentLangSpan.textContent = 'TR';
        }
        localStorage.setItem('ayascell_lang', lang);
    }

    applyLanguage(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'TR' ? 'EN' : 'TR';
            applyLanguage(currentLang);
        });
    }

    // --- Dinamik Telif Hakkı (Copyright) Yılı ---
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = currentYear;
    });
    document.querySelectorAll('.copyright-text').forEach(el => {
        if (!el.querySelector('.current-year')) {
            el.innerHTML = `&copy; ${currentYear} AYASCELL`;
        }
    });
});
