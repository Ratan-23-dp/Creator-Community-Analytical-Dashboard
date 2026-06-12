// 1. THEME TOGGLE LOGIC
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Icon change and LocalStorage save logic
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// Check saved theme preference on page load
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// 2. FORM SWITCHING LOGIC
const loginBox = document.getElementById('loginBox');
const registerBox = document.getElementById('registerBox');

document.getElementById('toSignUp').addEventListener('click', () => {
    loginBox.classList.remove('active');
    registerBox.classList.add('active');
});

document.getElementById('toSignIn').addEventListener('click', () => {
    registerBox.classList.remove('active');
    loginBox.classList.add('active');
});

// 3. AUTH LOGIC (LocalStorage)
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('storedUser', document.getElementById('regUser').value);
    localStorage.setItem('storedPass', document.getElementById('regPass').value);
    alert("Registration Successful! Now please login.");
    
    // Switch to Login form after registration
    registerBox.classList.remove('active');
    loginBox.classList.add('active');
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    
    // Validation
    if (user === localStorage.getItem('storedUser') && pass === localStorage.getItem('storedPass')) {
        alert("Welcome back, " + user + "!");
    } else {
        alert("Wrong Credentials! Please register if you haven't.");
    }
});