"use strict";
/*
Accessible language switcher progressive enhancement.
- Intercepts clicks on [data-lang-link] to switch language without reload.
- Uses window.__setLang (from lang-bootstrap) to apply language and persist.
- Updates URL ?lang= param via History API while preserving other params.
- Updates ARIA states (aria-current/aria-pressed) and visual classes for current language.
- Degrades gracefully: if JS is disabled, links still navigate with ?lang=.
*/
class LangSwitcher {
    constructor() {
        this.supportedLanguages = ['en', 'es'];
        this.onClick = (e) => {
            const element = e.currentTarget;
            const target = element === null || element === void 0 ? void 0 : element.getAttribute('data-lang-link');
            if (!target)
                return;
            e.preventDefault();
            try {
                const setLang = window.__setLang;
                if (typeof setLang === 'function') {
                    setLang(target);
                }
                this.updateURLParam(target);
                this.updateSwitcherUI(target);
                // Track language switch event in RUM
                if (window.recordRumEvent) {
                    window.recordRumEvent('language_switch', { to_lang: target });
                }
            }
            catch (e2) {
                // Fallback to navigation if anything fails
                const href = element.getAttribute('href');
                if (href) {
                    window.location.href = href;
                }
            }
        };
        this.onKeyDown = (e) => {
            var _a;
            // Support Enter/Space for keyboard activation
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.click();
            }
        };
        this.init();
    }
    getCurrentLang() {
        var _a;
        const lang = (_a = document.documentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('lang');
        return this.supportedLanguages.includes(lang) ? lang : 'en';
    }
    updateURLParam(lang) {
        try {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            // Preserve hash
            const newUrl = url.pathname + '?' + url.searchParams.toString() + (window.location.hash || '');
            window.history.replaceState({}, '', newUrl);
        }
        catch (e) {
            // Ignore errors
        }
    }
    updateSwitcherUI(lang) {
        try {
            const links = document.querySelectorAll('[data-lang-link]');
            if (!links)
                return;
            for (let i = 0; i < links.length; i++) {
                const element = links[i];
                const target = element.getAttribute('data-lang-link');
                const isActive = target === lang;
                if (isActive) {
                    element.setAttribute('aria-current', 'true');
                    element.setAttribute('aria-pressed', 'true');
                    element.classList.add('text-sky-700', 'font-semibold');
                }
                else {
                    element.removeAttribute('aria-current');
                    element.setAttribute('aria-pressed', 'false');
                    element.classList.remove('text-sky-700', 'font-semibold');
                }
            }
        }
        catch (e) {
            // Ignore errors
        }
    }
    init() {
        const container = document.querySelector('[data-lang-switcher]');
        if (container) {
            // Accessibility attributes on container
            container.setAttribute('role', 'group');
            container.setAttribute('aria-label', 'Language selector');
        }
        const links = document.querySelectorAll('[data-lang-link]');
        for (let i = 0; i < links.length; i++) {
            const element = links[i];
            element.setAttribute('role', 'button');
            element.setAttribute('aria-pressed', 'false');
            element.addEventListener('click', this.onClick, false);
            element.addEventListener('keydown', this.onKeyDown, false);
        }
        this.updateSwitcherUI(this.getCurrentLang());
    }
}
// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LangSwitcher(), { once: true });
}
else {
    new LangSwitcher();
}
//# sourceMappingURL=lang-switcher.js.map