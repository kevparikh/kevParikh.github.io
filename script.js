// ══════════════════════════════════════════════
//  ✦ GRAPHIC DESIGNER PORTFOLIO — SCRIPT
// ══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── PRELOADER ──
    const preloader = document.getElementById('preloader');
    const preloaderProgress = document.getElementById('preloaderProgress');
    const preloaderCount = document.getElementById('preloaderCount');
    let count = 0;

    const preloaderInterval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2;
        if (count >= 100) {
            count = 100;
            clearInterval(preloaderInterval);
            setTimeout(() => {
                preloader.classList.add('done');
                document.body.style.overflow = 'auto';
                triggerHeroAnimation();
            }, 400);
        }
        preloaderProgress.style.width = count + '%';
        preloaderCount.textContent = count;
    }, 50);

    document.body.style.overflow = 'hidden';

    function triggerHeroAnimation() {
        document.querySelectorAll('.hero [data-animate]').forEach(el => {
            el.classList.add('visible');
        });
    }

    // ── CUSTOM CURSOR ──
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');

    if (dot && ring && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX - 4 + 'px';
            dot.style.top = mouseY - 4 + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = ringX - 20 + 'px';
            ring.style.top = ringY - 20 + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll(
            'a, button, .work-link, .service-item, .magnetic'
        );

        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
        });
    }

    // ── THEME TOGGLE ──
    const themeBtn = document.getElementById('themeBtn');
    const saved = localStorage.getItem('theme');

    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else {
        // Default light
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ── HEADER SCROLL ──
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Add background
        if (scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show on scroll direction
        if (scrollY > 500) {
            if (scrollY > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.transform = 'translateY(0)';
        }
        header.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s, background 0.4s, backdrop-filter 0.4s';

        lastScroll = scrollY;
    });

    // ── MOBILE MENU ──
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ── SCROLL REVEAL ANIMATIONS ──
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Image reveal
                    if (entry.target.classList.contains('about-visual')) {
                        entry.target.classList.add('revealed');
                    }

                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all animated elements (except hero - handled by preloader)
    document.querySelectorAll('[data-animate]').forEach(el => {
        if (!el.closest('.hero')) {
            revealObserver.observe(el);
        }
    });

    // Observe about visual for image reveal
    const aboutVisual = document.querySelector('.about-visual');
    if (aboutVisual) revealObserver.observe(aboutVisual);

    // ── COUNTER ANIMATION ──
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('[data-target]');
                    counters.forEach(counter => {
                        const target = parseInt(counter.dataset.target);
                        const duration = 2000;
                        const start = performance.now();

                        function updateCount(now) {
                            const elapsed = now - start;
                            const progress = Math.min(elapsed / duration, 1);
                            // Ease out cubic
                            const eased = 1 - Math.pow(1 - progress, 3);
                            counter.textContent = Math.floor(eased * target);

                            if (progress < 1) {
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.textContent = target;
                            }
                        }
                        requestAnimationFrame(updateCount);
                    });
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    const statsEl = document.querySelector('.about-stats');
    if (statsEl) counterObserver.observe(statsEl);

    const badgeEl = document.querySelector('.about-badge');
    if (badgeEl) counterObserver.observe(badgeEl);

    // ── MAGNETIC BUTTONS ──
    if (window.innerWidth > 768) {
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
                btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.transition = 'transform 0.15s';
            });
        });
    }

    // ── SMOOTH ANCHOR SCROLL ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── BACK TO TOP ──
    document.getElementById('backTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── PARALLAX ON WORK IMAGES ──
    if (window.innerWidth > 768) {
        const workImages = document.querySelectorAll('.work-placeholder');

        window.addEventListener('scroll', () => {
            workImages.forEach(img => {
                const rect = img.getBoundingClientRect();
                const scrollPercent = rect.top / window.innerHeight;
                if (scrollPercent > -0.5 && scrollPercent < 1.5) {
                    const y = scrollPercent * 30;
                    img.style.transform = `translateY(${y}px)`;
                }
            });
        }, { passive: true });
    }

    // ── NAV ACTIVE STATE ──
    const sections = document.querySelectorAll('section[id]');
    const navMenuLinks = document.querySelectorAll('.nav-menu-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navMenuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.style.color = 'var(--text)';
            } else {
                link.style.color = '';
            }
        });
    }, { passive: true });

    // ── WORK IMAGE HOVER TILT ──
    if (window.innerWidth > 768) {
        document.querySelectorAll('.work-img').forEach(img => {
            img.addEventListener('mousemove', (e) => {
                const rect = img.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                img.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
            });

            img.addEventListener('mouseleave', () => {
                img.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
                img.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            img.addEventListener('mouseenter', () => {
                img.style.transition = 'transform 0.1s';
            });
        });
    }
});
