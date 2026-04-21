document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        highlightActiveSection();
    });

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
        mobileNav.querySelectorAll('.nav-item').forEach(link =>
            link.addEventListener('click', () => mobileNav.classList.remove('open'))
        );
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') === '#') return;
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (!target) return;
            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });

    function highlightActiveSection() {
        const scrollY = window.scrollY;
        sections.forEach(current => {
            const top = current.offsetTop - 100;
            const height = current.offsetHeight;
            const id = current.getAttribute('id');
            if (scrollY > top && scrollY <= top + height) {
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === '#' + id);
                });
            }
        });
    }

    window.openModal = function () {
        const target = document.getElementById('get-started');
        if (!target) return;
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    };

    window.selectAmount = function (btn) {
        document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const monthly = btn.getAttribute('data-monthly');
        const receive = btn.getAttribute('data-receive');
        const p = document.getElementById('patientPays');
        const r = document.getElementById('practiceReceives');
        if (p) p.innerHTML = `$${monthly}<span class="calc-unit">/mo</span>`;
        if (r) r.innerText = `$${receive}`;
    };
});
