window.initSidebar = function() {
    if (document.getElementById('glass-sidebar')) return; // Already injected
    
    const sidebarCSS = `
    .sidebar-trigger {
      position: fixed;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-left: none;
      border-radius: 0 16px 16px 0;
      width: 44px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 4px 24px rgba(10, 45, 110, 0.08);
      color: #1E6CC7;
      transition: all 0.3s ease;
    }
    .sidebar-trigger:hover {
      background: rgba(255, 255, 255, 0.4);
      width: 50px;
    }
    .sidebar-trigger svg {
      width: 24px;
      height: 24px;
    }
    .glass-sidebar {
      position: fixed;
      top: 0;
      left: -320px;
      bottom: 0;
      width: 280px;
      background: rgba(255, 255, 255, 0.2); /* Extremely glassy */
      backdrop-filter: blur(32px);
      -webkit-backdrop-filter: blur(32px);
      border-right: 1px solid rgba(255, 255, 255, 0.4);
      z-index: 10000;
      transition: left 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
      box-shadow: 0 0 0 rgba(0,0,0,0);
      display: flex;
      flex-direction: column;
      font-family: 'Inter', sans-serif;
    }
    .glass-sidebar.open {
      left: 0;
      box-shadow: 16px 0 48px rgba(10, 45, 110, 0.2);
    }
    .sidebar-header {
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
    .sidebar-header .logo {
      font-size: 24px;
      font-weight: 800;
      color: #0B1E3D;
      text-decoration: none;
    }
    .sidebar-header .logo-dot {
      color: #3A8FE0;
    }
    .sidebar-close {
      background: transparent;
      border: none;
      font-size: 28px;
      color: #8FA4C2;
      cursor: pointer;
      transition: color 0.2s;
      outline: none;
    }
    .sidebar-close:hover {
      color: #1E6CC7;
    }
    .sidebar-nav {
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .sidebar-link {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      text-decoration: none;
      color: #163A6B;
      font-weight: 600;
      font-size: 16px;
      border-radius: 12px;
      transition: all 0.2s;
    }
    .sidebar-link:hover {
      background: rgba(255, 255, 255, 0.3);
      color: #1E6CC7;
      transform: translateX(4px);
    }
    .sidebar-overlay {
      position: fixed;
      inset: 0;
      background: rgba(11, 30, 61, 0.2);
      backdrop-filter: blur(8px);
      z-index: 9998;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
    }
    .sidebar-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    `;
    const style = document.createElement('style');
    style.textContent = sidebarCSS;
    document.head.appendChild(style);
  
    const sidebarHTML = `
      <div id="sidebar-trigger" class="sidebar-trigger" title="Menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
      <aside id="glass-sidebar" class="glass-sidebar">
        <div class="sidebar-header">
          <a href="index.html" class="logo">Welkin<span class="logo-dot">.</span></a>
          <button id="sidebar-close" class="sidebar-close">&times;</button>
        </div>
        <nav class="sidebar-nav">
          <a href="index.html" class="sidebar-link">Home</a>
          <a href="games.html" class="sidebar-link">Games</a>
          <a href="browse.html" class="sidebar-link">Browse</a>
          <a href="#" class="sidebar-link" id="music-toggle">Music</a>
        </nav>
      </aside>
      <div id="sidebar-overlay" class="sidebar-overlay"></div>
    `;
    document.body.insertAdjacentHTML('beforeend', sidebarHTML);
  
    const sidebar = document.getElementById('glass-sidebar');
    const trigger = document.getElementById('sidebar-trigger');
    const closeBtn = document.getElementById('sidebar-close');
    const overlay = document.getElementById('sidebar-overlay');
  
    const openSidebar = () => {
      sidebar.classList.add('open');
      overlay.classList.add('open');
    };
  
    const closeSidebar = () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    };
  
    trigger.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Page Transition
    if(!document.body.classList.contains('page-transition-enter')){
      document.body.classList.add('page-transition-enter');
    }
};

// Instead of waiting for DOMContentLoaded blindly, check if document is already ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initSidebar);
} else {
    window.initSidebar();
}

// Global click delegation for page transitions and games script interception
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || link.getAttribute('target') === '_blank' || href.startsWith('#')) return;

    e.preventDefault();

    document.body.classList.remove('page-transition-enter');
    document.body.classList.add('page-transition-exit');
    
    // Delay navigation to allow transition to play
    setTimeout(() => {
    window.location.href = href;
    }, 700);
});
