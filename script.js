// Simple & 100% Working Script
document.addEventListener('DOMContentLoaded', function() {

    // Loader
    let count = 0;
    const loader = document.getElementById('loader');
    const countEl = document.getElementById('loadCount');
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 12) + 5;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            setTimeout(() => loader.classList.add('hidden'), 300);
        }
        countEl.textContent = count;
    }, 80);

    // Theme Toggle
    const themeBtn = document.getElementById('themeBtn');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu
    const mobileBtn = document.getElementById('mobileBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileBtn.onclick = () => mobileMenu.classList.toggle('open');

    // Rotating Text
    const words = ['Logos', 'Social Posts', 'AI Art', 'Banners', 'Invitations'];
    let i = 0;
    setInterval(() => {
        document.getElementById('rotate').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('rotate').textContent = words[i];
            document.getElementById('rotate').style.opacity = 1;
            i = (i + 1) % words.length;
        }, 300);
    }, 3000);

    // Filter
    document.querySelectorAll('.filters button').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.filters .active').classList.remove('active');
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            document.querySelectorAll('.item').forEach(item => {
                if (filter === 'all' || item.getAttribute('data-cat') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Counter
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.getAttribute('data-count');
                let num = 0;
                const timer = setInterval(() => {
                    num += Math.ceil(target / 50);
                    if (num >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = num;
                    }
                }, 30);
                observer.unobserve(entry.target);
            }
        });
    });
    counters.forEach(c => observer.observe(c));
});
