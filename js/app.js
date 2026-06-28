/**
 * app.js
 * Initializes the application with better error handling and smooth parallax.
 */

(async function initApp() {
    // Load site.yaml
  const siteData = await loadYaml('data/site.yaml');
    if (!siteData) {
        console.error('Failed to load site.yaml – check your server.');
        document.getElementById('pageContent').innerHTML = `
            <div style="text-align:center;padding:80px 20px;color:var(--color-text-muted);">
                <i class="fas fa-exclamation-triangle" style="font-size:4rem;color:var(--color-accent);"></i>
                <h2 style="margin-top:20px;">Configuration file missing</h2>
                <p>Please ensure data/site.yaml exists and is accessible.</p>
                <p style="font-size:0.9rem;">If you're opening this file directly, use a local server (e.g., Live Server).</p>
            </div>
        `;
        return;
    }

    // Build navigation
    const nav = document.getElementById('mainNav');
    if (nav && siteData.navigation) {
        nav.innerHTML = siteData.navigation.map(item =>
            `<a href="#" data-page="${item.page}" class="${item.page === 'home' ? 'active' : ''}">${item.label}</a>`
        ).join('');
    }

    // Build footer
    const footerGrid = document.getElementById('footerGrid');
    if (footerGrid && siteData.footer) {
        const cols = siteData.footer.columns || [];
        footerGrid.innerHTML = cols.map(col => `
            <div class="footer-col">
                <h4>${col.heading}</h4>
                ${col.links ? col.links.map(link =>
                    `<a href="${link.url}" ${link.page ? `data-page="${link.page}"` : `target="${link.target || '_self'}"`}>${link.label}</a>`
                ).join('') : ''}
            </div>
        `).join('');

        const brand = siteData.footer.brand || {};
        const social = siteData.footer.social || [];
        const brandHtml = `
            <div class="footer-brand">
                <div class="logo"><i class="fas fa-code"></i> Open<span>Source</span></div>
                <p>${brand.description || 'Find What you want in open source.'}</p>
                <div class="footer-social">
                    ${social.map(s => `<a href="${s.url}" aria-label="${s.label}"><i class="${s.icon}"></i></a>`).join('')}
                </div>
            </div>
        `;
        footerGrid.insertAdjacentHTML('afterbegin', brandHtml);
    }

    const footerBottom = document.getElementById('footerBottom');
    if (footerBottom && siteData.footer) {
        footerBottom.innerHTML = `
            <span>${siteData.footer.copyright || '© 2026 Open Source Softwares.'}</span>
            <span>${siteData.footer.credit || 'Open source forever'}</span>
        `;
    }

    // Define page renderer
    function renderPage(page, pageData, siteData) {
        console.log(`Rendering page: ${page}`, pageData);
        switch (page) {
            case 'home': renderHome(pageData, siteData); break;
            case 'products': renderProducts(pageData); break;
            case 'about': renderAbout(siteData); break;
            case 'contact': renderContact(); break;
            case 'blog': renderBlog(pageData); break;
            default: renderHome(pageData, siteData);
        }
        attachBackToTop();
    }

    // Initialize router
    initRouter(siteData, renderPage);

    // Back to top
    function attachBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 400);
        });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    attachBackToTop();

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            mainNav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mainNav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== SMOOTH PARALLAX (requestAnimationFrame) =====
    let parallaxFrame = null;
    let lastMouseX = 0;
    let lastMouseY = 0;

    document.addEventListener('mousemove', (e) => {
        // Throttle with requestAnimationFrame
        if (parallaxFrame) return;
        parallaxFrame = requestAnimationFrame(() => {
            const layers = document.querySelectorAll('.parallax-layer');
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            layers.forEach((layer) => {
                const depth = parseFloat(layer.dataset.depth) || 0.15;
                const moveX = x * depth * 20;
                const moveY = y * depth * 20;
                layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            parallaxFrame = null;
        });
    });

    console.log('🚀 Open Source Softwares — modular SPA ready.');
})();