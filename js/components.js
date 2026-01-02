document.addEventListener("DOMContentLoaded", function () {
  // Load Header
  fetch("components/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;

      // --- Ticker Play/Pause Logic ---
      const playBtn = document.getElementById('tickerPlayBtn');
      const tickerContent = document.querySelector('.kb-ticker-content');

      if (playBtn && tickerContent) {
        // Initial State: Ticker runs by default, so show PAUSE icon
        const icon = playBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-circle-play');
          icon.classList.add('fa-circle-pause');
        }

        playBtn.addEventListener('click', function () {
          const currentState = window.getComputedStyle(tickerContent).animationPlayState;

          if (currentState === 'paused') {
            tickerContent.style.animationPlayState = 'running';
            icon.classList.remove('fa-circle-play');
            icon.classList.add('fa-circle-pause');
            playBtn.setAttribute('title', 'Pause');
          } else {
            tickerContent.style.animationPlayState = 'paused';
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
            playBtn.setAttribute('title', 'Play');
          }
        });
      } else {
        console.warn("Ticker elements not found:", { playBtn, tickerContent });
      }

      // Highlight active link based on current URL
      const currentPath = window.location.pathname.split("/").pop() || "index.html";
      const navLinks = document.querySelectorAll('.kb-nav .nav-link');
      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Theme Toggle Logic
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        const icon = themeToggle.querySelector('i');

        // Check saved preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        }

        themeToggle.addEventListener('click', () => {
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
          } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
          }
        });
      }
    })
    .catch(err => console.error("Error loading header:", err));

  // Load Footer
  fetch("components/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch(err => console.error("Error loading footer:", err));
});
