<<<<<<< HEAD
//Updating login code in local feature/login branch - India developer
=======
//Login.js is updated from remote - USA developer
>>>>>>> a257d7f46da98a1ba34e625eca903a16046bb5d1
// Get form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Handle form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    // Simulate login (replace with actual API call)
    performLogin(email, password);
});

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function performLogin(email, password) {
    // Replace with your actual login API endpoint
    console.log('Logging in with:', email);
    alert('Login successful!');
    // Redirect or update UI
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}
