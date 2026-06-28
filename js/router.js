/**
 * router.js
 * Handles SPA routing with base path support.
 */

let currentPage = 'home';
let appData = {};
let basePath = '';
let renderPageCallback = null; // store the render function

function getBasePath() {
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length > 2 && pathParts[1] !== '') {
        return '/' + pathParts[1] + '/';
    }
    return '/';
}

function getPageFromPath() {
    const path = window.location.pathname;
    const relativePath = path.replace(basePath, '');
    const cleanPath = relativePath.replace(/\/$/, '');
    if (cleanPath === '' || cleanPath === 'home') return 'home';
    const validPages = ['home', 'products', 'about', 'contact', 'blog'];
    if (validPages.includes(cleanPath)) return cleanPath;
    return 'home';
}

function initRouter(data, renderPage) {
    appData = data;
    basePath = getBasePath();
    renderPageCallback = renderPage; // store for later use

    function navigateTo(page, replaceState = false) {
        if (page === currentPage && page !== 'home') return;

        const pageDataMap = {
            home: 'data/testimonials.yaml',
            products: 'data/software.yaml',
            about: null,
            contact: null,
            blog: 'data/blog.yaml'
        };

        const yamlUrl = pageDataMap[page];
        if (yamlUrl) {
            loadYaml(yamlUrl).then((data) => {
                renderPageCallback(page, data || {}, appData);
            }).catch(() => {
                renderPageCallback(page, {}, appData);
            });
        } else {
            renderPageCallback(page, {}, appData);
        }

        const pageSegment = page === 'home' ? '' : page;
        const base = basePath.endsWith('/') ? basePath : basePath + '/';
        const url = `${base}${pageSegment}`;

        if (replaceState) {
            history.replaceState({ page }, '', url);
        } else {
            history.pushState({ page }, '', url);
        }

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
        const page = e.state?.page || getPageFromPath();
        navigateTo(page, true);
    });

    // Expose navigateTo globally
    window.navigateTo = navigateTo;

    // Initial page load
    const initialPage = getPageFromPath();
    navigateTo(initialPage, true);
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    if (hamburger) hamburger.classList.remove('open');
    if (mainNav) mainNav.classList.remove('open');
}