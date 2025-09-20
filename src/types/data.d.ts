// TypeScript types for data files
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
      card1: {
        title: string;
        description: string;
        tags: string[];
      };
      card2: {
        title: string;
        description: string;
        tags: string[];
      };
      card3: {
        title: string;
        description: string;
        tags: string[];
      };
    };
    certifications: {
      heading: string;
      subtitle: string;
      officialTag: string;
      issuedOn: string;
      issuerLabel: string;
      viewCredential: string;
    };
    header: {
      cta: string;
      home: string;
      blog: string;
      certifications: string;
    };
    blog: {
      title: string;
      subtitle: string;
    };
    common: {
      noPosts: string;
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
    jsonld: {
      person: {
        name: string;
        jobTitle: string;
        description: string;
        image: string;
        knowsAbout: string[];
        occupation: {
          name: string;
          description: string;
        };
      };
      website: {
        name: string;
        description: string;
        author: string;
        inLanguage: string[];
        searchAction: {
          target: string;
          queryInput: string;
        };
      };
    };
  };
}

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
  displayBlogPages: {
    [slug: string]: {
      "main-page": boolean;
      "blog-page": boolean;
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
