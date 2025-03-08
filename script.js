const flowers = document.getElementById('flowers');
const greeting = document.getElementById('greeting');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Kiểm tra ảnh load
flowers.onload = () => {
    console.log('Ảnh đã load thành công');
};
flowers.onerror = () => {
    console.error('Lỗi load ảnh, kiểm tra đường dẫn');
};

// Hiệu ứng xuất hiện
setTimeout(() => {
    flowers.classList.add('show-flowers');
    console.log('Đã thêm class show-flowers'); // Debug
    
    setTimeout(() => {
        greeting.classList.add('show-greeting');
        console.log('Đã thêm class show-greeting'); // Debug
        
        setTimeout(() => {
            animate();
            console.log('Bắt đầu pháo hoa'); // Debug
        }, 800);
    }, 800);
}, 1000);

// Firework class
class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.sx = Math.random() * 3 - 1.5;
        this.sy = Math.random() * -6 - 5;
        this.size = Math.random() * 3 + 2;
        this.life = Math.random() * 60 + 40;
        this.r = Math.floor(Math.random() * 255);
        this.g = Math.floor(Math.random() * 255);
        this.b = Math.floor(Math.random() * 255);
    }

    update() {
        this.x += this.sx;
        this.y += this.sy;
        this.sy += 0.08;
        this.life--;
    }

    draw() {
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life / 60})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let fireworks = [];

function createFireworks() {
    if (Math.random() < 0.15) {
        fireworks.push(new Firework());
    }
}

function animate() {
    ctx.fillStyle = 'rgba(26, 26, 46, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    createFireworks();

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();
        if (fireworks[i].life <= 0) {
            fireworks.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});