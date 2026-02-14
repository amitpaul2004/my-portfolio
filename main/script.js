document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const glow = document.getElementById('cursor-glow');
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    // 1. Cursor Glow Tracking
    window.addEventListener('mousemove', (e) => {
        gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.8, ease: "power2.out" });
    });

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // 2. Particle Physics Engine
    class Particle {
        constructor(x, y, color) {
            this.x = x; this.y = y; this.color = color;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 12;
            this.speedY = (Math.random() - 0.5) * 12;
            this.alpha = 1;
        }
        update() { this.x += this.speedX; this.y += this.speedY; this.alpha -= 0.02; }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        }
    }

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.update(); p.draw();
            if (p.alpha <= 0) particles.splice(i, 1);
        });
        requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // 3. Tactile Feedback (Click Burst & Elastic Pop)
    const elements = document.querySelectorAll('button, .nav-item, .logo');
    elements.forEach(el => {
        el.addEventListener('mousedown', (e) => {
            const color = getComputedStyle(document.documentElement).getPropertyValue('--primary');
            for(let i=0; i<15; i++) particles.push(new Particle(e.clientX, e.clientY, color));
            
            gsap.to(el, { scale: 0.88, duration: 0.1, onComplete: () => {
                gsap.to(el, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" });
            }});
        });
    });

    // 4. Logo Scatter/Gather Animation
    const logo = document.getElementById('logo');
    const letters = document.querySelectorAll('.letter');
    logo.addEventListener('mouseenter', () => {
        letters.forEach(l => gsap.to(l, { 
            x: (Math.random()-0.5)*50, y: (Math.random()-0.5)*50, 
            rotation: (Math.random()-0.5)*60, duration: 0.4, ease: "power2.out" 
        }));
    });
    logo.addEventListener('mouseleave', () => {
        gsap.to(letters, { x: 0, y: 0, rotation: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    });

    // 5. Ripple Theme Transition
    const toggle = document.getElementById('theme-toggle');
    const ripple = document.getElementById('theme-ripple');
    toggle.addEventListener('click', (e) => {
        const rect = toggle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        const isDark = html.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        const nextColor = newTheme === 'dark' ? '#020617' : '#f8fafc';

        ripple.style.backgroundColor = nextColor;
        const tl = gsap.timeline({ onComplete: () => {
            html.setAttribute('data-theme', newTheme);
            gsap.set(ripple, { clipPath: `circle(0% at ${x}px ${y}px)` });
            document.body.style.backgroundColor = nextColor;
        }});
        
        tl.to(ripple, { clipPath: `circle(150% at ${x}px ${y}px)`, duration: 0.9, ease: "expo.inOut" });
    });

    // 6. Page Entry Animation
    gsap.from(".dock", { y: -100, opacity: 0, duration: 1.5, ease: "expo.out" });
    gsap.from(".hero-title", { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: "power4.out" });
});

// Add this inside your 'mousemove' listener in script.js
window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    gsap.to(".bg-image-overlay", {
        x: moveX,
        y: moveY,
        duration: 1.5,
        ease: "power2.out"
    });

    // Also move the mesh slightly differently for a 3D effect
    gsap.to(".bg-mesh", {
        x: -moveX * 0.5,
        y: -moveY * 0.5,
        duration: 2,
        ease: "power2.out"
    });
});