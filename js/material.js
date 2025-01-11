// 显示更多素材网站函数（移到全局作用域）
function showMoreSites() {
    const sites = [
        {
            name: "爱给网",
            url: "https://www.aigei.com/",
            description: "免费设计素材资源"
        },
        {
            name: "千图网",
            url: "https://www.58pic.com/",
            description: "免费设计图片素材"
        },
        {
            name: "包图网",
            url: "https://ibaotu.com/",
            description: "设计素材网站"
        },
        {
            name: "摄图网",
            url: "https://699pic.com/",
            description: "正版高清图片免费下载"
        },
        {
            name: "Pixabay",
            url: "https://pixabay.com/",
            description: "免费正版高清图片素材库"
        }
    ];

    // 创建一个模态框来显示网站列表
    const modal = document.createElement('div');
    modal.className = 'sites-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>推荐素材网站</h2>
            <div class="sites-list">
                ${sites.map(site => `
                    <div class="site-item">
                        <h3>${site.name}</h3>
                        <p>${site.description}</p>
                        <a href="${site.url}" target="_blank" rel="noopener noreferrer">访问网站</a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .sites-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }

        .close-btn {
            float: right;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }

        .sites-list {
            margin-top: 1.5rem;
            display: grid;
            gap: 1rem;
        }

        .site-item {
            padding: 1rem;
            border: 1px solid #eee;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .site-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .site-item h3 {
            margin-bottom: 0.5rem;
            color: #333;
        }

        .site-item p {
            color: #666;
            margin-bottom: 0.8rem;
            font-size: 0.9rem;
        }

        .site-item a {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: #1a1a1a;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background 0.3s;
        }

        .site-item a:hover {
            background: #333;
        }

        @media (max-width: 768px) {
            .modal-content {
                padding: 1.5rem;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // 关闭模态框
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };

    // 点击模态框外部关闭
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // 处理导航切换
    const navLinks = document.querySelectorAll('header nav a');
    const gallery = document.querySelector('.gallery');
    const materialItems = document.querySelectorAll('.material-item');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const type = link.getAttribute('href').replace('#', '');
            filterMaterials(type);
        });
    });

    function filterMaterials(type) {
        materialItems.forEach(item => {
            if (type === '' || item.dataset.type === type) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // 处理搜索
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        materialItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 处理下载按钮
    const downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.url;
            const filename = url.split('/').pop();
            
            // 创建一个临时的a标签来触发下载
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });

    // 处理视频播放
    const videos = document.querySelectorAll('.material-item[data-type="video"] video');
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const video = videos[index];
            if (video.paused) {
                video.play();
                button.textContent = '暂停';
            } else {
                video.pause();
                button.textContent = '播放';
            }
        });
    });

    // 处理排序
    const sortSelect = document.querySelector('.filters select');
    
    sortSelect.addEventListener('change', () => {
        const items = Array.from(materialItems);
        const sortValue = sortSelect.value;

        items.sort((a, b) => {
            if (sortValue === 'latest') {
                // 这里可以根据实际数据添加日期比较逻辑
                return 0;
            } else if (sortValue === 'popular') {
                // 这里可以根据实际数据添加人气比较逻辑
                return 0;
            } else if (sortValue === 'downloads') {
                // 这里可以根据实际数据添加下载量比较逻辑
                return 0;
            }
        });

        // 重新插入排序后的元素
        items.forEach(item => gallery.appendChild(item));
    });

    // 处理分页
    const prevButton = document.querySelector('.pagination .prev');
    const nextButton = document.querySelector('.pagination .next');
    const currentPage = document.querySelector('.pagination .current');
    let page = 1;

    prevButton.addEventListener('click', () => {
        if (page > 1) {
            page--;
            currentPage.textContent = page;
            // 这里可以添加加载上一页数据的逻辑
        }
    });

    nextButton.addEventListener('click', () => {
        page++;
        currentPage.textContent = page;
        // 这里可以添加加载下一页数据的逻辑
    });
}); 