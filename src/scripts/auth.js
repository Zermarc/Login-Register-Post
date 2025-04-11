function toggleBothPasswords(element) {
    const form = element.closest('form');
    const passwordInputs = form.querySelectorAll('input[name="password"], input[name="confirmPassword"]');
    const newType = passwordInputs[0].type === 'password' ? 'text' : 'password';
    const newIcon = element.classList.contains('fa-eye') ? 'fa-eye-slash' : 'fa-eye';
    const oldIcon = element.classList.contains('fa-eye') ? 'fa-eye' : 'fa-eye-slash';
    
    passwordInputs.forEach(input => {
        input.type = newType;
    });
    
    element.classList.replace(oldIcon, newIcon);
}

function updatePasswordRequirements(password) {
    const requirements = {
        'length-check': password.length >= 8,
        'letter-check': /[A-Za-z]/.test(password),
        'number-check': /\d/.test(password),
        'special-check': /[@$!%*#?&]/.test(password)
    };

    Object.entries(requirements).forEach(([id, isValid]) => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.toggle('valid', isValid);
        }
    });
}

function validateInput(input) {
    const formGroup = input.closest('.form-group');
    const validationIcon = formGroup.querySelector('.validation-icon');
    const errorElement = formGroup.querySelector('.error-message');
    
    // Reset states
    if (validationIcon) {
        validationIcon.classList.remove('show');
    }
    formGroup.classList.remove('has-error', 'valid');
    if (errorElement) errorElement.style.display = 'none';

    // If empty, hide validation mark and return
    if (!input.value.trim()) {
        if (validationIcon) {
            validationIcon.classList.remove('show');
        }
        return;
    }

    switch (input.name) {
        case 'username':
            if (/^[A-Za-z0-9]{3,}$/.test(input.value)) {
                validationIcon.classList.add('show');
                formGroup.classList.add('valid');
            } else {
                showError('username-error', 'Username must contain only English letters and numbers (min 3 characters)');
            }
            break;

        case 'email':
            if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(input.value)) {
                validationIcon.classList.add('show');
                formGroup.classList.add('valid');
            } else {
                showError('email-error', 'Please enter a valid email address');
            }
            break;

        case 'password':
            const hasUpperCase = /[A-Z]/.test(input.value);
            const hasLowerCase = /[a-z]/.test(input.value);
            const hasSpecial = /[!@#$%^&*]/.test(input.value);
            const hasMinLength = input.value.length >= 8;

            if (hasUpperCase && hasLowerCase && hasSpecial && hasMinLength) {
                validationIcon.classList.add('show');
                formGroup.classList.add('valid');
            } else {
                showError('password-error', 'Please set password according to requirements below');
            }
            updatePasswordRequirements(input.value);
            break;

        case 'confirmPassword':
            const password = document.querySelector('input[name="password"]').value;
            if (input.value && input.value === password) {
                validationIcon.classList.add('show');
                formGroup.classList.add('valid');
            } else {
                showError('confirm-password-error', 'Passwords do not match');
            }
            break;
    }
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const formGroup = errorElement.closest('.form-group');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        formGroup.classList.add('has-error');
    }
}

function validatePasswords() {
    const form = document.getElementById('registerForm');
    const password = form.querySelector('input[name="password"]').value;
    const confirmPassword = form.querySelector('input[name="confirmPassword"]').value;
    const errorElement = document.getElementById('confirm-password-error');
    const formGroup = errorElement.closest('.form-group');
    const validationIcon = formGroup.querySelector('.validation-icon');
    
    if (confirmPassword && password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
        errorElement.style.display = 'block';
        formGroup.classList.add('has-error');
        formGroup.classList.remove('valid');
        if (validationIcon) validationIcon.classList.remove('show');
        return false;
    } else if (confirmPassword) {
        errorElement.style.display = 'none';
        formGroup.classList.remove('has-error');
        formGroup.classList.add('valid');
        if (validationIcon) validationIcon.classList.add('show');
        return true;
    }
    return password === confirmPassword;
}

function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    
    if (email && password) {
        // Add any login validation logic here
        window.location.href = 'main.html';
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const form = document.getElementById('registerForm');
    const username = form.querySelector('input[name="username"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    
    // Validate all fields
    const isUsernameValid = /^[A-Za-z0-9]{3,}$/.test(username);
    const isEmailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const hasMinLength = password.length >= 8;
    const isPasswordValid = hasUpperCase && hasLowerCase && hasSpecial && hasMinLength;
    const doPasswordsMatch = validatePasswords();
    
    if (isUsernameValid && isEmailValid && isPasswordValid && doPasswordsMatch) {
        window.location.href = 'main.html';
    }
}

// Initialize validation
window.onload = function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => validateInput(input));
    });
    
    // Add specific listener for confirm password
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validatePasswords);
    }
    
    // Add form submit handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
};








