import { Router } from 'express';
import {
  ChangePasswordController,
  CreateUserController,
  DeleteUserByIdController,
  GetUserByIdController,
  GetUsersListController,
  LoginController,
  ResetPasswordController,
} from './controllers';
import { CheckAdminMiddleware, UserSessionMiddleware, UserTempSessionMiddleware } from './middlewares';

function nestedRoutes(path: string, configure: (router) => void) {
  const router = Router({ mergeParams: true });
  router.use(path, router);
  configure(router);
  return router;
}

export const routes = nestedRoutes('/user', user => {
  user.post('/', CreateUserController);
  user.post('/login', LoginController);

  user.post('/change-password', UserTempSessionMiddleware, ChangePasswordController);

  user.use(UserSessionMiddleware);
  user.delete('/:id', CheckAdminMiddleware, DeleteUserByIdController);
  user.get('/list', CheckAdminMiddleware, GetUsersListController);
  user.get('/:id', CheckAdminMiddleware, GetUserByIdController);

  user.post('/reset-password', ResetPasswordController);
});
