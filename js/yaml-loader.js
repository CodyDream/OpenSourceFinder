/**
 * yaml-loader.js
 * Loads YAML files with automatic base path detection.
 */
const YAML = window.jsyaml;

/**
 * Fetch and parse a YAML file.
 * Works both locally and on GitHub Pages subdirectories.
 * @param {string} url - relative path (e.g., "data/software.yaml")
 * @returns {Promise<Object>} parsed data, or null on error
 */
async function loadYaml(url) {
    try {
        // Detect if we're in a GitHub Pages subdirectory
        // e.g., https://codydream.github.io/OpenSourceFinder/
        const pathParts = window.location.pathname.split('/');
        // If the path contains more than one segment, use the first as base
        // This covers both root (username.github.io) and subdirectories
        let base = '';
        if (pathParts.length > 2 && pathParts[1] !== '') {
            // We're in a subdirectory like /OpenSourceFinder/
            base = '/' + pathParts[1] + '/';
        }
        // If you know your repo name, you can hardcode it instead:
        // const base = '/OpenSourceFinder/';
        
        const fullUrl = base + url;
        console.log(`Fetching: ${fullUrl}`);

        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} – ${response.statusText}`);
        }
        const text = await response.text();
        const data = YAML.load(text);
        console.log(`✅ Loaded ${url}`, data);
        return data;
    } catch (error) {
        console.error(`❌ Error loading YAML from ${url}:`, error);
        // Show a visible warning in the page (optional)
        const pageContent = document.getElementById('pageContent');
        if (pageContent && !pageContent.innerHTML.trim()) {
            pageContent.innerHTML = `
                <div style="text-align:center;padding:60px 20px;color:var(--color-text-muted);">
                    <i class="fas fa-exclamation-triangle" style="font-size:3rem;color:var(--color-accent);"></i>
                    <h2 style="margin-top:16px;">Could not load data</h2>
                    <p>Please serve this site via a local web server (e.g., Live Server) so YAML files can be fetched.</p>
                    <p style="font-size:0.9rem;margin-top:8px;">Error: ${error.message}</p>
                </div>
            `;
        }
        return null;
    }
}