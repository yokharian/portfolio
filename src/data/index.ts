// Data loading utilities
import type { SiteData, I18nData, CertificationsData } from '../types/data';

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

export function getI18nData(language: string = 'en'): I18nData[string] {
  return i18n[language] || i18n.en || {} as I18nData[string];
}

export function getCertificationsData(language: string = 'en'): CertificationsData[string] {
  return certifications[language] || certifications.en || {} as CertificationsData[string];
}

// Re-export types
export type { SiteData, I18nData, CertificationsData, Certification } from '../types/data';
