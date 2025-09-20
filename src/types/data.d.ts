// TypeScript types for data files

export interface SiteData {
  title: string;
  description: string;
  defaultLanguage: string;
  url: string;
  author: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  calendlyUrl: string;
  currentYear: number;
}

export interface I18nData {
  [language: string]: {
    [key: string]: any;
  };
}

export interface Certification {
  name: string;
  issuer: string;
  issuedOn: string;
  credentialUrl: string;
  imageUrl?: string;
}

export interface CertificationsData {
  [language: string]: {
    heading: string;
    issuedOn: string;
    issuerLabel: string;
    viewCredential: string;
    names: {
      [key: string]: Certification;
    };
  };
}