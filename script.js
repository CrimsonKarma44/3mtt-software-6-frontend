// --- API Functions are loaded via auth.js script tag ---
console.log('iamm here');

// --- Main Application Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeSwitch = document.getElementById('theme-switch');
    const themeLabel = document.getElementById('theme-label');

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        if (themeSwitch) themeSwitch.checked = true;
        if (themeLabel) themeLabel.textContent = 'Light Mode';
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            if (themeSwitch.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                if (themeLabel) themeLabel.textContent = 'Light Mode';
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                if (themeLabel) themeLabel.textContent = 'Dark Mode';
            }
        });
    }

    // --- Form Swap Logic ---
    const showLoginBtn = document.getElementById('show-login');
    const showSignupBtn = document.getElementById('show-signup');
    const signupView = document.querySelector('.signup-view');
    const loginView = document.querySelector('.login-view');

    // Initially hide login view
    if (loginView) {
        loginView.classList.add('hidden');
    }

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

    // --- Signup Form Handler ---
    const signupForm = document.querySelector('.signup-form');
    const signupSubmitBtn = signupView.querySelector('.submit-btn');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const firstname = signupForm.querySelector('input[placeholder="John"]').value.trim();
            const lastname = signupForm.querySelector('input[placeholder="Doe"]').value.trim();
            const email = signupForm.querySelector('input[type="email"]').value.trim();
            const password = signupForm.querySelector('input[type="password"]').value.trim();
            const termsCheckbox = signupForm.querySelector('#terms');

            // Validation
            if (!firstname || !lastname || !email || !password) {
                alert('Please fill in all fields');
                return;
            }

            if (!termsCheckbox.checked) {
                alert('Please agree to the Terms of Service and Privacy Policy');
                return;
            }

            // Disable button and show loading state
            signupSubmitBtn.disabled = true;
            signupSubmitBtn.textContent = 'Creating Account...';

            try {
                const response = await register(firstname, lastname, email, password);
                
                // Save token to localStorage
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                
                alert('Account created successfully!');
                // Redirect or update UI as needed
                console.log('Signup successful:', response);
            } catch (error) {
                alert(error.message || 'Signup failed. Please try again.');
                console.error('Signup error:', error);
            } finally {
                signupSubmitBtn.disabled = false;
                signupSubmitBtn.textContent = 'Get Started';
            }
        });
    }

    // --- Login Form Handler ---
    const loginForm = document.querySelector('.login-form');
    const loginSubmitBtn = loginView.querySelector('.submit-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = loginForm.querySelector('input[type="email"]').value.trim();
            const password = loginForm.querySelector('input[type="password"]').value.trim();

            // Validation
            if (!email || !password) {
                alert('Please enter email and password');
                return;
            }

            // Disable button and show loading state
            loginSubmitBtn.disabled = true;
            loginSubmitBtn.textContent = 'Logging in...';

            try {
                const response = await login(email, password);
                
                // Save token to localStorage
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                
                alert('Login successful!');
                // Redirect or update UI as needed
                console.log('Login successful:', response);
            } catch (error) {
                alert(error.message || 'Login failed. Please try again.');
                console.error('Login error:', error);
            } finally {
                loginSubmitBtn.disabled = false;
                loginSubmitBtn.textContent = 'Login';
            }
        });
    }
});
