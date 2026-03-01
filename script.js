// mouse glow

const glow = document.querySelector(".mouse-glow")

document.addEventListener("mousemove", e=>{
glow.style.left = e.clientX + "px"
glow.style.top = e.clientY + "px"
})



// particles

const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

for(let i=0;i<80;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5),
vy:(Math.random()-0.5)
})

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

p.x += p.vx
p.y += p.vy

if(p.x<0||p.x>canvas.width)p.vx*=-1
if(p.y<0||p.y>canvas.height)p.vy*=-1

ctx.beginPath()
ctx.arc(p.x,p.y,2,0,Math.PI*2)
ctx.fillStyle="#7c8cff"
ctx.fill()

particles.forEach(p2=>{

let dist = Math.hypot(p.x-p2.x,p.y-p2.y)

if(dist<120){

ctx.beginPath()
ctx.moveTo(p.x,p.y)
ctx.lineTo(p2.x,p2.y)
ctx.strokeStyle="rgba(124,140,255,0.15)"
ctx.stroke()

}

})

})

requestAnimationFrame(animate)

}

animate()

// magnetic buttons

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mousemove",e=>{

const rect = btn.getBoundingClientRect()

const x = e.clientX - rect.left - rect.width/2
const y = e.clientY - rect.top - rect.height/2

btn.style.transform =
`translate(${x*0.2}px,${y*0.2}px) scale(1.05)`

})

btn.addEventListener("mouseleave",()=>{
btn.style.transform="translate(0,0)"
})

})
// active nav highlight

const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav a")

window.addEventListener("scroll",()=>{

let current=""

sections.forEach(section=>{

const sectionTop = section.offsetTop

if(scrollY >= sectionTop - 200){
current = section.getAttribute("id")
}

})

navLinks.forEach(a=>{

a.classList.remove("active")

if(a.getAttribute("href") === "#"+current){
a.classList.add("active")
}

})

})
document.querySelectorAll('.nav a').forEach(anchor => {

anchor.addEventListener('click', function (e) {

e.preventDefault();

document.querySelector(this.getAttribute('href'))
.scrollIntoView({
behavior: 'smooth'
});

});

});



const counters = document.querySelectorAll(".counter")

const speed = 200

counters.forEach(counter => {

const updateCount = () => {

const target = +counter.getAttribute("data-target")
const count = +counter.innerText

const increment = target / speed

if(count < target){

counter.innerText = Math.ceil(count + increment)

setTimeout(updateCount,10)

}else{

if(target === 100){
counter.innerText = target + "%"
}else{
counter.innerText = target + "+"
}

}

}

updateCount()

})
    document.querySelector(".scroll-indicator").onclick = () => {

window.scrollBy({
top: window.innerHeight,
behavior: "smooth"
})




// about
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop - 200;

if (scrollY >= sectionTop) {
current = section.getAttribute("id");
}

});

navLinks.forEach(link => {

link.classList.remove("active");

if (link.getAttribute("href") === "#" + current) {
link.classList.add("active");
}

});

});
const reveals = document.querySelectorAll(".reveal")

function revealOnScroll(){

reveals.forEach(el=>{

const top = el.getBoundingClientRect().top
const windowHeight = window.innerHeight

if(top < windowHeight - 80){
el.classList.add("active")
}

})

}

window.addEventListener("scroll", revealOnScroll)
revealOnScroll()

document.querySelectorAll(".tilt").forEach(card=>{

card.addEventListener("mousemove", e=>{

const rect = card.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const centerX = rect.width/2
const centerY = rect.height/2

const rotateX = -(y - centerY)/10
const rotateY = (x - centerX)/10

card.style.transform =
`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`

})

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0)"

})

})

const about = document.querySelector(".about")

about.addEventListener("mousemove", e=>{

const x = e.clientX / window.innerWidth
const y = e.clientY / window.innerHeight

about.style.backgroundPosition =
`${x*40}px ${y*40}px`

})


document.querySelectorAll('.nav a').forEach(link => {

link.addEventListener('click', function(e) {

e.preventDefault();

const target = document.querySelector(this.getAttribute('href'));

target.scrollIntoView({
behavior: "smooth"
});

});

});

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0)";
}

});

});

cards.forEach(card=>{
card.style.opacity = "0";
card.style.transform = "translateY(60px)";
observer.observe(card);
});





    }

// ===============================
// ABOUT TEXT ANIMATION
// ===============================

const elements = document.querySelectorAll(".slide-up");

const textObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});

},{threshold:0.4});

elements.forEach(el => textObserver.observe(el));


// ===============================
// TITLE UNDERLINE ANIMATION
// ===============================

const title = document.querySelector(".section-title");

const titleObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});

},{threshold:0.6});

if(title){
titleObserver.observe(title);
}


