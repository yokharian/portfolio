// TypeScript definitions for JSON data files

export interface Certification {
  id: string;
  nameKey: string;
  issuerKey: string;
  issueDate: string;
  credentialUrl: string;
  badgeImage: string;
  altKey: string;
}

export interface I18nLanguage {
  name: string;
  nativeName: string;
}

export interface I18nData {
  [languageCode: string]: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    home: {
      featured: {
        heading: string;
        viewAll: string;
      };
    };
    certifications: {
      heading: string;
      issuedOn: string;
      issuerLabel: string;
      viewCredential: string;
      names: {
        [key: string]: {
          name: string;
          issuer: string;
          alt: string;
        };
      };
    };
    header: {
      cta: string;
    };
  };
}

// Type for the certifications array
export type CertificationsData = Certification[];

// Type for the i18n data object
export type I18nDataObject = I18nData;
