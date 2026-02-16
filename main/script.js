document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const glow = document.getElementById('cursor-glow');
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    gsap.registerPlugin(ScrollTrigger);

    // 1. Unified Mouse Movement
    window.addEventListener('mousemove', (e) => {
        gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.8 });
        const xMove = (e.clientX - window.innerWidth / 2) * 0.015;
        const yMove = (e.clientY - window.innerHeight / 2) * 0.015;
        gsap.to(".bg-visual", { x: xMove, y: yMove, duration: 2 });
        gsap.to(".bg-mesh", { x: -xMove * 0.5, y: -yMove * 0.5, duration: 2.5 });
    });

    // 2. Particle Engine
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize); resize();

    class Particle {
        constructor(x, y, color) {
            this.x = x; this.y = y; this.color = color;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 12;
            this.speedY = (Math.random() - 0.5) * 12;
            this.alpha = 1;
        }
        update() { this.x += this.speedX; this.y += this.speedY; this.alpha -= 0.02; }
        draw() { ctx.globalAlpha = this.alpha; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => { p.update(); p.draw(); if (p.alpha <= 0) particles.splice(i, 1); });
        requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // 3. Tactile Feedback
    document.querySelectorAll('button, .nav-item, .logo').forEach(el => {
        el.addEventListener('mousedown', (e) => {
            const color = getComputedStyle(document.documentElement).getPropertyValue('--primary');
            for(let i=0; i<15; i++) particles.push(new Particle(e.clientX, e.clientY, color));
            gsap.to(el, { scale: 0.88, duration: 0.1, onComplete: () => gsap.to(el, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" })});
        });
    });

    // 4. Logo Scatter
    const letters = document.querySelectorAll('.letter');
    document.getElementById('logo').addEventListener('mouseenter', () => {
        letters.forEach(l => gsap.to(l, { x: (Math.random()-0.5)*50, y: (Math.random()-0.5)*50, rotation: (Math.random()-0.5)*60, duration: 0.4 }));
    });
    document.getElementById('logo').addEventListener('mouseleave', () => {
        gsap.to(letters, { x: 0, y: 0, rotation: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    });

    // 5. Theme Ripple
    const toggle = document.getElementById('theme-toggle');
    const ripple = document.getElementById('theme-ripple');
    toggle.addEventListener('click', (e) => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        const nextColor = newTheme === 'dark' ? '#020617' : '#f8fafc';
        ripple.style.backgroundColor = nextColor;
        const tl = gsap.timeline({ onComplete: () => {
            html.setAttribute('data-theme', newTheme);
            gsap.set(ripple, { clipPath: `circle(0% at ${e.clientX}px ${e.clientY}px)` });
            document.body.style.backgroundColor = nextColor;
        }});
        tl.to(ripple, { clipPath: `circle(150% at ${e.clientX}px ${e.clientY}px)`, duration: 0.9, ease: "expo.inOut" });
    });

    // 6. Download CV Animation
    const cvBtn = document.getElementById('download-cv-btn');
    cvBtn.addEventListener('click', () => {
        const bar = cvBtn.querySelector('.download-progress');
        gsap.to(bar, { width: "100%", duration: 2, ease: "power1.inOut", onComplete: () => {
            cvBtn.style.background = "#10b981";
            cvBtn.querySelector('.btn-text').innerText = "DONE!";
        }});
    });

    // 7. Scroll Reveal
    document.getElementById('scroll-trigger').addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });

    gsap.from(".project-card", {
        scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
        y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
    });
});