// ===============================
// ABOUT CARDS ANIMATION
// ===============================

const cards = document.querySelectorAll(".about-card");

const cardObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

cards.forEach((card,index)=>{

setTimeout(()=>{
card.classList.add("show");
}, index * 200);

});

}

});

},{threshold:0.4});

const aboutCardsContainer = document.querySelector(".about-cards");

if(aboutCardsContainer){
cardObserver.observe(aboutCardsContainer);
}


// ===============================
// SERVICES CARDS ANIMATION
// ===============================

const serviceCards = document.querySelectorAll(".service-card");

const serviceObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

serviceCards.forEach((card,index)=>{

setTimeout(()=>{
card.classList.add("show");
}, index * 150);

});

}

});

},{threshold:0.2});

const servicesGrid = document.querySelector(".services-grid");

if(servicesGrid){
serviceObserver.observe(servicesGrid);
}
const subtitle = document.querySelector(".reveal-text");

const subtitleObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});

},{threshold:0.5});

if(subtitle){
subtitleObserver.observe(subtitle);
}

const servicesTitle = document.querySelector(".services-title");

const servicesObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});

},{threshold:0.6});

if(servicesTitle){
servicesObserver.observe(servicesTitle);
}


// ================================
// PORTFOLIO CARDS ANIMATION
// ===============================

const projects = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

projects.forEach((card,index)=>{

setTimeout(()=>{
card.classList.add("show");
}, index * 180);

});

}

});

},{threshold:0.2});

observer.observe(document.querySelector(".projects-grid"));

const portfolioTitle = document.querySelector(".portfolio-title");

const portfolioObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});

},{threshold:0.6});

if(portfolioTitle){
portfolioObserver.observe(portfolioTitle);
}


// =====
// download button animation
// ====

const btn = document.getElementById("downloadBtn");

btn.addEventListener("click", () => {

btn.classList.add("loading");

btn.querySelector(".btn-text").innerText = "Preparing Download...";

setTimeout(() => {

const link = document.createElement("a");
link.href = "amit.pdf";
link.download = "amit.pdf";
link.click();

btn.classList.remove("loading");
btn.querySelector(".btn-text").innerText = "View My Work";

}, 1500);

});


// =================
// skills target
// =================

const skillCards = document.querySelectorAll(".skill-card");

const skillsObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

skillCards.forEach((card,i)=>{

setTimeout(()=>{
card.classList.add("show");
}, i * 150);

});

}

});

},{threshold:0.3});

const skillsGrid = document.querySelector(".skills-grid");

if(skillsGrid){
skillsObserver.observe(skillsGrid);
}
const skillsTitle = document.querySelector(".skills-title");

const skillsTitleObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});

},{threshold:0.6});

if(skillsTitle){
skillsTitleObserver.observe(skillsTitle);
}

// ==================
// Testimonials
// ==================
const testimonialCards = document.querySelectorAll(".testimonial-card");

const testimonialObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

testimonialCards.forEach((card,i)=>{

setTimeout(()=>{
card.classList.add("show");
}, i * 200);

});

}

});

},{threshold:0.3});

const testimonialSection = document.querySelector(".testimonials");

if(testimonialSection){
testimonialObserver.observe(testimonialSection);
}


const testimonialsTitle = document.querySelector(".testimonials-title");

const testimonialsObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});

},{threshold:0.6});

if(testimonialsTitle){
testimonialsObserver.observe(testimonialsTitle);
}



// =====
// contact
// =====
const contactBox = document.querySelector(".contact-container");

const contactObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

},{threshold:0.4});

if(contactBox){
contactObserver.observe(contactBox);
}
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});

},{threshold:0.3});

revealElements.forEach(el=>{
revealObserver.observe(el);
});

const modal = document.getElementById("contactModal");
const openBtn = document.getElementById("openContact");
const closeBtn = document.getElementById("closeContact");
const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

/* open */

openBtn.onclick = (e)=>{
e.preventDefault();
modal.classList.add("active");
};

/* close */

closeBtn.onclick = ()=>{
modal.classList.remove("active");
};

/* send animation */

form.addEventListener("submit",(e)=>{

e.preventDefault();

sendBtn.classList.add("success");
sendBtn.innerHTML = '<i class="bi bi-check"></i> Message Sent';

});


/* EMAILJS */

(function(){
emailjs.init("GZFRle1CvikMGd85P");
})();

document
.getElementById("contactForm")
.addEventListener("submit", function(e){

e.preventDefault();

emailjs.sendForm(
"service_rkjjoum",
"template_0s74vb5",
this
).then(function(){

document.getElementById("sendBtn").innerHTML =
"✔ Message Sent";

}, function(error){

alert("Failed to send message");

});

});


