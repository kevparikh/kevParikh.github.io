/* ═══════════════════════════════════
   GRAPHIC DESIGNER PORTFOLIO — JS
   ═══════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── LOADER ── */
    var loader = document.getElementById('loader');
    var loaderFill = document.getElementById('loaderFill');
    var loaderCount = document.getElementById('loaderCount');
    var count = 0;

    var loaderTimer = setInterval(function () {
        count += Math.floor(Math.random() * 8) + 3;
        if (count >= 100) {
            count = 100;
            clearInterval(loaderTimer);
            setTimeout(function () {
                loader.classList.add('hidden');
                // Show hero animations
                var heroItems = document.querySelectorAll('.hero .anim-item');
                heroItems.forEach(function (el, i) {
                    setTimeout(function () {
                        el.classList.add('show');
                    }, i * 150);
                });
            }, 500);
        }
        loaderFill.style.width = count + '%';
        loaderCount.textContent = count;
    }, 50);

    /* ── THEME TOGGLE ── */
    var themeBtn = document.getElementById('themeBtn');
    var savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    /* ── HEADER SCROLL ── */
    var header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ── MOBILE MENU ── */
    var burger = document.getElementById('burger');
    var mobMenu = document.getElementById('mobMenu');
    var mobLinks = document.querySelectorAll('.mob-link');

    burger.addEventListener('click', function () {
        burger.classList.toggle('open');
        mobMenu.classList.toggle('open');

        if (mobMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    mobLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            burger.classList.remove('open');
            mobMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* ── ROTATING TEXT ── */
    var rotatingText = document.getElementById('rotatingText');
    var words = ['Logos', 'Social Posts', 'AI Art', 'Invitations', 'Banners', 'Thumbnails'];
    var wordIndex = 0;

    setInterval(function () {
        rotatingText.style.opacity = '0';
        rotatingText.style.transform = 'translateY(12px)';

        setTimeout(function () {
            wordIndex = (wordIndex + 1) % words.length;
            rotatingText.textContent = words[wordIndex];
            rotatingText.style.opacity = '1';
            rotatingText.style.transform = 'translateY(0)';
        }, 300);
    }, 2500);

    /* ── SCROLL REVEAL ── */
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.reveal');

        reveals.forEach(function (el) {
            var top = el.getBoundingClientRect().top;
            var windowHeight = window.innerHeight;

            if (top < windowHeight - 80) {
                el.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    /* ── COUNTER ANIMATION ── */
    var counted = false;

    function animateCounters() {
        if (counted) return;

        var statsSection = document.querySelector('.stats');
        if (!statsSection) return;

        var top = statsSection.getBoundingClientRect().top;
        if (top > window.innerHeight - 100) return;

        counted = true;

        var counters = document.querySelectorAll('[data-count]');
        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-count'));
            var duration = 2000;
            var start = Date.now();

            function update() {
                var elapsed = Date.now() - start;
                var progress = Math.min(elapsed / duration, 1);
                // Ease out
                var eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(update);
        });
    }

    window.addEventListener('scroll', animateCounters);

    /* ── PORTFOLIO FILTER ── */
    var filterBtns = document.querySelectorAll('.filter-btn');
    var pCards = document.querySelectorAll('.p-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Active button
            filterBtns.forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            pCards.forEach(function (card) {
                var cat = card.getAttribute('data-cat');

                if (filter === 'all' || cat === filter) {
                    card.classList.remove('hide');
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(function () {
                        card.classList.add('hide');
                    }, 300);
                }
            });
        });
    });

    /* ── SMOOTH SCROLL ── */
    var anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);

            if (target) {
                var offset = 80;
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ── BACK TO TOP ── */
    document.getElementById('totop').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ── NAV ACTIVE STATE ── */
    var sections = document.querySelectorAll('section[id]');
    var navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', function () {
        var current = '';

        sections.forEach(function (section) {
            var top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(function (item) {
            if (item.getAttribute('href') === '#' + current) {
                item.style.color = 'var(--text)';
            } else {
                item.style.color = '';
            }
        });
    });
});
