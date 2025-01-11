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

// 在线人数计数器功能
document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.querySelector('.counter-number');
    let baseCount = Math.floor(Math.random() * (2000 - 1500) + 1500); // 基础人数1500-2000
    
    function updateCounter() {
        // 添加更新动画类
        counterElement.classList.add('updating');
        
        // 随机增减人数（-5到+10人）
        const change = Math.floor(Math.random() * 16) - 5;
        baseCount = Math.max(1500, Math.min(2000, baseCount + change));
        
        // 更新显示的数字
        counterElement.textContent = baseCount.toLocaleString();
        
        // 移除动画类
        setTimeout(() => {
            counterElement.classList.remove('updating');
        }, 500);
    }

    // 初始更新
    updateCounter();
    
    // 每5-10秒随机更新一次
    function scheduleNextUpdate() {
        const delay = Math.random() * (10000 - 5000) + 5000;
        setTimeout(() => {
            updateCounter();
            scheduleNextUpdate();
        }, delay);
    }
    
    scheduleNextUpdate();
});

// 视频背景初始化
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');
    
    // 视频加载错误处理
    video.addEventListener('error', function(e) {
        console.error('Video loading error:', e);
        console.log('Video source:', video.currentSrc);
        // 在视频加载失败时添加备用背景
        document.body.style.background = 'linear-gradient(45deg, #1a1a1a, #2a2a2a)';
    });

    // 视频加载状态监控
    video.addEventListener('loadedmetadata', function() {
        console.log('Video metadata loaded');
    });

    video.addEventListener('canplay', function() {
        console.log('Video can play');
        video.style.display = 'block';
    });

    // 尝试播放视频
    function attemptPlay() {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video playback started');
            }).catch(error => {
                console.log('Video autoplay prevented:', error);
                // 添加点击事件来开始播放
                document.body.addEventListener('click', function() {
                    video.play();
                }, { once: true });
            });
        }
    }

    // 如果视频已经加载完成，尝试播放
    if (video.readyState >= 2) {
        attemptPlay();
    } else {
        // 等待视频加载完成后播放
        video.addEventListener('loadeddata', attemptPlay);
    }
});

// 处理安卓软件链接点击
function showVerificationCode(event) {
    setTimeout(() => {
        alert('验证码：qNUn');
    }, 100);
}

// 处理售后客服点击
function showCustomerService(event) {
    event.preventDefault();
    const message = 
        "╭━━━━━━━━━━ KK软件售后 ━━━━━━━━━━╮\n\n" +
        "     📱 手机：13487616320\n" +
        "     💬 微信：yyk5201314\n" +
        "     🐧 QQ：3115912121\n\n" +
        "     ⏰ 工作时间：9:00-22:00\n\n" +
        "     📝 请备注：软件售后\n\n" +
        "╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯";
    alert(message);
}

// 背景音乐控制
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    let isPlaying = false;

    // 尝试自动播放
    function attemptAutoplay() {
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                console.log('Music autoplay started');
            }).catch(error => {
                console.log('Music autoplay prevented:', error);
                // 添加点击事件来开始播放
                document.body.addEventListener('click', function() {
                    if (!isPlaying) {
                        bgMusic.play();
                        isPlaying = true;
                        musicBtn.classList.add('playing');
                    }
                }, { once: true });
            });
        }
    }

    // 音乐控制按钮点击事件
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // 页面加载完成后尝试自动播放
    attemptAutoplay();
}); 