interface LangChangeEvent extends CustomEvent {
    detail: {
        lang: string;
    };
}
declare class LangSwitcher {
    private readonly supportedLanguages;
    constructor();
    private getCurrentLang;
    private updateURLParam;
    private updateSwitcherUI;
    private onClick;
    private onKeyDown;
    private init;
}
//# sourceMappingURL=lang-switcher.d.ts.map