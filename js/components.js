/**
 * components.js
 * Rendering functions for each page – includes tag and alternative search.
 */

function renderHome(testimonialsData, siteData) {
    const container = document.getElementById('pageContent');
    const hero = siteData?.hero || {};
    const featured = siteData?.featured || [];
    const stats = siteData?.stats || [];
    const testimonials = testimonialsData?.testimonials || [];

    let html = `
        <!-- HERO -->
        <section class="hero" id="homeHero">
            <div class="hero-bg"></div>
            <div class="orb orb-1"></div>
            <div class="orb orb-2"></div>
            <div class="container hero-content parallax-layer" data-depth="0.15">
                <div class="hero-badge">${hero.badge || '<i class="fas fa-star"></i> Curated for you'}</div>
                <h1>${hero.title || 'Discover the best <span class="highlight">Open Source</span> tools'}</h1>
                <p>${hero.subtitle || 'A handpicked collection of the most reputable open source softwares.'}</p>
                <div class="hero-actions">
                    <a href="#" class="btn btn-primary" data-page="products"><i class="fas fa-rocket"></i> Explore Software</a>
                    <a href="#" class="btn btn-outline" data-page="about"><i class="fas fa-info-circle"></i> Learn More</a>
                </div>
            </div>
        </section>

        <!-- FEATURED SOFTWARE -->
        <section class="section">
            <div class="container">
                <div class="text-center">
                    <span class="section-label"><i class="fas fa-crown"></i> Featured</span>
                    <h2 class="section-title">Popular open source picks</h2>
                    <p class="section-subtitle">Tools that have earned their reputation through quality, community, and innovation.</p>
                </div>
                <div class="featured-grid" id="featuredGrid">
    `;

    if (featured.length === 0) {
        html += `<p style="grid-column:1/-1;text-align:center;color:var(--color-text-muted);">No featured software at the moment.</p>`;
    } else {
        featured.forEach(item => {
            const alternatives = item.alternatives || [];
            const altHtml = alternatives.length > 0
                ? `<div class="alternatives" style="font-size:0.8rem;color:var(--color-text-muted);margin-top:4px;">
                        <i class="fas fa-exchange-alt" style="margin-right:4px;"></i>
                        Alternative to: ${alternatives.join(', ')}
                   </div>`
                : '';
            html += `
                <div class="software-card glass-card">
                    <div class="icon-wrap"><i class="${item.icon || 'fas fa-cube'}"></i></div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    ${altHtml}
                    <div class="meta">
                        <span><i class="fas fa-star"></i> ${item.stars || '—'}</span>
                        <span><i class="fas fa-download"></i> ${item.downloads || '—'}</span>
                        <span class="tag">${item.category || 'general'}</span>
                    </div>
                    <div class="action-links">
                        ${item.officialSite ? `<a href="${item.officialSite}" target="_blank"><i class="fas fa-globe"></i> Website</a>` : ''}
                        ${item.downloadUrl ? `<a href="${item.downloadUrl}" target="_blank"><i class="fas fa-download"></i> Download</a>` : ''}
                    </div>
                </div>
            `;
        });
    }

    html += `
                </div>
                <div class="text-center mt-32">
                    <a href="#" class="btn btn-outline" data-page="products"><i class="fas fa-th-list"></i> View All Software</a>
                </div>
            </div>
        </section>

        <!-- STATISTICS -->
        <section class="section" style="padding-top:0;">
            <div class="container">
                <div class="glass-card" style="padding: 40px 24px;">
                    <div class="text-center">
                        <span class="section-label"><i class="fas fa-chart-line"></i> Our impact</span>
                        <h2 class="section-title" style="font-size:1.8rem;">Open source by the numbers</h2>
                    </div>
                    <div class="stats-grid" id="statsGrid">
    `;

    if (stats.length === 0) {
        html += `<p style="grid-column:1/-1;text-align:center;color:var(--color-text-muted);">No statistics available.</p>`;
    } else {
        stats.forEach(stat => {
            html += `
                <div class="stat-item">
                    <div class="stat-number" data-count="${stat.value}">0</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `;
        });
    }

    html += `
                    </div>
                </div>
            </div>
        </section>

        <!-- TESTIMONIALS CAROUSEL -->
        <section class="section" style="padding-top:0;">
            <div class="container">
                <div class="text-center">
                    <span class="section-label"><i class="fas fa-quote-left"></i> Testimonials</span>
                    <h2 class="section-title">What our community says</h2>
                </div>
                <div class="testimonial-carousel glass-card" id="testimonialCarousel">
                    <div class="carousel-track" id="carouselTrack">
    `;

    if (testimonials.length === 0) {
        html += `<div class="testimonial-slide"><p style="color:var(--color-text-muted);">No testimonials yet.</p></div>`;
    } else {
        testimonials.forEach((t) => {
            html += `
                <div class="testimonial-slide">
                    <div class="quote"><i class="fas fa-quote-left"></i> ${t.quote} <i class="fas fa-quote-right"></i></div>
                    <div class="author">${t.author}</div>
                    <div class="role">${t.role}</div>
                </div>
            `;
        });
    }

    html += `
                    </div>
                    <div class="carousel-dots" id="carouselDots"></div>
                    <div class="carousel-controls">
                        <button id="carouselPrev" aria-label="Previous testimonial"><i class="fas fa-chevron-left"></i></button>
                        <button id="carouselNext" aria-label="Next testimonial"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </section>

        <!-- NEWSLETTER -->
        <section class="section" style="padding-top:0;">
            <div class="container">
                <div class="newsletter-wrap text-center">
                    <span class="section-label"><i class="fas fa-envelope"></i> Stay in the loop</span>
                    <h2 class="section-title" style="font-size:1.6rem;">Subscribe to our newsletter</h2>
                    <p style="color:var(--color-text-muted); max-width:480px; margin:0 auto;">Get the latest open source discoveries and updates delivered to your inbox.</p>
                    <form class="newsletter-form" id="newsletterForm" novalidate>
                        <input type="email" id="newsletterEmail" placeholder="Enter your email" required />
                        <button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Subscribe</button>
                    </form>
                    <div class="newsletter-success" id="newsletterSuccess"><i class="fas fa-check-circle" style="color:var(--color-accent);"></i> Thanks for subscribing!</div>
                </div>
            </div>
        </section>
    `;

    container.innerHTML = html;

    if (testimonials.length > 0) initCarousel(testimonials.length);
    if (stats.length > 0) animateStats();

    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value.trim();
            if (email && email.includes('@')) {
                document.getElementById('newsletterSuccess').classList.add('show');
                document.getElementById('newsletterEmail').value = '';
                setTimeout(() => {
                    document.getElementById('newsletterSuccess').classList.remove('show');
                }, 5000);
            }
        });
    }
}

