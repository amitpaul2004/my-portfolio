document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const glow = document.getElementById('cursor-glow');
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    // 1. Entrance Sequence
    const mainTl = gsap.timeline();
    mainTl.to(".progress", { width: "100%", duration: 1.5, ease: "power1.inOut" });
    mainTl.to("#loader", { y: "-100%", duration: 1, ease: "expo.inOut" });
    mainTl.from(".nav-wrapper", { y: -50, opacity: 0, duration: 1 }, "-=0.5");
    mainTl.from(".hero-title", { y: 30, opacity: 0, duration: 1 }, "-=0.7");

    // 2. Mouse Tracking
    window.addEventListener('mousemove', (e) => {
        gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.8 });
        const xMove = (e.clientX - window.innerWidth / 2) * 0.015;
        const yMove = (e.clientY - window.innerHeight / 2) * 0.015;
        gsap.to(".bg-visual", { x: xMove, y: yMove, duration: 2 });
    });

    // 3. Logo Scatter Effect
    const letters = document.querySelectorAll('.letter');
    document.getElementById('logo').addEventListener('mouseenter', () => {
        letters.forEach(l => gsap.to(l, { 
            x: (Math.random()-0.5)*50, y: (Math.random()-0.5)*50, 
            rotation: (Math.random()-0.5)*60, duration: 0.4 
        }));
    });
    document.getElementById('logo').addEventListener('mouseleave', () => {
        gsap.to(letters, { x: 0, y: 0, rotation: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    });

    // 4. Project Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            gsap.to(projectItems, { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => {
                projectItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        gsap.to(item, { scale: 1, opacity: 1, duration: 0.4 });
                    } else {
                        item.style.display = 'none';
                    }
                });
            }});
        });
    });

    // 5. Theme Ripple Switch
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
        tl.to(ripple, { clipPath: `circle(150% at ${e.clientX}px ${e.clientY}px)`, duration: 1, ease: "expo.inOut" });
    });

    // 6. Download CV Animation
    const cvBtn = document.getElementById('download-cv-btn');
    cvBtn.addEventListener('click', () => {
        const bar = cvBtn.querySelector('.download-progress');
        gsap.to(bar, { width: "100%", duration: 2.5, onComplete: () => {
            cvBtn.style.background = "#10b981";
            cvBtn.querySelector('.btn-text').innerText = "CV DOWNLOADED!";
        }});
    });
});

// Add this inside your existing DOMContentLoaded listener in script.js
const demoButtons = document.querySelectorAll('.opt-btn.demo, .opt-btn.code');

demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Prevent the card from flipping back immediately if needed
        e.stopPropagation(); 
        
        const targetUrl = btn.getAttribute('data-link');
        
        if (targetUrl) {
            // Opens the link in a new browser tab
            window.open(targetUrl, '_blank');
        }
    });
});

