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
  socialUrls: {
    github: string;
    linkedin: string;
  };
  seo: {
    defaultImage: string;
    themeColor: string;
    msTileColor: string;
  };
}

export interface I18nData {
  [language: string]: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    home: {
      featured: {
        heading: string;
        subtitle: string;
        viewAll: string;
      };
    };
    experience: {
      heading: string;
      subtitle: string;
    };
    certifications: {
      heading: string;
      subtitle: string;
      officialTag: string;
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
      home: string;
      blog: string;
    };
    blog: {
      title: string;
      subtitle: string;
      featured: {
        title: string;
        subtitle: string;
      };
      all: {
        title: string;
        subtitle: string;
      };
      posts: {
        title: string;
        subtitle: string;
      };
      noPosts: string;
    };
    common: {
      noDate: string;
      readMore: string;
      noCertifications: string;
    };
    privacy: {
      banner: {
        text: string;
        accept: string;
        decline: string;
      };
    };
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
    subtitle: string;
    officialTag: string;
    issuedOn: string;
    issuerLabel: string;
    viewCredential: string;
    names: {
      [key: string]: Certification;
    };
  };
}