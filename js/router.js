/**
 * router.js
 * Handles SPA routing – listens for navigation events and loads page content.
 */

let currentPage = 'home';
let appData = {};

function initRouter(data, renderPage) {
    appData = data;

    // Define navigateTo inside this closure so it has access to renderPage
    function navigateTo(page, replaceState = false) {
        if (page === currentPage && page !== 'home') return;

const pageDataMap = {
    home: 'data/testimonials.yaml',   // already correct
    products: 'data/software.yaml',   // already correct
    about: null,
    contact: null,
    blog: 'data/blog.yaml'            // already correct
};

        const yamlUrl = pageDataMap[page];
        if (yamlUrl) {
            loadYaml(yamlUrl).then((data) => {
                // Always render, even if data is null (use empty object)
                renderPage(page, data || {}, appData);
            }).catch(() => {
                renderPage(page, {}, appData);
            });
        } else {
            renderPage(page, {}, appData);
        }

        const url = `/${page === 'home' ? '' : page}`;
        if (replaceState) {
            history.replaceState({ page }, '', url);
        } else {
            history.pushState({ page }, '', url);
        }

        // Update nav highlight
        document.querySelectorAll('.main-nav a[data-page]').forEach((link) => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        closeMobileMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        currentPage = page;
    }

    // Intercept navigation clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-page]');
        if (link) {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
        }
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    }

    window.addEventListener('popstate', (e) => {
        const page = e.state?.page || 'home';
        navigateTo(page, true);
    });

    // Expose navigateTo globally for use in components (e.g., CTA buttons)
    window.navigateTo = navigateTo;

    // Initial page load
    navigateTo('home');
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    if (hamburger) hamburger.classList.remove('open');
    if (mainNav) mainNav.classList.remove('open');
}