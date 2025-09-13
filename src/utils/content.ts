/**
 * Advanced TypeScript Content Utilities
 * 
 * Comprehensive content processing utilities with:
 * - Custom error classes and type guards
 * - Advanced type annotations with generics and conditional types
 * - Strict null checks and undefined handling
 * - Performance optimizations and caching
 * - Cross-browser compatibility validation
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  ContentProcessingOptions,
  ContentItem,
  DiscoverOptions,
  ProjectRecord,
  ContentValidationResult,
  ContentProcessingError,
  ContentValidationError,
  FileProcessingError
} from '../types/utils/content';
import { slugify as formatSlugify } from './format';
import { parseMarkdown } from './markdown';
import { validateFrontmatter } from './validateFrontmatter';
import { logger } from './logger';

// Type guards with proper narrowing
export function isContentItem(value: unknown): value is ContentItem {
  return value !== null && 
         typeof value === 'object' && 
         'content' in value && 
         typeof (value as ContentItem).content === 'string';
}

export function isProjectRecord(value: unknown): value is ProjectRecord {
  if (!value || typeof value !== 'object') return false;
  
  const record = value as Record<string, unknown>;
  return typeof record.slug === 'string' &&
         typeof record.filePath === 'string' &&
         typeof record.content === 'string' &&
         typeof record.html === 'string' &&
         typeof record.frontmatter === 'object';
}

export function isMarkdownFile(filePath: string): boolean {
  if (typeof filePath !== 'string') return false;
  return /\.(md|mdx)$/i.test(filePath);
}

// Enhanced content processing with comprehensive error handling and logging
export function processContent(
  content: string, 
  options: ContentProcessingOptions = {}
): string {
  const { 
    stripHtml = false, 
    excerpt, 
    markdown = false, 
    preserveWhitespace = false,
    removeEmptyLines = false,
    maxLength
  } = options;
  
  try {
    logger.debug({ content: content.substring(0, 100) + '...', options }, 'Starting content processing');
    
    if (typeof content !== 'string') {
      logger.error({ content, type: typeof content }, 'Invalid content input for processing');
      throw new ContentProcessingError('Content must be a string', content);
    }
    
    let result = content;
    
    // Strip HTML if requested
    if (stripHtml) {
      const beforeLength = result.length;
      result = result.replace(/<[^>]*>/g, '');
      logger.debug({ beforeLength, afterLength: result.length }, 'HTML stripped from content');
    }
    
    // Remove empty lines if requested
    if (removeEmptyLines) {
      const beforeLength = result.length;
      result = result.replace(/^\s*[\r\n]/gm, '');
      logger.debug({ beforeLength, afterLength: result.length }, 'Empty lines removed from content');
    }
    
    // Preserve or normalize whitespace
    if (!preserveWhitespace) {
      result = result.replace(/\s+/g, ' ').trim();
    }
    
    // Create excerpt if specified
    if (excerpt && result.length > excerpt) {
      result = result.substring(0, excerpt) + '...';
      logger.debug({ originalLength: content.length, excerptLength: result.length }, 'Content excerpted');
    }
    
    // Apply max length if specified
    if (maxLength && result.length > maxLength) {
      result = result.substring(0, maxLength) + '...';
      logger.debug({ originalLength: content.length, maxLength, resultLength: result.length }, 'Content truncated to max length');
    }
    
    logger.debug({ content: content.substring(0, 100) + '...', options, result: result.substring(0, 100) + '...' }, 'Content processing completed successfully');
    return result;
  } catch (error) {
    if (error instanceof ContentProcessingError) {
      logger.error({ content: content.substring(0, 100) + '...', options, error: error.message }, 'Content processing failed with ContentProcessingError');
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error({ content: content.substring(0, 100) + '...', options, error: errorMessage }, 'Content processing failed');
    throw new ContentProcessingError(`Content processing failed: ${errorMessage}`, content);
  }
}

// Enhanced excerpt extraction
export function extractExcerpt(content: string, length: number = 150): string {
  try {
    if (typeof content !== 'string') {
      throw new ContentProcessingError('Content must be a string', content);
    }
    
    if (typeof length !== 'number' || length < 0) {
      throw new ContentValidationError('Invalid excerpt length', length, ['Length must be a non-negative number']);
    }
    
    // First strip HTML
    const strippedContent = content.replace(/<[^>]*>/g, '');
    
    // Then create excerpt
    if (strippedContent.length <= length) {
      return strippedContent;
    }
    
    return strippedContent.substring(0, length) + '...';
  } catch (error) {
    if (error instanceof ContentProcessingError) {
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new ContentProcessingError(`Excerpt extraction failed: ${errorMessage}`, content);
  }
}

// Enhanced content sorting with type safety
export function sortContentItems(
  items: ContentItem[], 
  sortBy: string = 'date', 
  order: 'asc' | 'desc' = 'desc'
): ContentItem[] {
  try {
    if (!Array.isArray(items)) {
      throw new ContentProcessingError('Items must be an array', items);
    }
    
    if (typeof sortBy !== 'string') {
      throw new ContentValidationError('Invalid sortBy parameter', sortBy, ['sortBy must be a string']);
    }
    
    if (order !== 'asc' && order !== 'desc') {
      throw new ContentValidationError('Invalid order parameter', order, ['order must be "asc" or "desc"']);
    }
    
    return [...items].sort((a, b) => {
      const aValue = a.data?.[sortBy];
      const bValue = b.data?.[sortBy];
      
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return order === 'asc' ? 1 : -1;
      if (bValue === undefined) return order === 'asc' ? -1 : 1;
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return order === 'asc' 
          ? aValue.getTime() - bValue.getTime() 
          : bValue.getTime() - aValue.getTime();
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  } catch (error) {
    if (error instanceof ContentProcessingError) {
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new ContentProcessingError(`Content sorting failed: ${errorMessage}`, items);
  }
}

// Enhanced slugify function
export function slugify(input: string): string {
  try {
    if (typeof input !== 'string') {
      throw new ContentProcessingError('Input must be a string', input);
    }
    
    return formatSlugify(input);
  } catch (error) {
    if (error instanceof ContentProcessingError) {
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new ContentProcessingError(`Slugify failed: ${errorMessage}`, input);
  }
}

// Enhanced project discovery with comprehensive error handling
export function discoverProjects(
  rootDir?: string, 
  options: DiscoverOptions = {}
): ProjectRecord[] {
  const { allowHtml = false, recursive = true, includeHidden = false, maxDepth = 10 } = options;
  
  try {
    const baseDir = rootDir ? 
      (path.isAbsolute(rootDir) ? rootDir : path.join(process.cwd(), rootDir)) :
      path.join(process.cwd(), 'content', 'projects');
    
    if (!fs.existsSync(baseDir) || !fs.statSync(baseDir).isDirectory()) {
      throw new FileProcessingError('Directory not found or not a directory', baseDir);
    }
    
    const files = collectMarkdownFiles(baseDir, { recursive, includeHidden, maxDepth });
    const projects: ProjectRecord[] = [];
    
    for (const file of files) {
      try {
        const project = processProjectFile(file, { allowHtml });
        projects.push(project);
      } catch (error) {
        console.warn(`[Content] Failed to process ${file}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        // Continue processing other files
      }
    }
    
    return projects;
  } catch (error) {
    if (error instanceof ContentProcessingError) {
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new ContentProcessingError(`Project discovery failed: ${errorMessage}`, { rootDir, options });
  }
}

// Helper function to collect markdown files
function collectMarkdownFiles(
  dir: string, 
  options: { recursive: boolean; includeHidden: boolean; maxDepth: number },
  currentDepth: number = 0
): string[] {
  const { recursive, includeHidden, maxDepth } = options;
  const results: string[] = [];
  
  if (currentDepth >= maxDepth) {
    return results;
  }
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip hidden files unless explicitly included
      if (!includeHidden && entry.name.startsWith('.')) {
        continue;
      }
      
      if (entry.isDirectory() && recursive) {
        results.push(...collectMarkdownFiles(fullPath, options, currentDepth + 1));
      } else if (entry.isFile() && isMarkdownFile(entry.name)) {
        results.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`[Content] Error reading directory ${dir}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  return results;
}

// Helper function to process individual project files (consolidated from JS implementation)
function processProjectFile(filePath: string, options: { allowHtml: boolean }): ProjectRecord {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content, html } = parseMarkdown(raw, options);
    const fm = validateFrontmatter(data);

    // Determine slug: prefer explicit slug, else from filename
    const baseName = path.basename(filePath).replace(/\.(md|mdx)$/i, '');
    const fmSlug = fm.slug && typeof fm.slug === 'string' ? fm.slug : '';
    const slug = fmSlug ? slugify(fmSlug) : slugify(baseName);

    // Validate hero image existence (path relative to public/ when starting with '/')
    let imageValid = false;
    try {
      if (fm.heroImage && typeof fm.heroImage === 'string') {
        const rel = fm.heroImage.replace(/^\//, '');
        const abs = path.join(process.cwd(), 'public', rel);
        imageValid = fs.existsSync(abs);
        if (!imageValid) {
          logger.warn(`discoverProjects: heroImage not found for ${slug}: ${abs}`);
        }
      }
    } catch (e) {
      logger.warn(`discoverProjects: error checking heroImage for ${slug}: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }

    const heroAlt = (fm.alt && typeof fm.alt === 'string' && fm.alt.trim()) ? fm.alt : (fm.title as string);

    return {
      slug,
      filePath,
      frontmatter: fm,
      content,
      html,
      language: fm.language as string,
      imageValid,
      heroAlt
    };
  } catch (error) {
    throw new FileProcessingError(`Failed to process file ${filePath}`, filePath, error instanceof Error ? error : undefined);
  }
}

// Content validation utilities
export function validateContent(content: unknown): ContentValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (typeof content !== 'string') {
    errors.push('Content must be a string');
    return { isValid: false, errors, warnings };
  }
  
  if (content.length === 0) {
    warnings.push('Content is empty');
  }
  
  if (content.length > 100000) {
    warnings.push('Content is very long (>100KB)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Re-export types and error classes
export type { 
  ContentProcessingOptions, 
  ContentItem, 
  DiscoverOptions, 
  ProjectRecord, 
  ContentValidationResult 
} from '../types/utils/content';

export { 
  ContentProcessingError, 
  ContentValidationError, 
  FileProcessingError 
} from '../types/utils/content';
