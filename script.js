function openImage(imgElement) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  modal.style.display = "block";
  modalImg.src = imgElement.src;
}

function closeImage() {
  document.getElementById("imgModal").style.display = "none";
}




const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// 🌟 Create twinkling stars
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    alpha: Math.random(),
    delta: Math.random() * 0.02,
  });
}

// 🚀 Create shooting stars continuously (2–4 at a time)
function createShootingStar() {
  if (Math.random() < 0.1) {
    for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        len: Math.random() * 80 + 80,
        speed: Math.random() * 10 + 15,
        angle: Math.PI / 4, // diagonal
        opacity: 1,
      });
    }
  }
}

// ✨ Animate everything
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Twinkling stars
  for (let star of stars) {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  }

  // Shooting stars
  for (let i = 0; i < shootingStars.length; i++) {
    let s = shootingStars[i];
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.len * Math.cos(s.angle), s.y + s.len * Math.sin(s.angle));
    ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    s.x += Math.cos(s.angle) * s.speed;
    s.y -= Math.sin(s.angle) * s.speed;
    s.opacity -= 0.02;

    if (s.opacity <= 0) shootingStars.splice(i, 1);
  }

  createShootingStar();
  requestAnimationFrame(animate);
}

animate();
