document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("assistantBtn");
    const panel = document.getElementById("assistantPanel");
    const closeBtn = document.getElementById("closeAssistant");
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chatBox");
    const voiceBtn = document.getElementById("voiceBtn");
    const sendBtn = document.getElementById("sendBtn");


    let personalData = "";

fetch("personal.txt")
.then(res => res.text())
.then(data => {
    personalData = data;
});

    let greetingTriggered = false;

    btn.onclick = () => {
        panel.classList.add("active");
        if (!greetingTriggered) {
            greetingTriggered = true;
            setTimeout(() => addMsg("Hello! I'm Amit. How can I help you today?", 'bot'), 600);
        }
    };
    closeBtn.onclick = () => panel.classList.remove("active");

    // --- TYPEWRITER ENGINE (Ensures spaces are preserved) ---
    function typeWriter(text, element) {
        let i = 0;
        element.textContent = ""; 
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                chat.scrollTop = chat.scrollHeight;
                setTimeout(type, 35);
            }
        }
        type();
    }

    function addMsg(text, type) {
        const m = document.createElement("div");
        m.className = `message ${type}`;
        const bubble = document.createElement("div");
        bubble.className = `bubble ${type}Bubble`;
        m.appendChild(bubble);
        chat.appendChild(m);
        if (type === 'bot') typeWriter(text, bubble);
        else bubble.textContent = text;
        chat.scrollTop = chat.scrollHeight;
    }

    // --- BOT LOGIC ---

async function botReply(text){

document.getElementById("typing-id")?.remove();

try{

const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{
method:"POST",
headers:{
"Authorization":"Bearer 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",
"Content-Type":"application/json"
},
body:JSON.stringify({
model:"openai/gpt-3.5-turbo",
messages:[
{
role:"system",
content:`You are Krishna, an AI assistant on Amit Paul's portfolio website.

Use this information to answer:

${personalData}

Only answer using this information if relevant.`
},
{
role:"user",
content:text
}
]
})
});

const data = await response.json();

console.log(data);   // helps debugging

if(data.choices && data.choices.length > 0){
let reply = data.choices[0].message.content;
addMsg(reply,"bot");
}else{
addMsg("AI is thinking... try again.", "bot");
}

}catch(error){

console.error(error);
addMsg("Connection error. Please check API key.", "bot");

}

}
    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        addMsg(text, 'user');
        input.value = "";
        sendBtn.style.display = "none";
        voiceBtn.style.display = "block";
        const t = document.createElement("div");
        t.id = "typing-id"; t.className = "message bot";
        t.innerHTML = `<div class="bubble botBubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
        chat.appendChild(t);
        chat.scrollTop = chat.scrollHeight;
        setTimeout(() => botReply(text), 1500);
    }

    // --- VOICE & UI LISTENERS ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        voiceBtn.onclick = () => { recog.start(); voiceBtn.classList.add("listening"); };
        recog.onresult = (e) => { input.value = e.results[0][0].transcript; sendMessage(); };
        recog.onend = () => voiceBtn.classList.remove("listening");
    }

    input.oninput = () => {
        const hasText = input.value.trim().length > 0;
        sendBtn.style.display = hasText ? "block" : "none";
        voiceBtn.style.display = hasText ? "none" : "block";
    };
    sendBtn.onclick = sendMessage;
    input.onkeydown = (e) => { if(e.key === "Enter") sendMessage(); };

    // --- PARTICLE ENGINE ---
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    window.addEventListener('resize', resize); resize();
    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5; this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2; this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() { this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset(); }
        draw() { ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }
    for (let i = 0; i < 40; i++) particles.push(new Particle());
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
    animate();
});