/**
 * NEXUS 2026 - Main Application
 * Dashboard orchestration and event management
 */

class NexusApp {
    constructor() {
        this.initialized = false;
        this.isDarkMode = true;
        this.soundEnabled = true;
        this.animationsEnabled = true;

        this.init();
    }

    init() {
        log('Initializing NEXUS 2026...', 'info');

        // Setup UI
        this.setupEventListeners();
        this.loadSettings();
        this.startDataRefresh();

        this.initialized = true;
        log('NEXUS 2026 initialized successfully', 'success');
    }

    setupEventListeners() {
        // Settings button
        const btnSettings = $('#btn-settings');
        if (btnSettings) {
            on(btnSettings, 'click', () => this.toggleSettings());
        }

        // Fullscreen button
        const btnFullscreen = $('#btn-fullscreen');
        if (btnFullscreen) {
            on(btnFullscreen, 'click', () => this.toggleFullscreen());
        }

        // Dark mode button
        const btnDarkMode = $('#btn-dark-mode');
        if (btnDarkMode) {
            on(btnDarkMode, 'click', () => this.toggleDarkMode());
        }

        // Ask AXIOM button
        const btnAsk = $('#btn-ask');
        if (btnAsk) {
            on(btnAsk, 'click', () => this.askAXIOM());
        }

        // Emergency exit button
        const btnEmergency = $('#btn-emergency-exit');
        if (btnEmergency) {
            on(btnEmergency, 'click', () => this.emergencyExit());
        }

        // Settings checkboxes
        const toggleGlobeRotation = $('#toggle-globe-rotation');
        if (toggleGlobeRotation) {
            on(toggleGlobeRotation, 'change', (e) => {
                if (globeInstance) globeInstance.setAutoRotate(e.target.checked);
            });
        }

        const toggleSound = $('#toggle-sound');
        if (toggleSound) {
            on(toggleSound, 'change', (e) => {
                this.soundEnabled = e.target.checked;
            });
        }

        const toggleAnimations = $('#toggle-animations');
        if (toggleAnimations) {
            on(toggleAnimations, 'change', (e) => {
                this.animationsEnabled = e.target.checked;
            });
        }

        // Modal close button
        const btnCloseSettings = $('#btn-close-settings');
        if (btnCloseSettings) {
            on(btnCloseSettings, 'click', () => this.toggleSettings());
        }

        // Modal overlay click
        const modalOverlay = $('#modal-overlay');
        if (modalOverlay) {
            on(modalOverlay, 'click', () => this.toggleSettings());
        }

        // AI Input enter key
        const aiInput = $('#ai-input');
        if (aiInput) {
            on(aiInput, 'keypress', (e) => {
                if (e.key === 'Enter') this.askAXIOM();
            });
        }
    }

    toggleSettings() {
        const modal = $('#modal-settings');
        const overlay = $('#modal-overlay');
        if (modal && overlay) {
            toggleClass(modal, 'hidden');
            toggleClass(overlay, 'hidden');
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.style.colorScheme = this.isDarkMode ? 'dark' : 'light';
        setStorage('darkMode', this.isDarkMode);
    }

    askAXIOM() {
        const input = $('#ai-input');
        const response = $('#ai-response');

        if (input && response) {
            const query = input.value.toLowerCase();

            let answer = MOCK_DATA.aiResponses.default;

            if (query.includes('apple')) answer = MOCK_DATA.aiResponses.apple;
            else if (query.includes('market')) answer = MOCK_DATA.aiResponses.market;
            else if (query.includes('crash')) answer = MOCK_DATA.aiResponses.crash;

            response.textContent = answer;
            input.value = '';

            // Add animation
            addClass(response, 'glow-text');
            setTimeout(() => removeClass(response, 'glow-text'), 1000);
        }
    }

    emergencyExit() {
        // Trigger emergency protocol animation
        const btn = $('#btn-emergency-exit');
        if (btn) {
            addClass(btn, 'pulse');
            notifyWarning('EMERGENCY PROTOCOL ACTIVATED - Liquidating positions...');
            log('Emergency exit initiated', 'warning');
        }
    }

    loadSettings() {
        const darkMode = getStorage('darkMode', true);
        this.isDarkMode = darkMode;

        const soundEnabled = getStorage('soundEnabled', true);
        this.soundEnabled = soundEnabled;

        const animationsEnabled = getStorage('animationsEnabled', true);
        this.animationsEnabled = animationsEnabled;
    }

    saveSettings() {
        setStorage('darkMode', this.isDarkMode);
        setStorage('soundEnabled', this.soundEnabled);
        setStorage('animationsEnabled', this.animationsEnabled);
    }

    startDataRefresh() {
        // Refresh data every 5 seconds
        setInterval(async () => {
            const data = await nexusAPI.getAllData();
            this.updateDashboard(data);
        }, NEXUS_CONFIG.REFRESH_INTERVAL);
    }

    updateDashboard(data) {
        if (!data) return;

        // Update stocks
        this.updateStocks(data.stocks);
        // Update crypto
        this.updateCrypto(data.crypto);
        // Update news
        this.updateNews(data.news);
    }

    updateStocks(stocks) {
        const listContainer = $('#stocks-list');
        if (!listContainer || !stocks) return;

        listContainer.innerHTML = stocks.slice(0, 3).map((stock) => `
            <div class="stock-item">
                <div class="stock-symbol">${stock.symbol}</div>
                <div class="stock-price">${formatCurrency(stock.price)}</div>
                <div class="stock-change ${stock.change > 0 ? 'positive' : 'negative'}">
                    ${getChangeEmoji(stock.change)} ${formatPercent(stock.change)}
                </div>
            </div>
        `).join('');
    }

    updateCrypto(crypto) {
        const listContainer = $('#crypto-list');
        if (!listContainer || !crypto) return;

        listContainer.innerHTML = crypto.map((coin) => `
            <div class="crypto-item">
                <div class="crypto-name">${coin.name}</div>
                <div class="crypto-price">${formatCurrency(coin.price)}</div>
                <div class="crypto-change ${coin.change > 0 ? 'positive' : 'negative'}">
                    ${getChangeEmoji(coin.change)} ${formatPercent(coin.change)}
                </div>
            </div>
        `).join('');
    }

    updateNews(news) {
        const container = $('#alerts-container');
        if (!container || !news) return;

        container.innerHTML = news.slice(0, 3).map((item) => `
            <div class="alert-item alert-${item.impact.toLowerCase()}">
                <span class="alert-time">${getTimeAgo(item.timestamp)}</span>
                <p>${item.title}</p>
            </div>
        `).join('');
    }
}

// Initialize app when DOM is ready
let nexusApp = null;
document.addEventListener('DOMContentLoaded', () => {
    nexusApp = new NexusApp();
});

// Cleanup on unload
window.addEventListener('beforeunload', () => {
    if (nexusApp) nexusApp.saveSettings();
    if (globeInstance) globeInstance.dispose();
    if (nexusCharts) nexusCharts.destroyAll();
});