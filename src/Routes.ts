import { Router } from 'express';
import {
  CreateUserController,
  DeleteUserByIdController,
  GetUserByIdController,
  GetUsersListController,
  ProfileChangePasswordController,
  ProfileLoginController,
  ProfileLogoutController,
  ProfileResetPasswordController,
  UpdateUserController,
} from './controllers';
import { CheckAdminMiddleware, UserSessionMiddleware, UserTempSessionMiddleware } from './middlewares';

function nestedRoutes(path: string, configure: (router: Router) => void) {
  const router = Router({ mergeParams: true });
  router.use(path, router);
  configure(router);
  return router;
}

export const routes = nestedRoutes('/user', user => {
  user.post('/', CreateUserController);
  user.post('/login', ProfileLoginController);

  user.post('/change-password', UserTempSessionMiddleware, ProfileChangePasswordController);

  user.use(UserSessionMiddleware);
  user.delete('/:id', CheckAdminMiddleware, DeleteUserByIdController);
  user.get('/list', CheckAdminMiddleware, GetUsersListController);
  user.get('/:id', CheckAdminMiddleware, GetUserByIdController);
  user.put('/:id', CheckAdminMiddleware, UpdateUserController);

  user.post('/logout', ProfileLogoutController);
  user.post('/reset-password', ProfileResetPasswordController);
});
