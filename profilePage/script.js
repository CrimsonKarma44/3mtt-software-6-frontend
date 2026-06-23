// script.js - Soft-6 Dashboard UI (Frontend Only)

document.addEventListener('DOMContentLoaded', () => {

  // --- Tab Switching ---
  const tabItems = document.querySelectorAll('.nav-item');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute('data-tab');

      tabItems.forEach(t => t.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

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
