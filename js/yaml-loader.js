/**
 * yaml-loader.js
 * Loads YAML files via fetch and parses them with js-yaml.
 */
const YAML = window.jsyaml;

/**
 * Fetch and parse a YAML file.
 * @param {string} url - path to the YAML file
 * @returns {Promise<Object>} parsed data, or null on error
 */
async function loadYaml(url) {
    try {
        const response = await fetch(url);
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