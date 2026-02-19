/**
 * AMIT PAUL - Portfolio Logic 2026
 * Features: Particle Background, Smart-Hide Nav, Scroll-Spy, Interactive Buttons
 */

// 1. DYNAMIC PARTICLE BACKGROUND (Cyber-Starfield)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.fillStyle = `rgba(0, 243, 255, ${this.opacity})`; // Cyan glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Star());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// 2. SMART-HIDE NAVIGATION & SCROLL-SPY
let lastScroll = window.scrollY;
const nav = document.querySelector('.glass-nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main, section');

function handleScroll() {
    const currentScroll = window.scrollY;

    // A. Smart Hide/Show Logic
    if (currentScroll > lastScroll && currentScroll > 150) {
        nav.classList.add('nav-hidden');
    } else {
        nav.classList.remove('nav-hidden');
    }
    lastScroll = currentScroll;

    // B. Scroll-Spy Logic (Update Active Link)
    let currentSectionId = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (currentScroll >= sectionTop - 200) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSectionId)) {
            link.classList.add('active');
        }
    });
}

// 3. INTERACTIVE COMPONENT ANIMATIONS
function setupInteractions() {
    // A. Profile Card 3D Tilt Effect
    const card = document.getElementById('profileCard');
    if (card) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
        });
    }

    // B. Button Click/Touch Feedback
    const buttons = document.querySelectorAll('.interactive-btn, .hire-btn');
    buttons.forEach(btn => {
        const playAnim = () => {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => btn.style.transform = 'scale(1)', 150);
        };
        btn.addEventListener('mousedown', playAnim);
        btn.addEventListener('touchstart', playAnim);
    });

    // C. Initial Entrance Reveal
    const animTargets = document.querySelectorAll('.slide-left, .slide-right, .dropdown, .reveal');
    setTimeout(() => {
        animTargets.forEach(el => el.classList.add('appear'));
    }, 400);
}

// 4. INITIALIZATION
window.addEventListener('resize', resizeCanvas);
window.addEventListener('scroll', handleScroll);

window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    initParticles();
    animateParticles();
    setupInteractions();
});


const downloadBtn = document.getElementById('downloadCV');
const hiddenLink = document.getElementById('hiddenDownload');
const btnText = downloadBtn.querySelector('.btn-text');

downloadBtn.addEventListener('click', () => {
    // 1. Start the 'AI Processing' Animation
    downloadBtn.classList.add('downloading');
    btnText.innerText = "Generating..."; // Optional text update

    // 2. Simulate the AI generation delay (2 seconds)
    setTimeout(() => {
        // 3. Trigger the actual file download from your folder
        hiddenLink.click();

        // 4. Update UI to 'Success' state
        downloadBtn.classList.remove('downloading');
        downloadBtn.classList.add('btn-success');
        btnText.innerText = "Downloaded ✓";
        btnText.style.visibility = "visible";
        btnText.style.opacity = "1";

        // 5. Reset button back to normal after 4 seconds
        setTimeout(() => {
            downloadBtn.classList.remove('btn-success');
            btnText.innerText = "Download CV";
        }, 4000);

    }, 2000); 
});