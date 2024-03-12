import jwt from 'jsonwebtoken';

export async function signJWT(object: Object, keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', options?: jwt.SignOptions | undefined) {
  const signingKey = Buffer.from(keyName, 'base64').toString('ascii');

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt() {}
