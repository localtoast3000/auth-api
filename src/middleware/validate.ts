import { validateBody } from '@/lib/input-validators';
import jwt from '@/lib/jwt-util';
import { RequestHandler } from 'express';

interface ValidationMiddleware {
  fields(expectedFields: string[]): RequestHandler;
  accessToken: RequestHandler;
}

const validate: ValidationMiddleware = (() => {
  return {
    fields(expectedFields) {
      return (req, res, next) => {
        if (
          !validateBody({
            body: req.body,
            expectedPropertys: expectedFields,
          })
        ) {
          res.status(406).json({
            result: false,
            error: 'Invalid fields',
          });
          return;
        }
        next();
      };
    },
    accessToken(req, res, next) {
      try {
        jwt.verifyAccessToken(req.body.access);
        next();
        return;
      } catch (err) {
        console.log(err);
        res.status(401).json({ result: false, error: 'Invalid access token' });
        return;
      }
    },
  };
})();

export default validate;
