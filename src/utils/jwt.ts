import jwt, { type SignOptions } from 'jsonwebtoken';
import customConfig from '~/server/config/default';


export const signJwt = (
  payload: object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(customConfig[key], 'base64').toString('ascii');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
    token: string,
    key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
  ): T | null => {
    try {
      const publicKey = Buffer.from(customConfig[key], 'base64').toString(
        'ascii'
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return jwt.verify(token, publicKey) as T;
    } catch (error) {
      console.log(error);
      return null;
    }
  };