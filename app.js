document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Core State & Data
    // -------------------------------------------------------------
    
    // Skills Database
    const skillsData = [
        { name: "Python", category: "programming", level: 90 },
        { name: "C", category: "programming", level: 85 },
        { name: "C++", category: "programming", level: 80 },
        { name: "Java (Basics)", category: "programming", level: 70 },
        { name: "HTML", category: "web", level: 95 },
        { name: "CSS", category: "web", level: 90 },
        { name: "JavaScript", category: "web", level: 85 },
        { name: "Pandas", category: "tools", level: 85 },
        { name: "Numpy", category: "tools", level: 80 },
        { name: "Matplotlib", category: "tools", level: 80 },
        { name: "MySQL", category: "db", level: 85 },
        { name: "Windows", category: "os", level: 90 },
        { name: "Android", category: "os", level: 85 }
    ];

    // Helpdesk Simulator State
    let tickets = [
        { id: 101, title: "Database connection timed out", priority: "high", status: "open", time: "10 mins ago" },
        { id: 102, title: "Firebase token refresh failure", priority: "high", status: "pending", time: "25 mins ago" },
        { id: 103, title: "IT helpdesk dashboard style overlap", priority: "medium", status: "open", time: "1 hr ago" },
        { id: 104, title: "Slow response queries in MySQL", priority: "medium", status: "pending", time: "2 hrs ago" },
        { id: 105, title: "Clean logs and update API keys", priority: "low", status: "resolved", time: "1 day ago" },
        { id: 106, title: "Create recovery backups for JNTUGV", priority: "low", status: "resolved", time: "2 days ago" }
    ];

    // Typist Text Configuration
    const typeWords = [
        "Data Science Student.",
        "Web Developer.",
        "Problem Solver.",
        "Python Enthusiast."
    ];

    // -------------------------------------------------------------
    // 2. Navigation & Theme Configuration
    // -------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksList = document.getElementById('navLinks');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const header = document.getElementById('header');

    // Mobile Navigation Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinksList.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinksList.classList.contains('open')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksList.classList.remove('open');
            mobileMenuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // Theme Toggle Handler
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
        showToast(`Theme switched to ${newTheme} mode!`, 'success');
    });

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Highlighting Active Navigation Section
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // -------------------------------------------------------------
    // 3. Hero Typer Logic
    // -------------------------------------------------------------
    const typedTextSpan = document.getElementById('typedText');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = typeWords[wordIndex];
        if (isDeleting) {
            charIndex--;
            typingSpeed = 50;
        } else {
            charIndex++;
            typingSpeed = 120;
        }

        typedTextSpan.textContent = currentWord.substring(0, charIndex);

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1800; // Delay before starting to delete
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typeWords.length;
            typingSpeed = 500; // Delay before starting to type next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // -------------------------------------------------------------
    // 4. Skills Processing & Intersection Animations
    // -------------------------------------------------------------
    const skillsGrid = document.getElementById('skillsGrid');
    const skillFilters = document.querySelectorAll('.skills-filter .filter-btn');

    function renderSkills(filterType = 'all') {
        skillsGrid.innerHTML = '';
        const filtered = filterType === 'all' 
            ? skillsData 
            : skillsData.filter(s => s.category === filterType);

        filtered.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card glass-card';
            card.setAttribute('data-category', skill.category);
            
            card.innerHTML = `
                <div class="skill-info">
                    <span class="skill-name">${skill.name}</span>
                </div>
            `;
            skillsGrid.appendChild(card);
        });

        // Trigger animations for current view
        setTimeout(animateSkills, 50);
    }

    function animateSkills() {
        const progressBars = document.querySelectorAll('.skill-bar-inner');
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-target-width');
            bar.style.width = targetWidth;
        });
    }

    // Filter Skills Click Handler
    skillFilters.forEach(btn => {
        btn.addEventListener('click', (e) => {
            skillFilters.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderSkills(e.target.getAttribute('data-filter'));
        });
    });

    renderSkills(); // Initial Load

    // Intersection Observer for Skills Animate Trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(skillsGrid);

    // -------------------------------------------------------------
    // 5. IT Helpdesk Dashboard Simulation Logic
    // -------------------------------------------------------------
    const simOpenCount = document.getElementById('simOpenCount');
    const simPendingCount = document.getElementById('simPendingCount');
    const simResolvedCount = document.getElementById('simResolvedCount');
    const simTicketsList = document.getElementById('simTicketsList');
    const simAddTicketBtn = document.getElementById('simAddTicketBtn');
    const simFilterChips = document.querySelectorAll('.sim-filter-chip');
    
    let activeSimFilter = 'all';

    const sampleTicketIssues = [
        "JNTUGV portal server overload crash",
        "Android testing environment storage leak",
        "Matplotlib visual chart scaling crash",
        "Pandas dataframe CSV read memory full",
        "API backend verification fail in production",
        "CSS responsive layout spacing conflict",
        "Numpy array dimensions mismatch in pipeline",
        "MySQL security keys update alert"
    ];

    function updateSimulatorMetrics() {
        const open = tickets.filter(t => t.status === 'open').length;
        const pending = tickets.filter(t => t.status === 'pending').length;
        const resolved = tickets.filter(t => t.status === 'resolved').length;

        simOpenCount.textContent = open;
        simPendingCount.textContent = pending;
        simResolvedCount.textContent = resolved;
    }

    function renderSimulatorTickets() {
        simTicketsList.innerHTML = '';
        
        let filteredTickets = tickets;
        if (activeSimFilter === 'high') {
            filteredTickets = tickets.filter(t => t.priority === 'high');
        } else if (activeSimFilter === 'pending') {
            filteredTickets = tickets.filter(t => t.status === 'open' || t.status === 'pending');
        }

        // Sort: Open/Pending first, high priority first, then date
        filteredTickets.sort((a, b) => {
            if (a.status === 'resolved' && b.status !== 'resolved') return 1;
            if (a.status !== 'resolved' && b.status === 'resolved') return -1;
            if (a.priority === 'high' && b.priority !== 'high') return -1;
            if (a.priority !== 'high' && b.priority === 'high') return 1;
            return b.id - a.id;
        });

        filteredTickets.forEach(ticket => {
            const ticketItem = document.createElement('div');
            ticketItem.className = `sim-ticket-item priority-${ticket.priority} status-${ticket.status}`;
            
            const isResolved = ticket.status === 'resolved';
            const actionBtn = isResolved
                ? `<span style="color: var(--success); font-weight: bold;"><i class="fa-solid fa-circle-check"></i></span>`
                : `<button class="sim-btn-action" data-id="${ticket.id}" title="Mark Resolved">Resolve</button>`;

            ticketItem.innerHTML = `
                <div class="sim-ticket-info">
                    <span class="sim-ticket-title">${ticket.title}</span>
                    <div class="sim-ticket-meta">
                        <span class="sim-badge ${ticket.priority}">${ticket.priority}</span>
                        <span>#${ticket.id}</span>
                        <span>•</span>
                        <span>${ticket.time}</span>
                        <span>•</span>
                        <span style="text-transform: capitalize; color: var(--secondary);">${ticket.status}</span>
                    </div>
                </div>
                <div>
                    ${actionBtn}
                </div>
            `;
            simTicketsList.appendChild(ticketItem);
        });

        // Add action button events
        document.querySelectorAll('.sim-btn-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                resolveTicket(id);
            });
        });
    }

    function resolveTicket(id) {
        const ticket = tickets.find(t => t.id === id);
        if (ticket) {
            ticket.status = 'resolved';
            ticket.time = 'Just now';
            updateSimulatorMetrics();
            renderSimulatorTickets();
            showToast(`Ticket #${id} resolved successfully!`, 'success');
        }
    }

    simAddTicketBtn.addEventListener('click', () => {
        const randId = Math.floor(100 + Math.random() * 900);
        const randomIssue = sampleTicketIssues[Math.floor(Math.random() * sampleTicketIssues.length)];
        const priorities = ['high', 'medium', 'low'];
        const randPriority = priorities[Math.floor(Math.random() * priorities.length)];

        tickets.unshift({
            id: randId,
            title: randomIssue,
            priority: randPriority,
            status: 'open',
            time: 'Just now'
        });

        updateSimulatorMetrics();
        renderSimulatorTickets();
        showToast(`Created ticket #${randId}: "${randomIssue}"`, 'success');
    });

    simFilterChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            simFilterChips.forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            activeSimFilter = e.target.getAttribute('data-sim-filter');
            renderSimulatorTickets();
        });
    });

    updateSimulatorMetrics();
    renderSimulatorTickets();

    // -------------------------------------------------------------
    // 7. Dynamic Resume Live Customizer Panel
    // -------------------------------------------------------------
    const custName = document.getElementById('custName');
    const custEmail = document.getElementById('custEmail');
    const custPhone = document.getElementById('custPhone');
    const custObjective = document.getElementById('custObjective');

    const heroName = document.getElementById('heroName');
    const footerLogo = document.querySelector('.footer-logo');
    const heroDesc = document.getElementById('heroDesc');
    const aboutObjective = document.getElementById('aboutObjective');
    const valEmail = document.getElementById('valEmail');
    const valPhone = document.getElementById('valPhone');
    const navLogo = document.getElementById('navLogo');

    function updateLiveResume() {
        const nameVal = custName.value.trim() || "YEDDU RUCHITHA";
        const emailVal = custEmail.value.trim() || "yedduruchitha@gmail.com";
        const phoneVal = custPhone.value.trim() || "+91-8019210135";
        const objectiveVal = custObjective.value.trim() || "";

        // Text Updates
        heroName.textContent = nameVal;
        footerLogo.textContent = nameVal;
        
        // Generate initials for navbar logo
        const initials = nameVal.split(' ').map(n => n[0]).join('').substring(0, 3).toUpperCase();
        navLogo.textContent = initials || "YR";

        if (objectiveVal) {
            heroDesc.textContent = objectiveVal;
            aboutObjective.textContent = objectiveVal;
        }

        valEmail.textContent = emailVal;
        valPhone.textContent = phoneVal;

        // Anchor attributes updates
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            link.href = `mailto:${emailVal}`;
        });
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            // strip dashes/spaces for link href dialer
            const dialedPhone = phoneVal.replace(/[^+\d]/g, "");
            link.href = `tel:${dialedPhone}`;
        });
    }

    custName.addEventListener('input', updateLiveResume);
    custEmail.addEventListener('input', updateLiveResume);
    custPhone.addEventListener('input', updateLiveResume);
    custObjective.addEventListener('input', updateLiveResume);

    // -------------------------------------------------------------
    // 8. Form Validation & Toast Alerts
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'circle-check' : 'circle-exclamation';
        toast.innerHTML = `
            <i class="fa-solid fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Remove toast after duration
        setTimeout(() => {
            toast.style.animation = 'slide-in 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) reverse forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3500);
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameVal = document.getElementById('formName').value.trim();
        const emailVal = document.getElementById('formEmail').value.trim();
        const msgVal = document.getElementById('formMsg').value.trim();

        if (!nameVal || !emailVal || !msgVal) {
            showToast('All message fields are required.', 'error');
            return;
        }

        // Store to Local Storage Database
        const feedbackMessages = JSON.parse(localStorage.getItem('feedback_messages') || '[]');
        feedbackMessages.push({
            name: nameVal,
            email: emailVal,
            message: msgVal,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('feedback_messages', JSON.stringify(feedbackMessages));

        // Toast feedback
        showToast(`Thank you, ${nameVal}! Message saved to LocalStorage!`, 'success');

        // Reset form inputs
        contactForm.reset();
    });
});
