document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize GSAP Timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 2. Animate Navbar Down
    tl.to(".navbar", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        startAt: { y: -50 } 
    });

    // 3. Reveal Main Heading with a "Pop" effect
    tl.from(".reveal-text", { 
        y: 60, 
        opacity: 0, 
        duration: 1.2, 
        delay: -0.5 
    });

    // 4. Stagger the subtext and buttons
    tl.to(".hero-subtext", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        startAt: { y: 20 } 
    }, "-=0.7");

    tl.to(".cta-group", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        startAt: { y: 20 } 
    }, "-=0.8");

    // 5. Add Mouse-Follow Parallax (Optional attractive feature)
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(".hero-container", {
            x: x,
            y: y,
            duration: 2,
            ease: "power2.out"
        });
    });
});