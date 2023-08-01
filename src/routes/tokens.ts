import { routerInstance } from '@/lib/express-util';
import { validate, query } from '@/middleware/exports';
import controller from '@/controllers/tokens';

const tokensRouter = routerInstance((router) => {
  router.post('/', validate.fields(['payload']), controller.generateTokens);

  router.post(
    '/access/refresh',
    validate.fields(['session']),
    query.session.exists,
    controller.refreshAccessTokenWithSessionToken
  );

  router.post(
    '/access/validate',
    validate.fields(['access']),
    controller.validateAccessToken
  );

  router.post(
    '/payload',
    validate.fields(['access']),
    validate.accessToken,
    controller.sendTokenPayload
  );

  router.delete(
    '/session',
    validate.fields(['session']),
    query.session.exists,
    controller.removeSessionToken
  );
});

export default tokensRouter;
