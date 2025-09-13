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
declare class I18nClient {
    private dict;
    private readonly supportedLanguages;
    private readonly i18nDataId;
    constructor();
    private getCurrentLang;
    private loadDict;
    private get;
    private translate;
    private applyI18n;
    private init;
}
//# sourceMappingURL=i18n-client.d.ts.map