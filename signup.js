//Updated from local - India developer
//Updating in local feature/signup branch  - Inida developer
// Signup form logic
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('button[type="submit"]');

    // Real-time validation
    usernameInput.addEventListener('blur', validateUsername);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    // Form submission
    signupForm.addEventListener('submit', handleSignup);

    function validateUsername() {
        const username = usernameInput.value.trim();
        const usernameError = document.getElementById('username-error') || createErrorElement('username-error', usernameInput);

        if (username.length < 3) {
            showError(usernameError, 'Username must be at least 3 characters long');
            return false;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            showError(usernameError, 'Username can only contain letters, numbers, and underscores');
            return false;
        }

        hideError(usernameError);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('email-error') || createErrorElement('email-error', emailInput);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        }

        hideError(emailError);
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        const passwordError = document.getElementById('password-error') || createErrorElement('password-error', passwordInput);

        if (password.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters long');
            return false;
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            showError(passwordError, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
            return false;
        }

        hideError(passwordError);
        return true;
    }

    function createErrorElement(id, inputElement) {
        const errorElement = document.createElement('div');
        errorElement.id = id;
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        return errorElement;
    }

    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function hideError(errorElement) {
        errorElement.style.display = 'none';
    }

    async function handleSignup(event) {
        event.preventDefault();

        // Validate all fields
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
            return;
        }

        // Disable submit button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = 'Signing up...';

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameInput.value.trim(),
                    email: emailInput.value.trim(),
                    password: passwordInput.value
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Success - redirect or show success message
                showSuccessMessage('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                // Handle errors
                if (data.errors) {
                    displayFormErrors(data.errors);
                } else {
                    showErrorMessage(data.message || 'Signup failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Signup error:', error);
            showErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Sign Up';
        }
    }

    function displayFormErrors(errors) {
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => hideError(el));

        // Display new errors
        if (errors.username) {
            const usernameError = document.getElementById('username-error') || createErrorElement('username-error', usernameInput);
            showError(usernameError, errors.username);
        }
        if (errors.email) {
            const emailError = document.getElementById('email-error') || createErrorElement('email-error', emailInput);
            showError(emailError, errors.email);
        }
        if (errors.password) {
            const passwordError = document.getElementById('password-error') || createErrorElement('password-error', passwordInput);
            showError(passwordError, errors.password);
        }
    }

    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.id = 'success-message';
        successDiv.textContent = message;
        successDiv.style.color = 'green';
        successDiv.style.padding = '10px';
        successDiv.style.marginTop = '10px';
        successDiv.style.border = '1px solid green';
        successDiv.style.borderRadius = '4px';
        successDiv.style.backgroundColor = '#e8f5e8';

        const form = document.querySelector('form');
        form.parentNode.insertBefore(successDiv, form);

        // Remove success message after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 3000);
    }

    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.padding = '10px';
        errorDiv.style.marginTop = '10px';
        errorDiv.style.border = '1px solid red';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.backgroundColor = '#ffebee';

        const form = document.querySelector('form');
        form.parentNode.insertBefore(errorDiv, form);

        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
});   