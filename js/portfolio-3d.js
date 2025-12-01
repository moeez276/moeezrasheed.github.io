// ===== ADVANCED 3D PORTFOLIO JAVASCRIPT =====

class Portfolio3D {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.trails = [];
        this.init();
    }

    init() {
        this.setupParticles();
        this.setupCursor();
        this.setupScrollAnimations();
        this.setupTypewriter();
        this.setupTimeline();
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupIntersectionObserver();
    }

    // Advanced Particle System
    setupParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create particles
        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 3 + 1,
                life: Math.random() * 100 + 100,
                maxLife: Math.random() * 100 + 100,
                color: `hsl(${180 + Math.random() * 60}, 100%, ${50 + Math.random() * 30}%)`
            });
        }

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.particles.forEach((particle, index) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life--;

                // Boundary collision
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Mouse interaction
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    particle.vx += dx * 0.0001;
                    particle.vy += dy * 0.0001;
                }

                // Draw particle
                const alpha = particle.life / particle.maxLife;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color.replace('hsl', 'hsla').replace(')', `, ${alpha})`);
                ctx.fill();

                // Create connections
                this.particles.slice(index + 1).forEach(otherParticle => {
                    const dist = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) +
                        Math.pow(particle.y - otherParticle.y, 2)
                    );

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(0, 245, 255, ${0.3 - dist / 400})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });

                // Respawn particle
                if (particle.life <= 0) {
                    particle.x = Math.random() * canvas.width;
                    particle.y = Math.random() * canvas.height;
                    particle.life = particle.maxLife;
                    particle.vx = (Math.random() - 0.5) * 0.8;
                    particle.vy = (Math.random() - 0.5) * 0.8;
                }
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Enhanced Cursor System
    setupCursor() {
        const cursor = document.querySelector('.cursor');
        if (!cursor) return;

        // Create multiple trails
        for (let i = 0; i < 15; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.zIndex = 9999 - i;
            document.body.appendChild(trail);
            this.trails.push({
                element: trail,
                x: 0,
                y: 0,
                delay: i * 20
            });
        }

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Animate trails
            this.trails.forEach((trail, index) => {
                setTimeout(() => {
                    trail.element.style.left = e.clientX + 'px';
                    trail.element.style.top = e.clientY + 'px';
                    trail.element.style.opacity = 1 - (index * 0.06);
                    trail.element.style.transform = `scale(${1 - index * 0.05})`;
                }, trail.delay);
            });
        });

        // Enhanced cursor interactions
        document.querySelectorAll('a, button, .project-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(139, 92, 246, 0.8)';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--neon-cyan)';
            });
        });
    }

    // Advanced Typewriter Effect
    setupTypewriter() {
        const element = document.getElementById('typing-animation-3d');
        if (!element) return;

        const texts = [
            'Data Analyst',
            'Power BI Specialist', 
            'Data Visualizer',
            'Business Intelligence Expert',
            'Python Developer'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isPaused) {
                setTimeout(type, 2000);
                isPaused = false;
                return;
            }

            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(type, 500);
                    return;
                }
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentText.length) {
                    isDeleting = true;
                    isPaused = true;
                }
            }

            setTimeout(type, isDeleting ? 100 : 200);
        };

        setTimeout(type, 1000);
    }

    // Interactive Timeline
    setupTimeline() {
        const timelineData = [
            {
                date: '2024-July',
                title: 'Exploratory Data Analysis',
                company: 'CodexCue Software Solutions',
                location: 'Pakistan',
                description: 'Conducted data cleaning and preprocessing, performed exploratory data analysis, and utilized data visualization techniques.',
                icon: '📊'
            },
            {
                date: '2024-August',
                title: 'Data Analytics',
                company: 'Oasis Infobyte',
                location: 'India',
                description: 'Performed dataset collection and organization, ensured data integrity, and conducted outlier detection and analysis.',
                icon: '🔍'
            },
            {
                date: '2024-August',
                title: 'Data Science',
                company: 'Prodigy InfoTech',
                location: 'India',
                description: 'Utilized machine learning models and statistical techniques, delivered clear data visualizations and reports.',
                icon: '🤖'
            },
            {
                date: '2024-September',
                title: 'Google AI Essentials',
                company: 'Coursera',
                location: 'Worldwide',
                description: 'Learned fundamental AI concepts, gained hands-on experience with Google tools, and developed AI solution skills.',
                icon: '🎓'
            },
            {
                date: '2023-2027',
                title: 'Bachelor of Data Analytics',
                company: 'Government College University Faisalabad',
                location: 'Pakistan',
                description: 'Currently pursuing degree with first class distinction.',
                icon: '🎓'
            }
        ];

        const timelineContainer = document.querySelector('.about-timeline');
        if (!timelineContainer) return;

        timelineContainer.innerHTML = `
            <div class="timeline-3d">
                ${timelineData.map((item, index) => `
                    <div class="timeline-item" data-index="${index}">
                        <div class="timeline-dot">${item.icon}</div>
                        <div class="timeline-content">
                            <div class="timeline-date">${item.date}</div>
                            <h3 class="timeline-title">${item.title}</h3>
                            <div class="timeline-company">${item.company}</div>
                            <div class="timeline-location">${item.location}</div>
                            <p class="timeline-description">${item.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Animate timeline items on scroll
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observeTimeline = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => observeTimeline.observe(item));
    }

    // Advanced Scroll Animations
    setupScrollAnimations() {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Hero animations
            gsap.timeline()
                .from('.hero-avatar', { scale: 0, rotation: 360, duration: 1.5, ease: 'back.out(1.7)' })
                .from('.hero-greeting', { y: 50, opacity: 0, duration: 0.8 }, '-=0.5')
                .from('.hero-name', { y: 50, opacity: 0, duration: 0.8 }, '-=0.3')
                .from('.hero-subtitle', { y: 50, opacity: 0, duration: 0.8 }, '-=0.3')
                .from('.hero-buttons', { y: 50, opacity: 0, duration: 0.8 }, '-=0.3');

            // Skills cube animation
            gsap.fromTo('.skills-cube', 
                { rotationX: 0, rotationY: 0 },
                { 
                    rotationX: 360, 
                    rotationY: 360, 
                    duration: 20, 
                    repeat: -1, 
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.skills-cube-container',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                }
            );

            // Project cards stagger animation
            gsap.fromTo('.project-card', 
                { y: 100, opacity: 0, rotationY: -15 },
                { 
                    y: 0, 
                    opacity: 1, 
                    rotationY: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.projects-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    }

    // Theme Toggle Enhancement
    setupThemeToggle() {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;

        let isDark = true;

        toggle.addEventListener('click', () => {
            const root = document.documentElement;
            
            if (isDark) {
                root.style.setProperty('--primary-bg', '#f8fafc');
                root.style.setProperty('--secondary-bg', '#e2e8f0');
                root.style.setProperty('--accent-bg', '#cbd5e1');
                root.style.setProperty('--text-primary', '#1e293b');
                root.style.setProperty('--text-secondary', '#475569');
                toggle.classList.add('light');
            } else {
                root.style.setProperty('--primary-bg', '#0a0a0a');
                root.style.setProperty('--secondary-bg', '#111827');
                root.style.setProperty('--accent-bg', '#1f2937');
                root.style.setProperty('--text-primary', '#f8fafc');
                root.style.setProperty('--text-secondary', '#94a3b8');
                toggle.classList.remove('light');
            }
            
            isDark = !isDark;

            // Animate theme change
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    // Enhanced Mobile Menu
    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navbarNav = document.getElementById('navbarNav');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const mobileNavLinks = document.querySelectorAll('.nav-link-3d');
        
        if (!mobileToggle || !navbarNav) return;
        
        const toggleMobileMenu = () => {
            const isActive = navbarNav.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        };
        
        const openMobileMenu = () => {
            navbarNav.classList.add('active');
            if (mobileOverlay) mobileOverlay.classList.add('active');
            document.body.classList.add('mobile-menu-open');
            mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
        };
        
        const closeMobileMenu = () => {
            navbarNav.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        };
        
        // Mobile toggle click handler
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close menu when clicking overlay
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', closeMobileMenu);
        }
        
        // Close menu when clicking nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
                
                // Smooth scroll to target section
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
                
                // Update active link
                mobileNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbarNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navbarNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Smooth Scroll Enhancement
    setupSmoothScroll() {
        document.querySelectorAll('.nav-link-3d').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Update active link
                document.querySelectorAll('.nav-link-3d').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Enhanced Intersection Observer
    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link-3d');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });

                    // Add animation classes
                    entry.target.classList.add('in-view');
                }
            });
        }, { 
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.1
        });

        sections.forEach(section => observer.observe(section));

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar-3d');
        const navObserver = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { rootMargin: '-100px 0px 0px 0px' });

        const hero = document.querySelector('#home');
        if (hero) navObserver.observe(hero);
    }

    // Add particle effect on click
    addClickEffect(x, y) {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-trail';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = `hsl(${180 + Math.random() * 60}, 100%, 60%)`;
            particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }

    // Matrix rain effect
    createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-bg';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");

        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F3';
            ctx.font = fontSize + 'px arial';

            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(drawMatrix, 35);
    }
}

