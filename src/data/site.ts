// TypeScript interface for site configuration
interface SiteConfig {
  title: string;
  description: string;
  defaultLanguage: string;
  githubUrl: string;
  linkedinUrl: string;
  calendlyUrl: string;
  email: string;
  currentYear: number;
  url: string;
  twitterHandle?: string;
  image: string;
}

const siteConfig: SiteConfig = {
  title: "Sofia Escobedo",
  description: "Python AWS Developer",
  defaultLanguage: "en",
  githubUrl: "https://github.com/yourusername",
  linkedinUrl: "https://linkedin.com/in/yourusername",
  calendlyUrl: "https://calendly.com/yourusername",
  email: "your.email@example.com",
  currentYear: new Date().getFullYear(),
  url: "https://sofiaescobedo.dev", // Update with your actual domain
  twitterHandle: "sofiaescobedo", // Update with your actual Twitter handle
  image: "/assets/images/profile.svg",
};

module.exports = siteConfig;
