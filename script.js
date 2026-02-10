// Time & Date
function updateTime() {
    const now = new Date();
    document.getElementById("currentTime").textContent = now.toLocaleTimeString();
    document.getElementById("currentDate").textContent = now.toDateString();
}
setInterval(updateTime, 1000);
updateTime();

// Canvas Animation – Highlighted Tech Nodes
const canvas = document.getElementById("effectsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
const nodeCount = 80; // more nodes for brighter effect

for (let i = 0; i < nodeCount; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 3 + 1
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((a, i) => {
        a.x += a.dx;
        a.y += a.dy;

        if (a.x < 0 || a.x > canvas.width) a.dx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.dy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,189,248,0.9)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#38bdf8";
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < nodes.length; j++) {
            let b = nodes[j];
            let dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 200) { // longer connections
                ctx.strokeStyle = "rgba(56,189,248,0.3)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Sparkle particles on headline
const header = document.querySelector('.header h1');
const sparkleContainer = document.createElement('div');
sparkleContainer.style.position = 'absolute';
sparkleContainer.style.top = '0';
sparkleContainer.style.left = '50%';
sparkleContainer.style.transform = 'translateX(-50%)';
sparkleContainer.style.pointerEvents = 'none';
header.appendChild(sparkleContainer);

function createSparkle() {
    const sparkle = document.createElement('span');
    sparkle.style.position = 'absolute';
    sparkle.style.width = sparkle.style.height = Math.random() * 3 + 2 + 'px';
    sparkle.style.background = '#0ff';
    sparkle.style.borderRadius = '50%';
    sparkle.style.top = Math.random() * header.offsetHeight + 'px';
    sparkle.style.left = Math.random() * header.offsetWidth + 'px';
    sparkle.style.opacity = '1';
    sparkle.style.transition = 'all 1s ease-out';
    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.style.top = (parseFloat(sparkle.style.top) - 10) + 'px';
        sparkle.style.opacity = '0';
    }, 50);

    setTimeout(() => sparkle.remove(), 1000);
}

setInterval(createSparkle, 200);
