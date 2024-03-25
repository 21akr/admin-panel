import { Router } from 'express';
import {
  CreateUserController,
  DeleteUserByIdController,
  GetUserByIdController,
  GetUsersListController,
  LoginController,
  ChangePasswordController,
  ResetPasswordController,
} from './controllers';
import { UserSessionMiddleware, UserTempSessionMiddleware } from './middlewares';

function nestedRoutes(path: string, configure: (router) => void) {
  const router = Router({ mergeParams: true });
  router.use(path, router);
  configure(router);
  return router;
}

export const routes = nestedRoutes('/user', user => {
  user.post('/', CreateUserController);
  user.post('/login', LoginController);
  user.delete('/:id', DeleteUserByIdController);
  user.post('/change-password', UserTempSessionMiddleware, ChangePasswordController);

  user.use(UserSessionMiddleware);
  user.post('/reset-password', ResetPasswordController);
  user.get('/list', GetUsersListController);
  user.get('/:id', GetUserByIdController);
});
