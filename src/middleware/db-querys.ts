import { Session } from '@/db/models/exports';
import { RequestHandler } from 'express';

interface QueryMiddleware {
  [key: string]: { [key: string]: RequestHandler };
}

const query: QueryMiddleware = (() => {
  return {
    session: {
      async exists(req, res, next) {
        const token = await Session.findOne({ token: req.body.session });
        if (token) {
          next();
          return;
        }
        res.status(404).json({
          result: false,
          error: 'Token not found',
        });
      },
    },
  };
})();

export default query;
