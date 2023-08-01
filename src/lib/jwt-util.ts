import jsonwt, { JwtPayload } from 'jsonwebtoken';

const jwt = (() => {
  return {
    verifySessionToken(token: string) {
      const result = jsonwt.verify(token, String(process.env.SESSION_TOKEN_SECRET));
      if (result) return result as JwtPayload;
      throw new Error('Invalid session token');
    },

    verifyAccessToken(token: string) {
      const result = jsonwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET));
      if (result) return result as JwtPayload;
      throw new Error('Invalid access token');
    },

    createAccessToken(payload: JwtPayload | string) {
      return jsonwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), {
        expiresIn: process.env.ACESSS_TOKEN_EXPIRATION_TIME,
      });
    },

    createSessionToken(payload: JwtPayload | string) {
      return jsonwt.sign(payload, String(process.env.SESSION_TOKEN_SECRET));
    },
  };
})();

export default jwt;
