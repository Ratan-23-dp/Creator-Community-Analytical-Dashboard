// 1. THEME TOGGLE LOGIC
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('contact-theme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('contact-theme', 'dark');
        }
    });

    if (localStorage.getItem('contact-theme') === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // 2. FORM SUBMISSION LOGIC (No Reload)
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;

        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                alert("✅ Message Sent Successfully!");
                contactForm.reset();
            } else {
                alert("❌ Error sending message.");
            }
        }).catch(() => {
            alert("❌ Server Error.");
        }).finally(() => {
            submitBtn.innerHTML = "Send to Admin";
            submitBtn.disabled = false;
        });
    });