/*
Accessible language switcher progressive enhancement.
- Intercepts clicks on [data-lang-link] to switch language without reload.
- Uses window.__setLang (from lang-bootstrap) to apply language and persist.
- Updates URL ?lang= param via History API while preserving other params.
- Updates ARIA states (aria-current/aria-pressed) and visual classes for current language.
- Degrades gracefully: if JS is disabled, links still navigate with ?lang=.
*/

interface LangChangeEvent extends CustomEvent {
  detail: {
    lang: string;
  };
}

class LangSwitcher {
  private readonly supportedLanguages = ['en', 'es'] as const;

  constructor() {
    this.init();
  }

  private getCurrentLang(): string {
    const lang = document.documentElement?.getAttribute('lang');
    return this.supportedLanguages.includes(lang as any) ? lang! : 'en';
  }

  private onClick = (e: Event): void => {
    const element = e.currentTarget as HTMLElement;
    const target = element?.getAttribute('data-lang-link');
    if (!target) return;

    e.preventDefault();

    try {
      const setLang = (window as any).__setLang;
      if (typeof setLang === 'function') {
        setLang(target);
      }
      this.updateURLParam(target);
      this.updateSwitcherUI(target);
      
      // Track language switch event in RUM
      if ((window as any).recordRumEvent) {
        (window as any).recordRumEvent('language_switch', { to_lang: target });
      }
    } catch (e2) {
      // Fallback to navigation if anything fails
      const href = element.getAttribute('href');
      if (href) {
        window.location.href = href;
      }
    }
  };

  private onKeyDown = (e: KeyboardEvent): void => {
    // Support Enter/Space for keyboard activation
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      (e.currentTarget as HTMLElement)?.click();
    }
  };

  private updateURLParam(lang: string): void {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      // Preserve hash
      const newUrl = url.pathname + '?' + url.searchParams.toString() + (window.location.hash || '');
      window.history.replaceState({}, '', newUrl);
    } catch (e) {
      // Ignore errors
    }
  }

  private updateSwitcherUI(lang: string): void {
    try {
      const links = document.querySelectorAll('[data-lang-link]');
      if (!links) return;

      for (let i = 0; i < links.length; i++) {
        const element = links[i] as HTMLElement;
        const target = element.getAttribute('data-lang-link');
        const isActive = target === lang;

        if (isActive) {
          element.setAttribute('aria-current', 'true');
          element.setAttribute('aria-pressed', 'true');
          element.classList.add('text-sky-700', 'font-semibold');
        } else {
          element.removeAttribute('aria-current');
          element.setAttribute('aria-pressed', 'false');
          element.classList.remove('text-sky-700', 'font-semibold');
        }
      }
      // Animate text elements with data-i18n-key
      this.animateTextElements();
    } catch (e) {
      // Ignore errors
    }
  }

  private animateTextElements(): void {
    try {
      const elements = document.querySelectorAll('[data-i18n-key]');
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        // Add fade out effect
        element.style.opacity = '0.3';
        element.style.transform = 'translateY(10px)';

        // After a short delay, fade back in
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 150);
      }
    } catch (e) {
      // Ignore errors
    }
  }

  private init(): void {
    const container = document.querySelector('[data-lang-switcher]') as HTMLElement;
    if (container) {
      // Accessibility attributes on container
      container.setAttribute('role', 'group');
      container.setAttribute('aria-label', 'Language selector');
    }

    const links = document.querySelectorAll('[data-lang-link]');
    for (let i = 0; i < links.length; i++) {
      const element = links[i] as HTMLElement;
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
} else {
  new LangSwitcher();
}
