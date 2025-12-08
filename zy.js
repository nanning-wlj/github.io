
// 移动端菜单切换
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 滚动时显示/隐藏返回顶部按钮
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // 滚动时更新导航栏样式
    const header = document.getElementById('header');
    if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// 点击导航链接时关闭移动菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('navLinks').classList.remove('active');
        const menuBtnIcon = document.getElementById('mobileMenuBtn').querySelector('i');
        menuBtnIcon.classList.remove('fa-times');
        menuBtnIcon.classList.add('fa-bars');
    });
});

// 技能进度条动画函数
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        // 确保进度条从0开始
        bar.style.width = '0%';
        // 延迟一小段时间开始动画，确保DOM已更新
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width + '%';
        }, 50);
    });
}

// 当技能区域进入视口时触发动画
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            // 动画触发后停止观察，避免重复触发
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 联系表单提交
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // 简单验证
    if (!name || !email || !message) {
        alert('请填写所有字段！');
        return;
    }
    
    // 模拟发送消息
    alert('感谢您的留言，' + name + '！我会尽快回复您。');
    this.reset();
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    const lightThemeBtn = document.getElementById('lightThemeBtn');
    const pinkThemeBtn = document.getElementById('pinkThemeBtn');
    const body = document.body;
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // 应用保存的主题
    if (savedTheme === 'pink') {
        body.classList.add('pink-theme');
        lightThemeBtn.classList.remove('active');
        pinkThemeBtn.classList.add('active');
    } else {
        body.classList.remove('pink-theme');
        lightThemeBtn.classList.add('active');
        pinkThemeBtn.classList.remove('active');
    }
    
    // 浅色主题按钮点击事件
    lightThemeBtn.addEventListener('click', function() {
        body.classList.remove('pink-theme');
        lightThemeBtn.classList.add('active');
        pinkThemeBtn.classList.remove('active');
        localStorage.setItem('theme', 'light');
    });
    
    // 粉色主题按钮点击事件
    pinkThemeBtn.addEventListener('click', function() {
        body.classList.add('pink-theme');
        lightThemeBtn.classList.remove('active');
        pinkThemeBtn.classList.add('active');
        localStorage.setItem('theme', 'pink');
    });
    
    // 初始化技能进度条观察器
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // 项目卡片交互效果
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 统计数字动画效果
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + (element.textContent.includes('+') ? '+' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // 当统计区域进入视口时触发数字动画
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    // 提取数字部分
                    const match = text.match(/(\d+)/);
                    if (match) {
                        const value = parseInt(match[1]);
                        animateCounter(stat, 0, value, 1500);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        statsObserver.observe(heroSection);
    }
    
    // 社交链接点击提示
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('title');
            alert(`即将跳转到${platform}页面（演示功能）`);
        });
    });
    
    // 标签悬停效果
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 联系图标悬停效果
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'rotate(15deg) scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // 排除返回顶部按钮的特殊处理
            if (this.classList.contains('back-to-top')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 返回顶部按钮点击事件
    document.getElementById('backToTop').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 检查页面加载时技能区域是否已经在视口中
    // 如果是，立即触发技能进度条动画
    function checkSkillsOnLoad() {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const rect = skillsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // 检查技能区域是否在视口中（至少20%可见）
            const visible = (rect.top <= windowHeight * 0.8 && rect.bottom >= windowHeight * 0.2);
            
            if (visible) {
                animateSkillBars();
                // 停止观察，避免重复触发
                if (skillsSection) {
                    observer.unobserve(skillsSection);
                }
            }
        }
    }
    
    // 页面加载后检查技能区域
    setTimeout(checkSkillsOnLoad, 100);
});

// 确保进度条动画在页面刷新时也能工作
window.addEventListener('load', function() {
    // 再次检查技能区域，确保动画正常工作
    setTimeout(function() {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const rect = skillsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // 检查技能区域是否在视口中
            const visible = (rect.top <= windowHeight && rect.bottom >= 0);
            
            if (visible) {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (bar.style.width === '0%' || !bar.style.width) {
                        setTimeout(() => {
                            bar.style.transition = 'width 1.5s ease-in-out';
                            bar.style.width = width + '%';
                        }, 100);
                    }
                });
            }
        }
    }, 500);
});