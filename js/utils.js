/**
 * NEXUS 2026 - Utility Functions
 * Helpers, DOM manipulation, event handling
 */

// ========== DOM MANIPULATION ==========

/**
 * Safely select element
 */
function $(selector) {
    return document.querySelector(selector);
}

/**
 * Safely select all elements
 */
function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Create element with attributes
 */
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    Object.assign(element, attributes);
    if (content) element.innerHTML = content;
    return element;
}

/**
 * Add class to element
 */
function addClass(element, className) {
    if (element) element.classList.add(className);
}

/**
 * Remove class from element
 */
function removeClass(element, className) {
    if (element) element.classList.remove(className);
}

/**
 * Toggle class on element
 */
function toggleClass(element, className) {
    if (element) element.classList.toggle(className);
}

/**
 * Check if element has class
 */
function hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
}

/**
 * Set style properties
 */
function setStyle(element, styles) {
    if (element) Object.assign(element.style, styles);
}

/**
 * Get computed style
 */
function getStyle(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Show element
 */
function show(element) {
    if (element) removeClass(element, 'hidden');
}

/**
 * Hide element
 */
function hide(element) {
    if (element) addClass(element, 'hidden');
}

/**
 * Toggle visibility
 */
function toggleVisibility(element) {
    if (element) toggleClass(element, 'hidden');
}

// ========== EVENT HANDLING ==========

/**
 * Add event listener
 */
function on(element, event, callback) {
    if (element) element.addEventListener(event, callback);
}

/**
 * Remove event listener
 */
function off(element, event, callback) {
    if (element) element.removeEventListener(event, callback);
}

/**
 * Delegate event
 */
function delegate(parent, selector, event, callback) {
    if (parent) {
        parent.addEventListener(event, (e) => {
            if (e.target.matches(selector)) callback(e);
        });
    }
}

/**
 * Trigger custom event
 */
function trigger(element, eventName, detail = {}) {
    if (element) {
        element.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true }));
    }
}

// ========== TIMING & ANIMATION ==========

/**
 * Debounce function
 */
function debounce(func, delay = 300) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

/**
 * Throttle function
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Request animation frame wrapper
 */
function animate(callback) {
    return requestAnimationFrame(callback);
}

/**
 * Cancel animation frame
 */
function cancelAnimate(id) {
    cancelAnimationFrame(id);
}

/**
 * Sleep (promise-based delay)
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ========== ARRAY & OBJECT UTILITIES ==========

/**
 * Shuffle array
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Unique array values
 */
function unique(array) {
    return [...new Set(array)];
}

/**
 * Group array by property
 */
function groupBy(array, property) {
    return array.reduce((groups, item) => {
        const key = item[property];
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
        return groups;
    }, {});
}

/**
 * Sort array
 */
function sortBy(array, property, order = 'asc') {
    return [...array].sort((a, b) => {
        const aVal = a[property];
        const bVal = b[property];
        return order === 'asc' ? aVal - bVal : bVal - aVal;
    });
}

/**
 * Filter by property
 */
function filterBy(array, property, value) {
    return array.filter((item) => item[property] === value);
}

/**
 * Map to new array
 */
function mapTo(array, property) {
    return array.map((item) => item[property]);
}

/**
 * Deep clone object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// ========== MATH UTILITIES ==========

/**
 * Calculate percentage
 */
function calculatePercent(value, total) {
    return (value / total) * 100;
}

/**
 * Generate random number
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp number between min and max
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Smooth interpolation
 */
function lerp(start, end, t) {
    return start + (end - start) * t;
}

// ========== STORAGE UTILITIES ==========

/**
 * Get from localStorage
 */
function getStorage(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * Set to localStorage
 */
function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

/**
 * Remove from localStorage
 */
function removeStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch {
        return false;
    }
}

/**
 * Clear localStorage
 */
function clearStorage() {
    try {
        localStorage.clear();
        return true;
    } catch {
        return false;
    }
}

// ========== NOTIFICATIONS ==========

/**
 * Show notification/toast
 */
function notify(message, type = 'info', duration = 3000) {
    const notification = createElement(
        'div',
        {
            className: `notification notification-${type}`,
        },
        message
    );
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, duration);
}

/**
 * Show success notification
 */
function notifySuccess(message) {
    notify(message, 'success');
}

/**
 * Show error notification
 */
function notifyError(message) {
    notify(message, 'error');
}

/**
 * Show warning notification
 */
function notifyWarning(message) {
    notify(message, 'warning');
}

/**
 * Show info notification
 */
function notifyInfo(message) {
    notify(message, 'info');
}

// ========== LOGGING ==========

/**
 * Console log with style
 */
function log(message, style = 'default') {
    const styles = {
        default: 'color: #00d9ff; font-weight: bold;',
        success: 'color: #39ff14; font-weight: bold;',
        error: 'color: #ff0033; font-weight: bold;',
        warning: 'color: #ffd700; font-weight: bold;',
        info: 'color: #b300ff; font-weight: bold;',
    };
    console.log(`%c[NEXUS] ${message}`, styles[style] || styles.default);
}

/**
 * Debug log (only in debug mode)
 */
function debug(message) {
    if (NEXUS_CONFIG && NEXUS_CONFIG.DEBUG_MODE) {
        console.log(`%c[DEBUG] ${message}`, 'color: #4dd0e1; font-style: italic;');
    }
}

// ========== FETCH UTILITIES ==========

/**
 * Fetch wrapper with timeout
 */
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

/**
 * JSON fetch
 */
async function fetchJSON(url, options = {}) {
    const response = await fetchWithTimeout(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

// ========== BROWSER DETECTION ==========

/**
 * Get browser info
 */
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';

    if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') > -1) browser = 'Safari';
    else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (ua.indexOf('Edge') > -1) browser = 'Edge';

    return {
        browser,
        platform: navigator.platform,
        language: navigator.language,
        online: navigator.onLine,
    };
}

/**
 * Check if mobile
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

/**
 * Check if dark mode enabled
 */
function isDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Export functions (for Node.js if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        $,
        $$,
        createElement,
        addClass,
        removeClass,
        toggleClass,
        hasClass,
        setStyle,
        getStyle,
        show,
        hide,
        toggleVisibility,
        on,
        off,
        delegate,
        trigger,
        debounce,
        throttle,
        animate,
        cancelAnimate,
        sleep,
        shuffle,
        unique,
        groupBy,
        sortBy,
        filterBy,
        mapTo,
        deepClone,
        calculatePercent,
        random,
        clamp,
        lerp,
        getStorage,
        setStorage,
        removeStorage,
        clearStorage,
        notify,
        notifySuccess,
        notifyError,
        notifyWarning,
        notifyInfo,
        log,
        debug,
        fetchWithTimeout,
        fetchJSON,
        getBrowserInfo,
        isMobile,
        isDarkMode,
    };
}
