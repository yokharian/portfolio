// Date utility functions for Astro

export type LanguageCode = 'en' | 'es';

export interface DateFormatOptions {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  locale?: string;
}

/**
 * Format a date to a readable string
 * @param date - Date object or string
 * @param lang - Language code ('en' or 'es')
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatReadableDate(
  date: Date | string,
  lang: LanguageCode = 'en',
  options: DateFormatOptions = {}
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return lang === 'es' ? 'Fecha inválida' : 'Invalid date';
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  
  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
}

/**
 * Format a date range
 * @param startDate - Start date
 * @param endDate - End date or null for present
 * @param lang - Language code
 * @returns Formatted date range string
 */
export function formatDateRange(
  startDate: Date | string,
  endDate: Date | string | null,
  lang: LanguageCode = 'en'
): string {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = endDate ? (typeof endDate === 'string' ? new Date(endDate) : endDate) : null;
  
  if (isNaN(start.getTime())) {
    return lang === 'es' ? 'Fecha inválida' : 'Invalid date';
  }

  const startFormatted = formatReadableDate(start, lang, { month: 'long', year: 'numeric' });
  
  if (!end) {
    const presentLabel = lang === 'es' ? 'Actual' : 'Present';
    return `${startFormatted} — ${presentLabel}`;
  }

  if (isNaN(end.getTime())) {
    return startFormatted;
  }

  const endFormatted = formatReadableDate(end, lang, { month: 'long', year: 'numeric' });
  return `${startFormatted} — ${endFormatted}`;
}

/**
 * Get relative time string (e.g., "2 days ago")
 * @param date - Date object or string
 * @param lang - Language code
 * @returns Relative time string
 */
export function getRelativeTime(
  date: Date | string,
  lang: LanguageCode = 'en'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return lang === 'es' ? 'Fecha inválida' : 'Invalid date';
  }

  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return lang === 'es' ? 'Hoy' : 'Today';
  } else if (diffInDays === 1) {
    return lang === 'es' ? 'Ayer' : 'Yesterday';
  } else if (diffInDays < 7) {
    return lang === 'es' ? `Hace ${diffInDays} días` : `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return lang === 'es' ? `Hace ${weeks} semana${weeks > 1 ? 's' : ''}` : `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return lang === 'es' ? `Hace ${months} mes${months > 1 ? 'es' : ''}` : `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return lang === 'es' ? `Hace ${years} año${years > 1 ? 's' : ''}` : `${years} year${years > 1 ? 's' : ''} ago`;
  }
}

/**
 * Check if a date is in the future
 * @param date - Date object or string
 * @returns True if date is in the future
 */
export function isFutureDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getTime() > new Date().getTime();
}

/**
 * Check if a date is today
 * @param date - Date object or string
 * @returns True if date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return dateObj.getDate() === today.getDate() &&
         dateObj.getMonth() === today.getMonth() &&
         dateObj.getFullYear() === today.getFullYear();
}
