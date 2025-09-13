interface LangChangeEvent extends CustomEvent {
    detail: {
        lang: string;
    };
}
declare class LangBootstrap {
    private readonly supportedLanguages;
    private readonly storageKey;
    constructor();
    private normalize;
    private getSearchLang;
    private getPathLang;
    private detectBrowserLanguage;
    private getStoredLanguage;
    private setStoredLanguage;
    private resolveInitialLanguage;
    private applyLanguage;
    private init;
}
//# sourceMappingURL=lang-bootstrap.d.ts.map