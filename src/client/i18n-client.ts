/*
Client-side i18n for UI/static content.
- Reads translations from inline <script id="i18n-data" type="application/json"> in base.njk.
- Updates elements with [data-i18n-key] to the translated text.
- Supports simple attribute translation via [data-i18n-attr="attr:key,attr2:key2"].
- Listens to document 'langchange' event from lang-bootstrap and applies updates.
- Runs once on DOMContentLoaded.
*/

interface I18nData {
  [language: string]: {
    [key: string]: any;
  };
}

interface LangChangeEvent extends CustomEvent {
  detail: {
    lang: string;
  };
}

class I18nClient {
  private dict: I18nData = {};
  private readonly supportedLanguages = ['en', 'es'] as const;
  private readonly i18nDataId = 'i18n-data';

  constructor() {
    this.init();
  }

  private getCurrentLang(): string {
    const lang = document.documentElement?.getAttribute('lang');
    return this.supportedLanguages.includes(lang as any) ? lang! : 'en';
  }

  private loadDict(): I18nData {
    try {
      const element = document.getElementById(this.i18nDataId);
      if (!element) return {};
      return JSON.parse(element.textContent || '{}');
    } catch (e) {
      return {};
    }
  }

  private get(obj: any, path: string): string {
    try {
      const parts = String(path).split('.');
      let current = obj;
      for (let i = 0; i < parts.length; i++) {
        const key = parts[i];
        if (!current || typeof current !== 'object' || !key || !(key in current)) return '';
        current = current[key];
      }
      return typeof current === 'string' ? current : '';
    } catch (e) {
      return '';
    }
  }

  private translate(key: string, lang: string): string {
    const normalizedLang = this.supportedLanguages.includes(lang as any) ? lang : 'en';
    return this.get(this.dict[normalizedLang] || {}, key) || '';
  }

  private applyI18n(lang: string): void {
    // Update text content for elements with data-i18n-key
    const textNodes = document.querySelectorAll('[data-i18n-key]');
    for (let i = 0; i < textNodes.length; i++) {
      const element = textNodes[i] as HTMLElement;
      const key = element.getAttribute('data-i18n-key');
      if (key) {
        const text = this.translate(key, lang);
        if (text) element.textContent = text;
      }
    }

    // Update attributes for elements with data-i18n-attr
    const attrNodes = document.querySelectorAll('[data-i18n-attr]');
    for (let j = 0; j < attrNodes.length; j++) {
      const element = attrNodes[j] as HTMLElement;
      const attrMap = element.getAttribute('data-i18n-attr');
      if (!attrMap) continue;

      const pairs = attrMap.split(',');
      for (let p = 0; p < pairs.length; p++) {
        const raw = pairs[p]?.trim();
        if (!raw) continue;

        const colonIndex = raw.indexOf(':');
        if (colonIndex === -1) continue;

        const attr = raw.slice(0, colonIndex).trim();
        const key = raw.slice(colonIndex + 1).trim();
        const value = this.translate(key, lang);
        if (value) element.setAttribute(attr, value);
      }
    }

    // Update document title if data-i18n-title is present on <title>
    try {
      const titleElement = document.querySelector('head > title[data-i18n-key]') as HTMLTitleElement;
      if (titleElement) {
        const key = titleElement.getAttribute('data-i18n-key');
        if (key) {
          const value = this.translate(key, lang);
          if (value) titleElement.textContent = value;
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }

  private init(): void {
    this.dict = this.loadDict();
    this.applyI18n(this.getCurrentLang());

    // React to language changes
    document.addEventListener('langchange', (e: Event) => {
      const event = e as LangChangeEvent;
      const lang = (event?.detail?.lang) || this.getCurrentLang();
      this.applyI18n(lang);
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new I18nClient(), { once: true });
} else {
  new I18nClient();
}
