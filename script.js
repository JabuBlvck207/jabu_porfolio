// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        mirror: false
    });

    // Initialize Typed.js
    const typed = new Typed('#typed-text', {
        strings: [
            'Business Analyst',
            'System Analyst',
            'Database Administrator',
            'IT Project Manager'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#2ecc71'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#2ecc71',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggle.querySelector('i').classList.toggle('fa-sun');
        themeToggle.querySelector('i').classList.toggle('fa-moon');
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
            menuBtn.classList.remove('active');
            navbar.classList.remove('active');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        // Only add/remove scrolled class for background color change
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    });

    // Skills Animation
    const skillBars = document.querySelectorAll('.progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.parentElement.previousElementSibling.querySelector('span:last-child').textContent;
            bar.style.width = width;
        });
    };

    // Intersection Observer for Skills
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const subject = contactForm.querySelector('input[name="subject"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            // Create email content
            const emailBody = `Dear Jabulane,

${message}

Best Regards,
${name}

Contact Information:
Email: ${email}
`;
            
            // Create modal for email client selection
            const modalHtml = `
                <div class="email-choice-modal">
                    <div class="modal-content">
                        <h3>Choose Email Client</h3>
                        <div class="email-buttons">
                            <button class="btn gmail-btn">
                                <i class="fab fa-google"></i>
                                Gmail
                            </button>
                            <button class="btn outlook-btn">
                                <i class="fas fa-envelope"></i>
                                Outlook
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal styles
            const modalStyle = document.createElement('style');
            modalStyle.textContent = `
                .email-choice-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .email-choice-modal .modal-content {
                    background: var(--card-bg);
                    padding: 2rem;
                    border-radius: 10px;
                    text-align: center;
                    animation: modalSlideIn 0.3s ease-out;
                }
                
                .email-choice-modal h3 {
                    color: var(--text-color);
                    margin-bottom: 2rem;
                    font-size: 2rem;
                }
                
                .email-buttons {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }
                
                .email-buttons .btn {
                    padding: 1rem 2rem;
                    font-size: 1.6rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                
                .email-buttons .btn:hover {
                    transform: translateY(-3px);
                }
                
                .gmail-btn {
                    background: #ea4335;
                    color: white;
                }
                
                .outlook-btn {
                    background: #0078d4;
                    color: white;
                }
                
                @keyframes modalSlideIn {
                    from {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            
            document.head.appendChild(modalStyle);
            
            // Add modal to DOM
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = modalHtml;
            document.body.appendChild(modalContainer);
            
            // Handle email client selection
            const gmailBtn = modalContainer.querySelector('.gmail-btn');
            const outlookBtn = modalContainer.querySelector('.outlook-btn');
            
            gmailBtn.addEventListener('click', () => {
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mambajabulane22@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
                window.open(gmailUrl, '_blank');
                modalContainer.remove();
                showSuccessMessage();
            });
            
            outlookBtn.addEventListener('click', () => {
                const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=mambajabulane22@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
                window.open(outlookUrl, '_blank');
                modalContainer.remove();
                showSuccessMessage();
            });
            
            // Close modal when clicking outside
            modalContainer.addEventListener('click', (e) => {
                if (e.target === modalContainer.firstElementChild) {
                    modalContainer.remove();
                }
            });
            
            // Reset form
            contactForm.reset();
        });
    }

    // Show success message function
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, var(--accent-red), var(--accent-blue));
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            font-size: 1.6rem;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        successMessage.textContent = 'Message form cleared. Please complete sending your email.';
        document.body.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => successMessage.remove(), 300);
        }, 5000);
    }

    // Add animations for messages
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Hide Loader
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Custom Cursor Animation
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform += ' scale(0.8)';
        cursorDot.style.transform += ' scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '');
        cursorDot.style.transform = cursorDot.style.transform.replace(' scale(0.8)', '');
    });

    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, .nav-links a');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursorDot.style.transform += ' scale(1.5)';
            cursor.style.border = '2px solid var(--primary-color)';
            cursorDot.style.backgroundColor = 'transparent';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursorDot.style.transform = cursorDot.style.transform.replace(' scale(1.5)', '');
            cursor.style.border = '2px solid var(--primary-color)';
            cursorDot.style.backgroundColor = 'var(--primary-color)';
        });
    });

    // Email Dropdown Functionality
    const emailDropdowns = document.querySelectorAll('.email-dropdown');
    
    emailDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.email-trigger');
        const options = dropdown.querySelector('.email-options');
        const socialLinks = dropdown.closest('.social-links');
        
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            options.classList.toggle('show');
            
            // Toggle visibility of other social links
            if (socialLinks) {
                socialLinks.classList.toggle('options-visible');
            }
            
            // Close other dropdowns
            emailDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector('.email-options').classList.remove('show');
                    const otherSocialLinks = otherDropdown.closest('.social-links');
                    if (otherSocialLinks) {
                        otherSocialLinks.classList.remove('options-visible');
                    }
                }
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.email-dropdown')) {
            document.querySelectorAll('.email-options').forEach(options => {
                options.classList.remove('show');
            });
            document.querySelectorAll('.social-links').forEach(links => {
                links.classList.remove('options-visible');
            });
        }
    });

    // Scroll Indicator Functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });

        // Hide scroll indicator when scrolled past first section
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight / 2) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // Document Access Functionality
    let currentDocument = '';
    const PIN = '529533';

    window.handleDocumentAccess = function(documentType) {
        currentDocument = documentType;
        const modal = document.getElementById('pinModal');
        modal.style.display = 'block';
    }

    window.requestPin = function() {
        const subject = 'Request for Document Access PIN';
        const body = `Hello,\n\nI would like to request the PIN to access the ${currentDocument} document.\n\nThank you.`;
        
        // Create both Gmail and Outlook mailto links
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=mambajabulane22@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const outlookLink = `https://outlook.live.com/mail/0/deeplink/compose?to=mambajabulane22@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Create a modal for email client selection
        const emailModal = document.createElement('div');
        emailModal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--card-bg);
            padding: 20px;
            border-radius: 10px;
            z-index: 1001;
            text-align: center;
            border: 1px solid var(--border-color);
        `;
        
        emailModal.innerHTML = `
            <h3 style="margin-bottom: 20px; color: var(--text-color);">Choose your email client</h3>
            <button onclick="window.open('${gmailLink}', '_blank')" style="margin: 10px; padding: 10px 20px; cursor: pointer; background: linear-gradient(45deg, var(--accent-red), var(--accent-blue)); color: white; border: none; border-radius: 5px;">Gmail</button>
            <button onclick="window.open('${outlookLink}', '_blank')" style="margin: 10px; padding: 10px 20px; cursor: pointer; background: linear-gradient(45deg, var(--accent-red), var(--accent-blue)); color: white; border: none; border-radius: 5px;">Outlook</button>
            <button onclick="this.parentElement.remove()" style="margin: 10px; padding: 10px 20px; cursor: pointer; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); border-radius: 5px;">Cancel</button>
        `;
        
        document.body.appendChild(emailModal);
    }

    window.verifyPin = function() {
        const pinInput = document.getElementById('pinInput');
        const modal = document.getElementById('pinModal');
        
        if (pinInput.value === PIN) {
            modal.style.display = 'none';
            pinInput.value = '';
            
            // Open the corresponding PDF based on document type
            if (currentDocument === 'matric') {
                window.open('education/matric.pdf', '_blank');
            } else if (currentDocument === 'tut') {
                window.open('education/transcript.pdf', '_blank');
            }
        } else {
            alert('Incorrect PIN. Please try again or request the PIN.');
            pinInput.value = '';
        }
    }

    // Close modal when clicking the close button or outside the modal
    const modal = document.getElementById('pinModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.getElementById('pinInput').value = '';
        });
    }

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.getElementById('pinInput').value = '';
        }
    }

    // Handle Enter key press in PIN input
    const pinInput = document.getElementById('pinInput');
    if (pinInput) {
        pinInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.verifyPin();
            }
        });
    }
}); 