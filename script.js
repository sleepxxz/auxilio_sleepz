const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
  });
}

// Pré-simula para já começar cheio
for (let t = 0; t < 300; t++) {
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      let q = particles[j];
      let dx = p.x - q.x;
      let dy = p.y - q.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = 'rgba(147,112,219,0.2)';
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

function inject() {
  let btn = document.querySelector(".inject-btn");
  let msg = document.getElementById("injectMsg");
  btn.disabled = true;
  btn.innerText = "Injetando...";
  msg.innerText = "Injetando pastas no jogo...";

  setTimeout(() => {
    btn.innerText = "Injetado";
    msg.innerText = "Pastas injetadas com sucesso!";
    btn.disabled = false;
  }, 2000);
}