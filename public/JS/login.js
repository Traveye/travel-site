// script to open / close the signup and login form

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginCloseBtn = document.getElementById('login-close-btn');
const signupCloseBtn = document.getElementById('signup-close-btn');


loginBtn.addEventListener('click', () => {
    loginForm.style.display = 'block';
});

signupBtn.addEventListener('click', () => {
    signupForm.style.display = 'block';
});

loginCloseBtn.addEventListener('click', () => {
    loginForm.style.display = 'none';
});

signupCloseBtn.addEventListener('click', () => {
    signupForm.style.display = 'none';
});

