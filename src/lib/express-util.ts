import { Router } from 'express';

export function routerInstance(routesCallback: (routerInstance: Router) => void) {
  const instance: Router = Router();
  routesCallback(instance);
  return instance;
}
