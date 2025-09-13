// Utility function types shared across the project.

export interface DateFormatOptions {
  format?: string; // e.g., 'yyyy-MM-dd'
  locale?: string; // e.g., 'en', 'fr'
  timeZone?: string; // e.g., 'UTC', 'America/New_York'
}

export interface ContentFilterOptions {
  tag?: string | string[];
  language?: string;
  limit?: number;
  sortBy?: string; // e.g., 'date' | 'title'
  sortOrder?: 'asc' | 'desc';
}
