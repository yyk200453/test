class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > this.canvas.height) {
            this.y = 0;
            this.x = Math.random() * this.canvas.width;
        }
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(255, 192, 203, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-this.size, this.size * 2);
        ctx.lineTo(this.size, this.size * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 50;
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 创建资源目录
const createAssetsDirs = () => {
    const dirs = ['assets', 'assets/images'];
    dirs.forEach(dir => {
        try {
            const path = dir.split('/');
            let currentPath = '';
            path.forEach(folder => {
                currentPath += (currentPath ? '/' : '') + folder;
                try {
                    if (!document.querySelector(`meta[data-path="${currentPath}"]`)) {
                        const meta = document.createElement('meta');
                        meta.setAttribute('data-path', currentPath);
                        document.head.appendChild(meta);
                    }
                } catch (e) {
                    console.warn(`Could not create directory: ${currentPath}`);
                }
            });
        } catch (e) {
            console.warn(`Error creating directory: ${dir}`);
        }
    });
};

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    createAssetsDirs();
    new ParticleSystem();
}); 