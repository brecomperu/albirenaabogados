import * as jose from 'jose';

const privateKeyBase64 = process.env.JWT_PRIVATE_KEY || '';
const publicKeyBase64 = process.env.JWT_PUBLIC_KEY || '';

const getPrivateKey = async () => {
  return await jose.importPKCS8(Buffer.from(privateKeyBase64, 'base64').toString(), 'RS256');
};

const getPublicKey = async () => {
  return await jose.importSPKI(Buffer.from(publicKeyBase64, 'base64').toString(), 'RS256');
};

export const JWTService = {
  /**
   * Create an access token (expires in 1h)
   */
  async createAccessToken(payload: any) {
    const pk = await getPrivateKey();
    return await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(pk);
  },

  /**
   * Create a refresh token (expires in 7d)
   */
  async createRefreshToken(payload: any) {
    const pk = await getPrivateKey();
    return await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(pk);
  },

  /**
   * Verify a token
   */
  async verifyToken(token: string) {
    const pk = await getPublicKey();
    const { payload } = await jose.jwtVerify(token, pk, {
      algorithms: ['RS256'],
    });
    return payload;
  }
};
