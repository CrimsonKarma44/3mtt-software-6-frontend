// script.js - Soft-6 System Scalability Architecture UI

document.addEventListener('DOMContentLoaded', () => {

  // --- Animate Progress Bars on Load ---
  const progressFills = document.querySelectorAll('.progress-bar-fill');
  
  // Subtle delay to allow container fade-in animation first
  setTimeout(() => {
    progressFills.forEach(fill => {
      const targetWidth = fill.getAttribute('data-width');
      if (targetWidth) {
        fill.style.width = targetWidth;
      }
    });
  }, 300);

  // --- Button Interaction Feedback ---
  const saveBtn = document.getElementById('btnSaveLater');
  const practiceBtn = document.getElementById('btnPracticeNow');
  const newAssessmentBtn = document.getElementById('btnNewAssessment');

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      showToast('Scenario saved successfully to your folder!');
    });
  }

  if (practiceBtn) {
    practiceBtn.addEventListener('click', () => {
      showToast('Initializing AI Interview simulator...');
    });
  }

  if (newAssessmentBtn) {
    newAssessmentBtn.addEventListener('click', () => {
      showToast('Creating new assessment track...');
    });
  }

  // --- Sidebar Links Event Listeners ---
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const text = link.querySelector('.nav-text').textContent;
      // Replicate navigation state highlight (but stay on the page for this UI demo)
      navLinks.forEach(l => l.closest('.nav-item').classList.remove('active'));
      link.closest('.nav-item').classList.add('active');
      
      showToast(`Navigating to ${text}...`);
    });
  });

  // --- Toast Alert Notification System ---
  function showToast(message) {
    // Check if toast element already exists
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
      
      // Inject standard toast styles if not already defined in style.css
      const style = document.createElement('style');
      style.textContent = `
        .toast-notification {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background-color: hsl(224, 71%, 11%);
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          z-index: 1000;
          transform: translateY(100px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .toast-notification.show {
          transform: translateY(0);
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

});
