import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export const Sanitizer = {
  /**
   * Sanitize HTML content to prevent XSS
   */
  sanitize(html: string): string {
    return DOMPurify.sanitize(html);
  },

  /**
   * Sanitize an object of strings
   */
  sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized = { ...obj };
    for (const key in sanitized) {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = this.sanitize(sanitized[key]) as any;
      }
    }
    return sanitized;
  }
};
