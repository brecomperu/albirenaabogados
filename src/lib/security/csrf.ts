import { randomBytes, createHmac } from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'fallback-secret-for-development';

export const CSRFService = {
  /**
   * Generate a new CSRF token
   */
  generateToken(sessionId: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = createHmac('sha256', CSRF_SECRET)
      .update(`${sessionId}.${salt}`)
      .digest('hex');
    return `${salt}.${hash}`;
  },

  /**
   * Validate a CSRF token
   */
  validateToken(token: string, sessionId: string): boolean {
    if (!token || !token.includes('.')) return false;
    const [salt, hash] = token.split('.');
    const expectedHash = createHmac('sha256', CSRF_SECRET)
      .update(`${sessionId}.${salt}`)
      .digest('hex');
    return hash === expectedHash;
  }
};
