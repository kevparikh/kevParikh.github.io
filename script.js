// ═══════════════════════════════════════
//  GRAPHIC DESIGNER PORTFOLIO — JS
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── LOADER ──
    const loader = document.getElementById('loader');
    const loaderFill = document.getElementById('loaderFill');
    const loaderNum = document.getElementById('loaderNum');
    let count = 0;

    const tick = setInterval(() => {
        count += Math.floor(Math.random() * 10) + 3;
        if (count >= 100) {
            count = 100;
            clearInterval(tick);
            setTimeout(() => {
                loader.classList.add('done');
                document.body.style.overflow = '';
                // Trigger hero animations
                document.querySelectorAll('.hero [data-anim]').forEach(el => el.classList.add('vis'));
            }, 400);
        }
        loaderFill.style.width = count + '%';
        loaderNum.textContent = count;
    }, 45);
    document.body.style.overflow = 'hidden';

    // ── CURSOR ──
    const cur = document.getElementById('cur');
    const curFollow = document.getElementById('curFollow');

    if (cur && curFollow && window.innerWidth > 768) {
        let mx = 0, my = 0, fx = 0, fy = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            cur.style.left = mx - 4 + 'px';
            cur.style.top = my - 4 + 'px';
        });

        (function loop() {
            fx += (mx - fx) * 0.12;
            fy += (my - fy) * 0.12;
            curFollow.style.left = fx - 20 + 'px';
            curFollow.style.top = fy - 20 + 'px';
            requestAnimationFrame(loop);
        })();

        document.querySelectorAll('[data-hover]').forEach(el => {
            el.addEventListener('mouseenter', () => curFollow.classList.add('big'));
            el.addEventListener('mouseleave', () => curFollow.classList.remove('big'));
        });
    }

    // ── THEME ──
    const themeSwitch = document.getElementById('themeSwitch');
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);

    themeSwitch.addEventListener('click', () => {
        const now = document.documentElement.getAttribute('data-theme');
        const next = now === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ── HEADER ──
    const header = document.getElementById('header');
    let lastY = 0;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 60);

        if (y > 400) {
            header.style.transform = y > lastY ? 'translateY(-100%)' : 'translateY(0)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        header.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1), padding .4s, background .4s';
        lastY = y;
    }, { passive: true });

    // ── MOBILE MENU ──
    const burger = document.getElementById('burger');
    const mobMenu = document.getElementById('mobMenu');

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        mobMenu.classList.toggle('open');
        document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.mob-link').forEach(l => {
        l.addEventListener('click', () => {
            burger.classList.remove('open');
            mobMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ── HERO TEXT ROTATE ──
    const rotateEl = document.getElementById('heroRotate');
    const words = ['Logos', 'Social Posts', 'AI Art', 'Invitations', 'Banners'];
    let wi = 0;

    setInterval(() => {
        rotateEl.style.opacity = '0';
        rotateEl.style.transform = 'translateY(15px)';

        setTimeout(() => {
            wi = (wi + 1) % words.length;
            rotateEl.textContent = words[wi];
            rotateEl.style.opacity = '1';
            rotateEl.style.transform = 'translateY(0)';
        }, 300);
    }, 2500);

    rotateEl.style.transition = 'all .4s cubic-bezier(.16,1,.3,1)';
    rotateEl.style.display = 'inline-block';

    // ── SCROLL REVEAL ──
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('vis');
                if (e.target.classList.contains('about-photo')) {
                    e.target.classList.add('revealed');
                }
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-anim]').forEach(el => {
        if (!el.closest('.hero')) revealObs.observe(el);
    });

    const aboutPhoto = document.querySelector('.about-photo');
    if (aboutPhoto) revealObs.observe(aboutPhoto);

    // ── COUNTERS ──
    const countObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('[data-count]').forEach(c => {
                    const target = +c.dataset.count;
                    const dur = 2000;
                    const start = performance.now();
                    (function update(now) {
                        const p = Math.min((now - start) / dur, 1);
                        const eased = 1 - Math.pow(1 - p, 3);
                        c.textContent = Math.floor(eased * target);
                        if (p < 1) requestAnimationFrame(update);
                        else c.textContent = target;
                    })(start);
                });
                countObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.about-nums, .exp-badge').forEach(el => countObs.observe(el));

    // ── FILTERS ──
    const filterBtns = document.querySelectorAll('.fil');
    const cards = document.querySelectorAll('.w-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const f = btn.dataset.filter;
            cards.forEach(card => {
                const show = f === 'all' || card.dataset.cat === f;
                if (show) {
                    card.classList.remove('hidden');
                    card.style.position = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(.95)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                        card.style.position = 'absolute';
                    }, 400);
                }
            });
        });
    });

    // ── MAGNETIC ──
    if (window.innerWidth > 768) {
        document.querySelectorAll('[data-hover]').forEach(el => {
            el.addEventListener('mousemove', e => {
                const r = el.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                el.style.transform = `translate(${x * .2}px,${y * .2}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
            });
            el.addEventListener('mouseenter', () => {
                el.style.transition = 'transform .12s';
            });
        });
    }

    // ── WORK IMAGE TILT ──
    if (window.innerWidth > 768) {
        document.querySelectorAll('.w-img').forEach(img => {
            img.addEventListener('mousemove', e => {
                const r = img.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - .5;
                const y = (e.clientY - r.top) / r.height - .5;
                img.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
            });
            img.addEventListener('mouseleave', () => {
                img.style.transform = '';
                img.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
            });
            img.addEventListener('mouseenter', () => { img.style.transition = 'transform .1s'; });
        });
    }

    // ── SMOOTH SCROLL ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const t = document.querySelector(this.getAttribute('href'));
            if (t) {
                const top = t.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── BACK TO TOP ──
    document.getElementById('topBtn').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── NAV ACTIVE ──
    const secs = document.querySelectorAll('section[id]');
    const navLnks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let cur = '';
        secs.forEach(s => {
            if (window.scrollY >= s.offsetTop - 150) cur = s.id;
        });
        navLnks.forEach(l => {
            l.style.color = l.getAttribute('href') === `#${cur}` ? 'var(--text)' : '';
        });
    }, { passive: true });

    // ── PARALLAX CARDS ──
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            document.querySelectorAll('.stack-card').forEach((c, i) => {
                const speed = (i + 1) * 0.02;
                const y = window.scrollY * speed;
                c.style.transform += '';
            });
        }, { passive: true });
    }
});
