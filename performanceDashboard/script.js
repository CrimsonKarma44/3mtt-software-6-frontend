document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // -------------------------------------------------------------
    // 1. Capability Matrix Radar Chart Initialization
    // -------------------------------------------------------------
    const radarCtx = document.getElementById('radarChart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Technical', 'Ada', 'Cog', 'Leadership', 'Collaboration', 'Vision'],
                datasets: [
                    {
                        label: 'Current Profile',
                        data: [90, 78, 64, 82, 70, 75],
                        fill: true,
                        backgroundColor: 'rgba(76, 62, 236, 0.08)',
                        borderColor: '#4c3eec',
                        pointBackgroundColor: '#4c3eec',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#4c3eec',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        borderWidth: 2,
                        tension: 0.1
                    },
                    {
                        label: 'Role Benchmark',
                        data: [72, 60, 58, 80, 62, 80],
                        fill: true,
                        backgroundColor: 'rgba(148, 163, 184, 0.03)',
                        borderColor: '#cbd5e1',
                        borderDash: [4, 4],
                        pointBackgroundColor: 'rgba(203, 213, 225, 0.6)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#cbd5e1',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        borderWidth: 1.5,
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // We use our own custom Legend row in HTML
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return ` ${context.dataset.label}: ${context.raw}%`;
                            }
                        },
                        titleFont: {
                            family: "'Plus Jakarta Sans', sans-serif"
                        },
                        bodyFont: {
                            family: "'Plus Jakarta Sans', sans-serif"
                        }
                    }
                },
                scales: {
                    r: {
                        grid: {
                            color: '#e2e8f0',
                            circular: false // Hexagonal grid lines
                        },
                        angleLines: {
                            color: '#e2e8f0'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            display: false, // Hides values along axes
                            stepSize: 20
                        },
                        pointLabels: {
                            color: '#5a6a85',
                            font: {
                                family: "'Plus Jakarta Sans', 'Inter', sans-serif",
                                size: 11,
                                weight: '600'
                            }
                        }
                    }
                }
            }
        });
    }

    // -------------------------------------------------------------
    // 2. Sidebar Navigation — View Switching
    // -------------------------------------------------------------
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    function switchView(targetViewId) {
        // Hide all views
        views.forEach(v => v.classList.add('hidden'));
        // Remove active from all nav items
        navItems.forEach(i => i.classList.remove('active'));

        // Show target view
        const targetView = document.getElementById('view-' + targetViewId);
        if (targetView) targetView.classList.remove('hidden');

        // Set active nav item
        const targetNav = document.querySelector(`.nav-item[data-view="${targetViewId}"]`);
        if (targetNav) targetNav.classList.add('active');

        // Re-init lucide icons in newly shown view (for placeholder icons)
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = item.getAttribute('data-view');
            if (viewId) switchView(viewId);
        });
    });

    // -------------------------------------------------------------
    // 3. Header Actions (Download PDF simulation)
    // -------------------------------------------------------------
    const btnDownload = document.getElementById('btnDownload');
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            window.print();
        });
    }
});
