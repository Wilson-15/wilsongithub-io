document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Dropdown menu toggle for mobile
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.finance-carousel');
    if (carousel) {
        const slides = document.querySelectorAll('.carousel-slide');
        const dotsContainer = document.querySelector('.carousel-dots');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        let currentIndex = 0;
        let isAnimating = false;
        const slideInterval = 6000;
        let intervalId;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => !isAnimating && goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.carousel-dot');
        
        // Start autoplay
        startAutoplay();
        
        // Navigation functions
        function goToSlide(index) {
            if (isAnimating) return;
            isAnimating = true;
            
            const nextIndex = (index + slides.length) % slides.length;
            
            // Hide current slide
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            
            // Show next slide
            slides[nextIndex].classList.add('active');
            dots[nextIndex].classList.add('active');
            
            currentIndex = nextIndex;
            
            // Reset animation flag after transition
            setTimeout(() => {
                isAnimating = false;
            }, 1000);
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
            resetAutoplay();
        }
        
        function prevSlide() {
            goToSlide(currentIndex - 1);
            resetAutoplay();
        }
        
        // Autoplay functions
        function startAutoplay() {
            intervalId = setInterval(nextSlide, slideInterval);
        }
        
        function resetAutoplay() {
            clearInterval(intervalId);
            startAutoplay();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });
        
        carousel.addEventListener('mouseleave', () => {
            resetAutoplay();
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections with content
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
    
    // Header effect on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Header fade on scroll
    const header = document.querySelector('.fade-nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('nav-hide')) {
            // Scroll down
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled')) {
            // Scroll up
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});



// Chatbot functionality
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotButton = document.querySelector('.chatbot-button');
const closeChatbot = document.querySelector('.close-chatbot');
const sendButton = document.querySelector('.send-button');
const chatInput = document.querySelector('.chatbot-input input');
const chatMessages = document.querySelector('.chatbot-messages');

if (chatbotButton) {
  chatbotButton.addEventListener('click', function() {
    chatbotContainer.classList.toggle('active');
  });
}

if (closeChatbot) {
  closeChatbot.addEventListener('click', function() {
    chatbotContainer.classList.remove('active');
  });
}

function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    addMessageToChat(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      addMessageToChat(botResponse, 'bot');
    }, 1000);
  }
}

if (sendButton && chatInput) {
  sendButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

function addMessageToChat(message, sender) {
  const messagesContainer = document.querySelector('.chatbot-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add(`${sender}-message`);
  
  messageElement.innerHTML = `
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
  // Simple response logic - in a real app you'd connect to an API
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('regulation') || lowerMessage.includes('compliance')) {
    return "You can find all regulatory documents in our Regulations section. Would you like me to direct you there?";
  } else if (lowerMessage.includes('license') || lowerMessage.includes('permit')) {
    return "Licensing requirements for banking institutions are available in our Licensing section.";
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('help')) {
    return "Our contact information is available in the Contact section. You can reach us at info@bfrp.gov.bw or +267 123 4567.";
  } else {
    return "I'm Mpotse, your Botswana Financial Regulatory Assistant. I can help with questions about regulations, licensing, and compliance. Please ask me something more specific!";
  }
}



// Chatbot
document.querySelectorAll('.chat-toggle').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.chatbot-container').classList.add('active');
  });
});




// Sector Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.sector-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Scroll to section
            document.getElementById(tabId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Set first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
    
    // Scroll animations for license cards
    const licenseCards = document.querySelectorAll('.license-card');
    const animateCards = function() {
        licenseCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardPosition < windowHeight - 100) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    // Set initial state
    licenseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', animateCards);
    window.addEventListener('scroll', animateCards);
});





//regulations
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabSections = document.querySelectorAll('.regulations-section');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding section
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Set first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
    
    // Filter functionality
    const setupFilter = (filterId, gridClass) => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', function() {
                const value = this.value.toLowerCase();
                const cards = document.querySelectorAll(`.${gridClass} .regulation-card`);
                
                cards.forEach(card => {
                    const cardType = card.querySelector('.doc-type').textContent.toLowerCase();
                    if (value === '' || cardType.includes(value)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    };
    
    setupFilter('banking-filter', 'regulations-grid');
    setupFilter('nonbanking-filter', 'regulations-grid');
    
    // Search functionality
    const setupSearch = (inputSelector, gridClass) => {
        const input = document.querySelector(inputSelector);
        if (input) {
            input.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const cards = document.querySelectorAll(`.${gridClass} .regulation-card`);
                
                cards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const desc = card.querySelector('.regulation-desc').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    };
    
    setupSearch('.regulations-filter .search-box input', 'regulations-grid');
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.regulation-card, .update-card');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    // Set initial state
    document.querySelectorAll('.regulation-card, .update-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});


//resources
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
        });
    });

    // Calendar Navigation
    const monthDisplay = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const calendarGrid = document.querySelector('.calendar-grid');
    
    let currentDate = new Date();
    
    function renderCalendar() {
        // Clear existing calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Set month display
        const options = { year: 'numeric', month: 'long' };
        monthDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
        
        // Get first day of month and total days
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        
        // Add empty cells for days before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'calendar-day-number';
            dayNumber.textContent = i;
            dayCell.appendChild(dayNumber);
            
            // Add event indicators (simplified - in real app would check actual events)
            if (Math.random() > 0.7) {
                const eventDot = document.createElement('div');
                eventDot.className = 'calendar-event-dot';
                dayCell.appendChild(eventDot);
            }
            
            calendarGrid.appendChild(dayCell);
        }
    }
    
    // Initialize calendar
    renderCalendar();
    
    // Month navigation
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Resource search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const resources = document.querySelectorAll('.resource-list a, .tool-card, .category-card');
        
        resources.forEach(resource => {
            const text = resource.textContent.toLowerCase();
            const parentCard = resource.closest('.tool-card, .category-card');
            
            if (text.includes(searchTerm)) {
                if (parentCard) {
                    parentCard.style.display = 'block';
                } else {
                    resource.style.display = 'flex';
                }
            } else {
                if (parentCard) {
                    parentCard.style.display = 'none';
                } else {
                    resource.style.display = 'none';
                }
            }
        });
    });

    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.tool-card, .category-card, .faq-item');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    // Set initial state
    document.querySelectorAll('.tool-card, .category-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});