// Enhanced Loading Screen
class LoadingScreen {
    constructor() {
        this.progress = 0;
        this.init();
    }

    init() {
        this.createLoadingScreen();
        this.simulateLoading();
    }

    createLoadingScreen() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.innerHTML = `
                <div class="preloader-content">
                    <div class="loading-logo"></div>
                    <div class="loading-text">Loading Moeez's Portfolio...</div>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                    <div class="loading-percentage">0%</div>
                </div>
            `;
        }
    }

    simulateLoading() {
        const progressBar = document.querySelector('.loading-progress');
        const percentageText = document.querySelector('.loading-percentage');
        
        const interval = setInterval(() => {
            this.progress += Math.random() * 15 + 5;
            
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    this.hidePreloader();
                }, 500);
            }
            
            if (progressBar) progressBar.style.width = this.progress + '%';
            if (percentageText) percentageText.textContent = Math.round(this.progress) + '%';
        }, 200);
    }

    hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    new LoadingScreen();
    
    // Initialize main portfolio after loading
    setTimeout(() => {
        new Portfolio3D();
    }, 1000);

    // Add click effect listeners
    document.addEventListener('click', (e) => {
        const portfolio = new Portfolio3D();
        portfolio.addClickEffect(e.clientX, e.clientY);
    });

    // Initialize current year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        const activeLink = document.querySelector('.nav-link-3d.active');
        const allLinks = Array.from(document.querySelectorAll('.nav-link-3d'));
        const currentIndex = allLinks.indexOf(activeLink);

        if (e.key === 'ArrowDown' && currentIndex < allLinks.length - 1) {
            e.preventDefault();
            allLinks[currentIndex + 1].click();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            allLinks[currentIndex - 1].click();
        }
    });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when tab becomes visible
        document.body.classList.remove('paused');
    }
});

// Performance monitoring
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
            console.log(`${entry.name}: ${entry.duration}ms`);
        }
    }
});

observer.observe({ entryTypes: ['measure'] });

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio3D, LoadingScreen };
}
