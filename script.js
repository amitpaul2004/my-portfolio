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

const btn = document.querySelector(".download-btn")

btn.addEventListener("click",()=>{

btn.innerHTML="Downloading..."

setTimeout(()=>{
btn.innerHTML="✔ Downloaded"
},1200)

})

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

