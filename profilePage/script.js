// script.js - Soft-6 Dashboard UI (Frontend Only)

document.addEventListener('DOMContentLoaded', () => {

  // --- Tab Switching & Navigation ---
  const tabItems = document.querySelectorAll('.nav-item:not(.logout-item)');
  const tabPanels = document.querySelectorAll('.tab-panel');

  // --- Smooth Cross-Page Navigation ---
  function navigateTo(url) {
    document.body.classList.add('page-exiting');
    setTimeout(() => {
      window.location.href = url;
    }, 250);
  }

  tabItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const link = item.querySelector('a');
      const href = link && link.getAttribute('href');
      if (href && href !== '#' && href !== '') {
        e.preventDefault();
        navigateTo(href);
        return;
      }
      e.preventDefault();
      const targetTab = item.getAttribute('data-tab');
      if (targetTab) {
        activateTab(targetTab);
        window.location.hash = targetTab;
      }
    });
  });

  function activateTab(tabId) {
    tabItems.forEach(t => t.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    const activeItem = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    if (activeItem) activeItem.classList.add('active');

    const targetPanel = document.getElementById(`tab-${tabId}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  }

  // Handle Hash Routing on Load and Change
  function handleHashRoute() {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['dashboard', 'interviews', 'insights', 'analytics', 'settings'].includes(hash)) {
      if (hash === 'analytics') {
        window.location.href = '../performanceDashboard/index.html';
      } else if (hash === 'settings') {
        window.location.href = '../profileSettings-page/index.html';
      } else {
        activateTab(hash);
      }
    }
  }

  handleHashRoute();
  window.addEventListener('hashchange', handleHashRoute);

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

  // --- Radar Chart Drawing ---
  const skillData = {
    technical: 85,
    communication: 75,
    problemSolving: 90,
    leadership: 70,
    design: 60
  };

  function updateRadarChart() {
    const center = 100;
    const maxRadius = 80;
    const skillKeys = ['technical', 'communication', 'problemSolving', 'leadership', 'design'];
    const points = [];

    skillKeys.forEach((key, index) => {
      const value = skillData[key];
      const angle = (index * 2 * Math.PI / 5) - (Math.PI / 2);
      const r = (value / 100) * maxRadius;

      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);

      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);

      const dots = document.querySelectorAll('#radarChartSVG .data-point');
      if (dots[index]) {
        dots[index].setAttribute('cx', x.toFixed(1));
        dots[index].setAttribute('cy', y.toFixed(1));
      }
    });

    const poly = document.getElementById('skillPoly');
    if (poly) {
      poly.setAttribute('points', points.join(' '));
    }
  }

  updateRadarChart();

});
