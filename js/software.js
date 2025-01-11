document.addEventListener('DOMContentLoaded', () => {
    const softwareItems = document.querySelectorAll('.software-item');
    
    // 处理教程按钮点击
    const tutorialButtons = document.querySelectorAll('.tutorial-btn');
    tutorialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const softwareName = button.closest('.software-item').querySelector('h3').textContent;
            alert(`${softwareName} 的教程正在准备中，敬请期待！`);
        });
    });

    // 添加动画效果
    softwareItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // 更新在线人数
    const counterNumber = document.querySelector('.counter-number');
    if (counterNumber) {
        setInterval(() => {
            const randomUsers = Math.floor(Math.random() * 100) + 1;
            counterNumber.classList.add('updating');
            counterNumber.textContent = randomUsers;
            setTimeout(() => {
                counterNumber.classList.remove('updating');
            }, 500);
        }, 5000);
    }
}); 