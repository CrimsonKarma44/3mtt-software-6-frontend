document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // TOAST NOTIFICATION SYSTEM
    // ================================
    const toastContainer = document.getElementById('toast-container');

    function showToast({ type = 'info', title, message, duration = 4000 }) {
        const icons = {
            success: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>`,
            error:   `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>`,
            info:    `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 8V8.5M12 11V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>`,
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            ${icons[type] || icons.info}
            <div class="toast-body">
                <div class="toast-title">${title}</div>
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            <button class="toast-close" aria-label="Close notification">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        `;

        toastContainer.appendChild(toast);

        const dismiss = () => {
            toast.classList.add('hiding');
            toast.addEventListener('animationend', () => toast.remove(), { once: true });
        };

        toast.querySelector('.toast-close').addEventListener('click', dismiss);

        if (duration > 0) {
            setTimeout(dismiss, duration);
        }
    }


    // ================================
    // PASSWORD TOGGLE (see password)
    // ================================
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.closest('.input-with-icon').querySelector('input');
            const eyeOpen = btn.querySelector('.eye-open');
            const eyeOff  = btn.querySelector('.eye-off');

            if (input.type === 'password') {
                input.type = 'text';
                eyeOpen.classList.add('hidden');
                eyeOff.classList.remove('hidden');
            } else {
                input.type = 'password';
                eyeOff.classList.add('hidden');
                eyeOpen.classList.remove('hidden');
            }
        });
    });


    // ================================
    // VALIDATION HELPERS
    // ================================
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function isValidPassword(password) {
        // At least 8 chars, one number, one symbol
        return /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
    }

    function setFieldError(inputEl, errorEl, message) {
        inputEl.classList.add('is-invalid');
        errorEl.textContent = message;
    }

    function clearFieldError(inputEl, errorEl) {
        inputEl.classList.remove('is-invalid');
        errorEl.textContent = '';
    }

    // Live validation — clear error as user types
    function attachLiveValidation(inputEl, errorEl, validatorFn, clearMsg) {
        inputEl.addEventListener('input', () => {
            if (validatorFn(inputEl.value)) {
                clearFieldError(inputEl, errorEl);
            }
        });
    }


    // ================================
    // SIGNUP FORM
    // ================================
    const signupForm      = document.getElementById('signup-form');
    const signupEmailEl   = document.getElementById('signup-email');
    const signupEmailErr  = document.getElementById('signup-email-error');
    const signupPassEl    = document.getElementById('signup-password');
    const signupPassErr   = document.getElementById('signup-password-error');

    attachLiveValidation(signupEmailEl, signupEmailErr, isValidEmail);
    attachLiveValidation(signupPassEl,  signupPassErr,  isValidPassword);

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Email validation
        if (!signupEmailEl.value.trim()) {
            setFieldError(signupEmailEl, signupEmailErr, 'Email address is required.');
            valid = false;
        } else if (!isValidEmail(signupEmailEl.value)) {
            setFieldError(signupEmailEl, signupEmailErr, 'Please enter a valid email address.');
            valid = false;
        } else {
            clearFieldError(signupEmailEl, signupEmailErr);
        }

        // Password validation
        if (!signupPassEl.value) {
            setFieldError(signupPassEl, signupPassErr, 'Password is required.');
            valid = false;
        } else if (!isValidPassword(signupPassEl.value)) {
            setFieldError(signupPassEl, signupPassErr, 'Must be 8+ characters with at least one number and one symbol.');
            valid = false;
        } else {
            clearFieldError(signupPassEl, signupPassErr);
        }

        if (!valid) {
            showToast({ type: 'error', title: 'Please fix the errors below.', message: 'Check the highlighted fields and try again.' });
            return;
        }

        // ✅ All good — simulate account creation
        showToast({ type: 'success', title: 'Account created!', message: 'Welcome to Soft-6. Redirecting you now…' });
        signupForm.reset();
        setTimeout(() => { window.location.href = '../profilePage/index.html'; }, 1800);
    });


    // ================================
    // LOGIN FORM
    // ================================
    const loginForm      = document.getElementById('login-form');
    const loginEmailEl   = document.getElementById('login-email');
    const loginEmailErr  = document.getElementById('login-email-error');
    const loginPassEl    = document.getElementById('login-password');
    const loginPassErr   = document.getElementById('login-password-error');

    attachLiveValidation(loginEmailEl, loginEmailErr, isValidEmail);
    attachLiveValidation(loginPassEl,  loginPassErr,  v => v.length >= 1);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Email validation
        if (!loginEmailEl.value.trim()) {
            setFieldError(loginEmailEl, loginEmailErr, 'Email address is required.');
            valid = false;
        } else if (!isValidEmail(loginEmailEl.value)) {
            setFieldError(loginEmailEl, loginEmailErr, 'Please enter a valid email address.');
            valid = false;
        } else {
            clearFieldError(loginEmailEl, loginEmailErr);
        }

        // Password validation
        if (!loginPassEl.value) {
            setFieldError(loginPassEl, loginPassErr, 'Password is required.');
            valid = false;
        } else {
            clearFieldError(loginPassEl, loginPassErr);
        }

        if (!valid) {
            showToast({ type: 'error', title: 'Login failed.', message: 'Please check your credentials and try again.' });
            return;
        }

        // ✅ Simulate login success
        showToast({ type: 'success', title: 'Logged in successfully!', message: 'Welcome back to Soft-6.' });
        loginForm.reset();
        setTimeout(() => { window.location.href = '../profilePage/index.html'; }, 1800);
    });


    // ================================
    // SOCIAL BUTTON HANDLERS
    // ================================
    document.getElementById('signup-google-btn').addEventListener('click', () => {
        showToast({ type: 'info', title: 'Google Sign-up', message: 'Redirecting to Google authentication…' });
    });
    document.getElementById('signup-linkedin-btn').addEventListener('click', () => {
        showToast({ type: 'info', title: 'LinkedIn Sign-up', message: 'Redirecting to LinkedIn authentication…' });
    });
    document.getElementById('login-google-btn').addEventListener('click', () => {
        showToast({ type: 'info', title: 'Google Login', message: 'Redirecting to Google authentication…' });
    });
    document.getElementById('login-linkedin-btn').addEventListener('click', () => {
        showToast({ type: 'info', title: 'LinkedIn Login', message: 'Redirecting to LinkedIn authentication…' });
    });


    // ================================
    // FORM SWAP (Sign up ↔ Login)
    // ================================
    const showLoginBtn  = document.getElementById('show-login');
    const showSignupBtn = document.getElementById('show-signup');
    const signupView    = document.querySelector('.signup-view');
    const loginView     = document.querySelector('.login-view');

    // Initially hide login view
    if (loginView) loginView.classList.add('hidden');

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signupView.classList.add('hidden');
            loginView.classList.remove('hidden');
        });
    }

    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginView.classList.add('hidden');
            signupView.classList.remove('hidden');
        });
    }

});
