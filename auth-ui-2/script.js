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
});
