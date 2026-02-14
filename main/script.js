document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const ripple = document.getElementById('theme-ripple');
    const logo = document.getElementById('logo');
    const letters = document.querySelectorAll('.letter');
    const html = document.documentElement;

    // 1. Logo Scatter Animation
    logo.addEventListener('mouseenter', () => {
        letters.forEach(letter => {
            const randomX = (Math.random() - 0.5) * 30;
            const randomY = (Math.random() - 0.5) * 30;
            const randomRot = (Math.random() - 0.5) * 45;
            
            gsap.to(letter, {
                x: randomX,
                y: randomY,
                rotation: randomRot,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });

    logo.addEventListener('mouseleave', () => {
        gsap.to(letters, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
        });
    });

    // 2. Ripple Theme Toggle Logic
    toggle.addEventListener('click', (e) => {
        const rect = toggle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        const nextBg = newTheme === 'dark' ? '#020617' : '#ffffff';

        ripple.style.backgroundColor = nextBg;

        const tl = gsap.timeline({
            onComplete: () => {
                html.setAttribute('data-theme', newTheme);
                gsap.set(ripple, { clipPath: `circle(0% at ${x}px ${y}px)` });
                document.body.style.backgroundColor = nextBg;
            }
        });

        tl.to(ripple, {
            clipPath: `circle(150% at ${x}px ${y}px)`,
            duration: 0.8,
            ease: "expo.inOut"
        });
    });

    // 3. Page Entrance
    gsap.from(".dock", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".hero-title", { y: 30, opacity: 0, duration: 1, delay: 0.4 });
    gsap.from(".hero-sub, .buttons", { y: 20, opacity: 0, stagger: 0.2, duration: 0.8, delay: 0.6 });
});