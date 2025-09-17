// Data loading utilities
import type { SiteData, I18nData, CertificationsData } from './types';

// Import JSON data
import siteData from './site.json';
import i18nData from './i18n.json';
import certificationsData from './certifications.json';

// Type-safe data exports
export const site: SiteData = siteData as SiteData;
export const i18n: I18nData = i18nData as I18nData;
export const certifications: CertificationsData = certificationsData as CertificationsData;

// Helper functions
export function getSiteData(): SiteData {
  return site;
}

export function getI18nData(language: string = 'en'): any {
  return i18n[language] || i18n.en || {};
}

export function getCertificationsData(language: string = 'en'): any {
  return certifications[language] || certifications.en || {};
}

// Re-export types
export type { SiteData, I18nData, CertificationsData, Certification } from './types';
