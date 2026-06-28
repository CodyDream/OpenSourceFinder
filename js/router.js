/**
 * router.js
 * Handles SPA routing with base path support.
 */

let currentPage = 'home';
let appData = {};
let basePath = '';

/**
 * Determine the base path for the application.
 * For GitHub Pages subdirectory, this will be '/OpenSourceFinder/'
 * For root domain, it will be ''.
 */
function getBasePath() {
    const pathParts = window.location.pathname.split('/');
    // If the path has more than one segment (e.g., /OpenSourceFinder/...)
    if (pathParts.length > 2 && pathParts[1] !== '') {
        return '/' + pathParts[1] + '/';
    }
    return '/';
}

function initRouter(data, renderPage) {
    appData = data;
    basePath = getBasePath();

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

    // Handle back/forward browser buttons
    window.addEventListener('popstate', (e) => {
        const page = e.state?.page || getPageFromPath();
        navigateTo(page, true);
    });

    // Initial page load – determine page from current URL
    const initialPage = getPageFromPath();
    navigateTo(initialPage, true);
}

/**
 * Extract the page name from the current URL path.
 * e.g., /OpenSourceFinder/products → 'products'
 *       /OpenSourceFinder/ → 'home'
 */
function getPageFromPath() {
    const path = window.location.pathname;
    // Remove the base path from the beginning
    const relativePath = path.replace(basePath, '');
    // Remove trailing slash
    const cleanPath = relativePath.replace(/\/$/, '');
    if (cleanPath === '' || cleanPath === 'home') {
        return 'home';
    }
    // If the path matches one of our pages, return it
    const validPages = ['home', 'products', 'about', 'contact', 'blog'];
    if (validPages.includes(cleanPath)) {
        return cleanPath;
    }
    return 'home';
}

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
            renderPage(page, data || {}, appData);
        }).catch(() => {
            renderPage(page, {}, appData);
        });
    } else {
        renderPage(page, {}, appData);
    }

    // Build the URL with base path
    const pageSegment = page === 'home' ? '' : page;
    // Ensure basePath ends with '/'
    const base = basePath.endsWith('/') ? basePath : basePath + '/';
    const url = `${base}${pageSegment}`;

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

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    if (hamburger) hamburger.classList.remove('open');
    if (mainNav) mainNav.classList.remove('open');
}

window.navigateTo = navigateTo;