document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const themeToggle = document.getElementById('theme-toggle');
  const amoledSettingItem = document.getElementById('amoled-setting-item');
  const amoledToggle = document.getElementById('amoled-toggle');
  const bgPatternSelect = document.getElementById('bg-pattern-select');
  const accentRadios = document.querySelectorAll('input[name="accent-color"]');
  const accentDots = document.querySelectorAll('.accent-dot');
  const saveBtn = document.getElementById('btn-save-changes');
  const toast = document.getElementById('toast');

  // 1. Smooth Cross-Page Navigation
  function navigateTo(url) {
    document.body.classList.add('page-exiting');
    setTimeout(() => {
      window.location.href = url;
    }, 250);
  }

  // Attach smooth navigation to all sidebar nav-links that go to external pages
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(href);
      });
    }
  });

  // 2. Load settings from localStorage
  const savedTheme = localStorage.getItem('soft6-theme') || 'light';
  const savedAmoled = localStorage.getItem('soft6-amoled') === 'true';
  const savedPattern = localStorage.getItem('soft6-pattern') || 'none';
  const savedAccent = localStorage.getItem('soft6-accent') || 'indigo';

  // Apply saved values to DOM elements & html tags
  initSettings(savedTheme, savedAmoled, savedPattern, savedAccent);

  // 3. Theme toggle change handler
  themeToggle.addEventListener('change', () => {
    updateThemeState();
  });

  // AMOLED toggle change handler
  amoledToggle.addEventListener('change', () => {
    updateThemeState();
  });

  // Background pattern change handler
  bgPatternSelect.addEventListener('change', (e) => {
    const pattern = e.target.value;
    document.documentElement.setAttribute('data-pattern', pattern);
    localStorage.setItem('soft6-pattern', pattern);
  });

  // Accent color change handler
  accentRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const accent = e.target.value;

      // Update HTML attribute
      document.documentElement.setAttribute('data-accent', accent);
      localStorage.setItem('soft6-accent', accent);

      // Update visual dot borders
      accentDots.forEach(dot => {
        if (dot.getAttribute('data-color') === accent) {
          dot.classList.add('active-accent');
        } else {
          dot.classList.remove('active-accent');
        }
      });
    });
  });

  // 4. Save Changes button action
  saveBtn.addEventListener('click', () => {
    showToast();
  });

  // Helper Functions
  function initSettings(theme, amoled, pattern, accent) {
    // Apply Theme
    if (theme === 'dark' || theme === 'amoled') {
      themeToggle.checked = true;
      amoledSettingItem.style.display = 'flex';

      if (theme === 'amoled') {
        amoledToggle.checked = true;
        document.documentElement.setAttribute('data-theme', 'amoled');
      } else {
        amoledToggle.checked = false;
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } else {
      themeToggle.checked = false;
      amoledToggle.checked = false;
      amoledSettingItem.style.display = 'none';
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Apply Background Pattern
    bgPatternSelect.value = pattern;
    document.documentElement.setAttribute('data-pattern', pattern);

    // Apply Accent
    document.documentElement.setAttribute('data-accent', accent);
    accentRadios.forEach(radio => {
      if (radio.value === accent) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    });

    accentDots.forEach(dot => {
      if (dot.getAttribute('data-color') === accent) {
        dot.classList.add('active-accent');
      } else {
        dot.classList.remove('active-accent');
      }
    });
  }

  function updateThemeState() {
    const isDarkChecked = themeToggle.checked;
    const isAmoledChecked = amoledToggle.checked;

    if (isDarkChecked) {
      amoledSettingItem.style.display = 'flex';

      if (isAmoledChecked) {
        document.documentElement.setAttribute('data-theme', 'amoled');
        localStorage.setItem('soft6-theme', 'amoled');
        localStorage.setItem('soft6-amoled', 'true');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('soft6-theme', 'dark');
        localStorage.setItem('soft6-amoled', 'false');
      }
    } else {
      amoledSettingItem.style.display = 'none';
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('soft6-theme', 'light');
      localStorage.setItem('soft6-amoled', 'false');
    }
  }

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Logout Trigger ---
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigateTo('../LandingPage/LandingPage.html');
    });
  }
});