// =================
// FOOTER
// =================

/* FOOTER SCROLL REVEAL */

const footerReveals = document.querySelectorAll(".reveal");

const footerObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

},{threshold:0.2});

footerReveals.forEach(el => footerObserver.observe(el));



/* FOOTER PARTICLES */

const footerCanvas = document.getElementById("footerParticles");

if(footerCanvas){

const footerCtx = footerCanvas.getContext("2d");

footerCanvas.width = window.innerWidth;
footerCanvas.height = 400;

let footerParticles = [];

for(let i=0;i<60;i++){

footerParticles.push({
x:Math.random()*footerCanvas.width,
y:Math.random()*footerCanvas.height,
vx:(Math.random()-0.5)*0.5,
vy:(Math.random()-0.5)*0.5
});

}

function animateFooter(){

footerCtx.clearRect(0,0,footerCanvas.width,footerCanvas.height);

footerParticles.forEach(p=>{

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0 || p.x>footerCanvas.width) p.vx*=-1;
if(p.y<0 || p.y>footerCanvas.height) p.vy*=-1;

footerCtx.beginPath();
footerCtx.arc(p.x,p.y,2,0,Math.PI*2);
footerCtx.fillStyle="#6366f1";
footerCtx.fill();

});

requestAnimationFrame(animateFooter);

}

animateFooter();

}
const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {

logo.style.transform = "scale(0.9) rotate(-3deg)";

setTimeout(()=>{
logo.style.transform = "scale(1) rotate(0)";
},200);

});

// ===========
// INTRO LOADER
// ===========

/* INTRO LOADER */
window.addEventListener("load",()=>{

/* SOUND */
const sound=document.getElementById("introSound");
if(sound) sound.play().catch(()=>{});

/* AUTO CLOSE INTRO */

setTimeout(()=>{
document.getElementById("aiIntro").classList.add("hide");
},3500);

});
const netCanvas=document.getElementById("networkCanvas");
const netCtx=netCanvas.getContext("2d");

netCanvas.width=window.innerWidth;
netCanvas.height=window.innerHeight;

let nodes=[];

for(let i=0;i<70;i++){
nodes.push({
x:Math.random()*netCanvas.width,
y:Math.random()*netCanvas.height,
vx:(Math.random()-.5)*0.7,
vy:(Math.random()-.5)*0.7
});
}

function drawNetwork(){

netCtx.clearRect(0,0,netCanvas.width,netCanvas.height);

nodes.forEach(n=>{
n.x+=n.vx;
n.y+=n.vy;

if(n.x<0||n.x>netCanvas.width) n.vx*=-1;
if(n.y<0||n.y>netCanvas.height) n.vy*=-1;

netCtx.beginPath();
netCtx.arc(n.x,n.y,2,0,Math.PI*2);
netCtx.fillStyle="#7c3aed";
netCtx.fill();
});

for(let i=0;i<nodes.length;i++){
for(let j=i;j<nodes.length;j++){

let dx=nodes[i].x-nodes[j].x;
let dy=nodes[i].y-nodes[j].y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){

netCtx.beginPath();
netCtx.strokeStyle="rgba(124,58,237,.2)";
netCtx.moveTo(nodes[i].x,nodes[i].y);
netCtx.lineTo(nodes[j].x,nodes[j].y);
netCtx.stroke();

}

}
}

requestAnimationFrame(drawNetwork);
}

drawNetwork();
const gridCanvas=document.getElementById("gridCanvas");
const gctx=gridCanvas.getContext("2d");

gridCanvas.width=window.innerWidth;
gridCanvas.height=window.innerHeight;

let offset=0;

function drawGrid(){

gctx.clearRect(0,0,gridCanvas.width,gridCanvas.height);

gctx.strokeStyle="rgba(99,102,241,.15)";

for(let x=0;x<gridCanvas.width;x+=60){

gctx.beginPath();
gctx.moveTo(x,0);
gctx.lineTo(x,gridCanvas.height);
gctx.stroke();

}

for(let y=0;y<gridCanvas.height;y+=60){

gctx.beginPath();
gctx.moveTo(0,y+offset);
gctx.lineTo(gridCanvas.width,y+offset);
gctx.stroke();

}

offset+=0.3;

requestAnimationFrame(drawGrid);

}

drawGrid();
document.addEventListener("DOMContentLoaded", function () {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    }, { threshold: 0.2 });


    document.querySelectorAll(".reveal").forEach(el => {
        revealObserver.observe(el);
    });

});
const sound = document.getElementById("introSound");

document.addEventListener("click", () => {
    sound.play().catch(()=>{});
}, { once: true });
window.addEventListener("load", () => {

const sound = document.getElementById("introSound");

setTimeout(() => {
    sound.play().catch(()=>{});
}, 500);

});