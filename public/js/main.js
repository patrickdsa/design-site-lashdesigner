document.addEventListener('DOMContentLoaded', () => {
    // Initialize standard icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    function toggleMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('translate-x-full');
            if (!mobileMenu.classList.contains('translate-x-full')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    if (mobileMenuBtn && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
    }

    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    function updateTheme() {
        const isDark = localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
            document.documentElement.classList.add('dark');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
        }
    }

    // Initial check
    updateTheme();

    // Listen for OS changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!('color-theme' in localStorage)) {
            updateTheme();
        }
    });

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('color-theme', 'light');
            } else {
                localStorage.setItem('color-theme', 'dark');
            }
            updateTheme();
        });
    }

    // Video Interaction Logic
    const videoContainer = document.getElementById('video-container-wrapper');
    const video = document.getElementById('hero-video');
    const overlay = document.getElementById('video-overlay');
    const playBtn = document.getElementById('hero-play-btn');

    if (playBtn && video) {
        playBtn.addEventListener('click', () => {
            // Activate Video
            video.muted = false;
            video.loop = false;
            video.currentTime = 0;
            video.controls = true;
            video.classList.remove('opacity-90', 'group-hover:scale-105', 'transition-transform');
            video.classList.add('opacity-100');

            // Flatten Container
            if (videoContainer) {
                videoContainer.classList.remove('rotate-2', 'hover:rotate-0', 'group');
                videoContainer.classList.add('rotate-0', 'scale-100');
            }

            // Hide Overlay
            overlay.classList.add('opacity-0', 'pointer-events-none');
            playBtn.classList.add('pointer-events-none'); // Disable button interaction

            // Play
            video.play();
        });

        // Reset on End or Pause
        const resetVideoState = () => {
            if (!video.paused && !video.ended) return;

            video.controls = false;
            video.muted = true;
            video.loop = true;
            video.play().catch(() => { });

            video.classList.add('opacity-90', 'group-hover:scale-105', 'transition-transform');
            video.classList.remove('opacity-100');

            if (videoContainer) {
                videoContainer.classList.add('rotate-2', 'group');
                videoContainer.classList.remove('rotate-0', 'scale-100');
            }

            overlay.classList.remove('opacity-0', 'pointer-events-none');
            if (playBtn) playBtn.classList.remove('pointer-events-none'); // Re-enable button
        };

        video.addEventListener('ended', resetVideoState);
        video.addEventListener('pause', resetVideoState);
    }

    // Countdown Logic
    const daysEl = document.getElementById('days');
    if (daysEl) { // Only run if countdown elements exist
        const targetDate = new Date('2026-03-15T23:59:59').getTime();
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
        }, 1000);
    }
});
