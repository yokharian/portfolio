"use strict";
/*
Client-side language bootstrap: determines initial language and applies it.
- Priority: ?lang= > path prefix (/en or /es) > localStorage > browser > default
- Persists the resolved language to localStorage.
- Updates <html lang> attribute.
- Normalizes header language links to include ?lang=.
*/
class LangBootstrap {
    constructor() {
        this.supportedLanguages = ['en', 'es'];
        this.storageKey = 'site.lang';
        this.init();
    }
    normalize(lang) {
        return this.supportedLanguages.includes(lang) ? lang : 'en';
    }
    getSearchLang(search) {
        if (!search)
            return null;
        try {
            const params = new URLSearchParams(search.charAt(0) === '?' ? search.slice(1) : search);
            const value = params.get('lang');
            return value ? this.normalize(value) : null;
        }
        catch (e) {
            return null;
        }
    }
    getPathLang(pathname) {
        if (!pathname)
            return null;
        const match = pathname.match(/^\/(en|es)(\/|$)/i);
        return match && match[1] ? this.normalize(match[1].toLowerCase()) : null;
    }
    detectBrowserLanguage(navigator) {
        const languages = (navigator && (navigator.languages || [navigator.language])) || [];
        for (let i = 0; i < languages.length; i++) {
            const code = languages[i];
            if (!code)
                continue;
            const base = String(code).slice(0, 2).toLowerCase();
            if (this.supportedLanguages.includes(base))
                return base;
        }
        return 'en';
    }
    getStoredLanguage() {
        try {
            return localStorage.getItem(this.storageKey);
        }
        catch (e) {
            return null;
        }
    }
    setStoredLanguage(lang) {
        try {
            localStorage.setItem(this.storageKey, this.normalize(lang));
        }
        catch (e) {
            // Ignore storage errors
        }
    }
    resolveInitialLanguage() {
        var _a, _b;
        const fromSearch = this.getSearchLang(((_a = window.location) === null || _a === void 0 ? void 0 : _a.search) || '');
        if (fromSearch)
            return fromSearch;
        const fromPath = this.getPathLang(((_b = window.location) === null || _b === void 0 ? void 0 : _b.pathname) || '');
        if (fromPath)
            return fromPath;
        const fromStore = this.getStoredLanguage();
        if (fromStore)
            return this.normalize(fromStore);
        return this.detectBrowserLanguage(navigator);
    }
    applyLanguage(lang) {
        const normalizedLang = this.normalize(lang);
        document.documentElement.setAttribute('lang', normalizedLang);
        try {
            if (document.body) {
                document.body.dataset.lang = normalizedLang;
            }
        }
        catch (e) {
            // Ignore errors
        }
        this.setStoredLanguage(normalizedLang);
        // Make header links point to current URL with ?lang= toggles
        const links = document.querySelectorAll('[data-lang-link]');
        if (links && links.length) {
            for (let i = 0; i < links.length; i++) {
                const element = links[i];
                const target = element.getAttribute('data-lang-link');
                if (target) {
                    const url = new URL(window.location.href);
                    url.searchParams.set('lang', target);
                    element.setAttribute('href', url.pathname + '?' + url.searchParams.toString());
                }
            }
        }
        // Ensure all internal links preserve current lang unless explicitly set
        try {
            const allLinks = document.querySelectorAll('a[href^="/"]:not([data-lang-link]):not([data-no-lang])');
            for (let j = 0; j < allLinks.length; j++) {
                const link = allLinks[j];
                const href = link.getAttribute('href');
                if (!href || href.indexOf('#') === 0)
                    continue;
                // Skip if it's a file (e.g., .css, .js, .png)
                if (/\.(css|js|png|jpg|jpeg|webp|svg|gif|pdf)$/i.test(href))
                    continue;
                const url = new URL(href, window.location.origin);
                if (!url.searchParams.get('lang')) {
                    url.searchParams.set('lang', normalizedLang);
                }
                link.setAttribute('href', url.pathname + (url.searchParams.toString() ? ('?' + url.searchParams.toString()) : '') + (url.hash || ''));
            }
        }
        catch (e) {
            // Ignore errors
        }
        // Dispatch a langchange event for other scripts
        try {
            document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: normalizedLang } }));
        }
        catch (e) {
            // Ignore errors
        }
    }
    init() {
        const initialLang = this.resolveInitialLanguage();
        this.applyLanguage(initialLang);
        // Expose a simple global to switch language on click
        window.__setLang = (lang) => this.applyLanguage(lang);
    }
}
// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LangBootstrap(), { once: true });
}
else {
    new LangBootstrap();
}
//# sourceMappingURL=lang-bootstrap.js.map