function renderProducts(softwareData) {
    const container = document.getElementById('pageContent');
    const items = softwareData?.software || [];

    let html = `
        <section class="section">
            <div class="container">
                <div class="text-center">
                    <span class="section-label"><i class="fas fa-cubes"></i> Catalog</span>
                    <h2 class="section-title">All open source software</h2>
                    <p class="section-subtitle">Browse our curated collection of trusted open source tools.</p>
                </div>
                <div class="filter-bar" id="filterBar">
                    <span class="filter-label"><i class="fas fa-filter"></i> Filter:</span>
    `;

    const categories = ['all', ...new Set(items.map(item => item.category || 'general'))];
    categories.forEach(cat => {
        const active = cat === 'all' ? 'active' : '';
        html += `<button class="filter-btn ${active}" data-filter="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</button>`;
    });

    html += `
                    <input type="text" class="search-input" id="productSearch" placeholder="Search by name, tags, or alternatives (e.g., photoshop, 3ds max)…" />
                </div>
                <div class="products-grid" id="productsGrid">
    `;

    if (items.length === 0) {
        html += `<div style="grid-column:1/-1;text-align:center;padding:48px 0;color:var(--color-text-muted);">
                    <i class="fas fa-search" style="font-size:2rem;display:block;margin-bottom:12px;opacity:0.4;"></i>
                    No software found. Please check your data/software.yaml file.
                </div>`;
    } else {
        items.forEach(item => {
            // Build space-separated lowercased strings for tags and alternatives
            const tags = (item.tags || []).map(t => t.toLowerCase()).join(' ');
            const alternatives = (item.alternatives || []).map(a => a.toLowerCase()).join(' ');
            // Display alternatives on card (original case)
            const altDisplay = (item.alternatives || []).length > 0
                ? `<div class="alternatives" style="font-size:0.8rem;color:var(--color-text-muted);margin-top:4px;">
                        <i class="fas fa-exchange-alt" style="margin-right:4px;"></i>
                        Alternative to: ${item.alternatives.join(', ')}
                   </div>`
                : '';

            html += `
                <div class="software-card glass-card" 
                     data-category="${item.category || 'general'}" 
                     data-name="${item.name.toLowerCase()}"
                     data-tags="${tags}"
                     data-alternatives="${alternatives}">
                    <div class="icon-wrap"><i class="${item.icon || 'fas fa-cube'}"></i></div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    ${altDisplay}
                    <div class="meta">
                        <span><i class="fas fa-star"></i> ${item.stars || '—'}</span>
                        <span><i class="fas fa-download"></i> ${item.downloads || '—'}</span>
                        <span class="tag">${item.category || 'general'}</span>
                    </div>
                    <div class="action-links">
                        ${item.officialSite ? `<a href="${item.officialSite}" target="_blank"><i class="fas fa-globe"></i> Website</a>` : ''}
                        ${item.downloadUrl ? `<a href="${item.downloadUrl}" target="_blank"><i class="fas fa-download"></i> Download</a>` : ''}
                        ${item.documentation ? `<a href="${item.documentation}" target="_blank"><i class="fas fa-book"></i> Docs</a>` : ''}
                        ${item.github ? `<a href="${item.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    </div>
                </div>
            `;
        });
    }

    html += `</div></div></section>`;
    container.innerHTML = html;

    if (items.length > 0) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('productSearch');
        const productCards = document.querySelectorAll('.software-card');

        function applyFilters() {
            const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
            const searchTerm = searchInput.value.toLowerCase().trim();
            productCards.forEach(card => {
                const category = card.dataset.category || 'general';
                const name = card.dataset.name || '';
                const tags = card.dataset.tags || '';
                const alternatives = card.dataset.alternatives || '';
                const matchCategory = activeFilter === 'all' || category === activeFilter;
                // Match if search term is empty, or if it's found in name, tags, or alternatives
                const matchSearch = searchTerm === '' ||
                                    name.includes(searchTerm) ||
                                    tags.includes(searchTerm) ||
                                    alternatives.includes(searchTerm);
                card.style.display = (matchCategory && matchSearch) ? 'flex' : 'none';
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilters();
            });
        });

        searchInput.addEventListener('input', applyFilters);
    }
}

function renderAbout(siteData) {
    const container = document.getElementById('pageContent');
    const about = siteData?.about || {};

    container.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="text-center">
                    <span class="section-label"><i class="fas fa-heart"></i> About us</span>
                    <h2 class="section-title">${about.title || 'Curating the best of open source'}</h2>
                    <p class="section-subtitle">${about.subtitle || 'We believe in the power of open source.'}</p>
                </div>
                <div class="about-grid mt-24">
                    <div class="about-text">
                        <h2>${about.storyTitle || 'Our story'}</h2>
                        ${about.storyParagraphs ? about.storyParagraphs.map(p => `<p>${p}</p>`).join('') : '<p>We started with a simple mission: to curate the best open source tools.</p>'}
                    </div>
                    <div class="about-image">
                        <img src="https://picsum.photos/seed/opensource/600/400" alt="Team" loading="lazy" />
                    </div>
                </div>
                <div class="about-grid reverse mt-32">
                    <div class="about-image">
                        <img src="https://picsum.photos/seed/community/600/400" alt="Community" loading="lazy" />
                    </div>
                    <div class="about-text">
                        <h2>${about.valuesTitle || 'Our values'}</h2>
                        <p>${about.valuesSubtitle || 'We are guided by core values.'}</p>
                        <div class="values-list">
                            ${(about.values || []).map(v => `
                                <div class="value-item">
                                    <i class="${v.icon || 'fas fa-check'}"></i>
                                    <h4>${v.title}</h4>
                                    <p>${v.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderContact() {
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="text-center">
                    <span class="section-label"><i class="fas fa-comment-dots"></i> Get in touch</span>
                    <h2 class="section-title">We'd love to hear from you</h2>
                    <p class="section-subtitle">Have a suggestion, question, or feedback? Reach out to us.</p>
                </div>
                <div class="contact-wrap mt-24">
                    <div class="contact-info">
                        <div class="info-item"><i class="fas fa-map-marker-alt"></i><div><h4>Location</h4><p>San Francisco, CA &bull; Remote-first</p></div></div>
                        <div class="info-item"><i class="fas fa-envelope"></i><div><h4>Email</h4><p>hello@opensourcesoftwares.example</p></div></div>
                        <div class="info-item"><i class="fas fa-clock"></i><div><h4>Response time</h4><p>Usually within 24 hours</p></div></div>
                        <div class="info-item"><i class="fas fa-globe"></i><div><h4>Social</h4><div style="display:flex;gap:10px;margin-top:4px;"><a href="#" style="color:var(--color-text-muted);font-size:1.2rem;"><i class="fab fa-github"></i></a><a href="#" style="color:var(--color-text-muted);font-size:1.2rem;"><i class="fab fa-twitter"></i></a><a href="#" style="color:var(--color-text-muted);font-size:1.2rem;"><i class="fab fa-linkedin-in"></i></a><a href="#" style="color:var(--color-text-muted);font-size:1.2rem;"><i class="fab fa-youtube"></i></a></div></div></div>
                    </div>
                    <form class="contact-form" id="contactForm" novalidate>
                        <div class="form-group"><label for="contactName">Your name</label><input type="text" id="contactName" placeholder="Jane Doe" required /></div>
                        <div class="form-group"><label for="contactEmail">Email address</label><input type="email" id="contactEmail" placeholder="jane@example.com" required /></div>
                        <div class="form-group"><label for="contactMessage">Message</label><textarea id="contactMessage" placeholder="Tell us what's on your mind…" required></textarea></div>
                        <button type="submit" class="btn btn-primary" style="align-self:flex-start;"><i class="fas fa-paper-plane"></i> Send Message</button>
                        <div id="contactSuccess" style="display:none;color:var(--color-accent-light);font-weight:500;margin-top:4px;"><i class="fas fa-check-circle"></i> Thanks! We'll get back to you soon.</div>
                    </form>
                </div>
            </div>
        </section>
    `;

    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        if (name && email && message && email.includes('@')) {
            document.getElementById('contactSuccess').style.display = 'block';
            document.getElementById('contactForm').reset();
            setTimeout(() => {
                document.getElementById('contactSuccess').style.display = 'none';
            }, 6000);
        }
    });
}

function renderBlog(blogData) {
    const container = document.getElementById('pageContent');
    const posts = blogData?.posts || [];

    container.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="text-center">
                    <span class="section-label"><i class="fas fa-pen-fancy"></i> Resources</span>
                    <h2 class="section-title">Open source insights</h2>
                    <p class="section-subtitle">Articles, guides, and stories from the open source community.</p>
                </div>
                <div class="blog-grid">
                    ${posts.length === 0 ? '<p style="grid-column:1/-1;text-align:center;color:var(--color-text-muted);">No blog posts yet.</p>' :
                    posts.map(post => `
                        <div class="blog-card glass-card">
                            <div class="blog-img"><i class="${post.icon || 'fas fa-file-alt'}"></i></div>
                            <div class="blog-body">
                                <div class="blog-meta">${post.date}</div>
                                <h3>${post.title}</h3>
                                <p>${post.excerpt}</p>
                                <a href="#" class="read-more">Read more <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

// Carousel and Stats helpers (unchanged)
let carouselInterval = null;
function initCarousel(totalSlides) {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    if (!track || !dotsContainer || totalSlides === 0) return;

    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.dataset.index = i;
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    let currentIndex = 0;
    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dotsContainer.querySelectorAll('span').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        resetInterval();
    }

    function resetInterval() {
        if (carouselInterval) clearInterval(carouselInterval);
        carouselInterval = setInterval(() => goToSlide(currentIndex + 1), 6000);
    }

    prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); resetInterval(); });
    nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); resetInterval(); });
    resetInterval();
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(el => {
        const target = parseFloat(el.dataset.count);
        if (isNaN(target)) return;
        const duration = 2000;
        const startTime = performance.now();
        function updateCounter(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            if (Number.isInteger(target)) {
                el.textContent = Math.floor(current);
            } else {
                el.textContent = current.toFixed(1);
            }
            if (progress < 1) requestAnimationFrame(updateCounter);
            else el.textContent = target;
        }
        requestAnimationFrame(updateCounter);
    });
}

// Expose render functions globally
window.renderHome = renderHome;
window.renderProducts = renderProducts;
window.renderAbout = renderAbout;
window.renderContact = renderContact;
window.renderBlog = renderBlog;