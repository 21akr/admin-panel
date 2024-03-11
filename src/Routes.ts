import { Router } from "express";
import {
  CreateUserController,
  DeleteUserByIdController,
  GetUserByIdController,
  GetUsersListController,
  LoginController,
  NewPasswordController,
} from "./controllers";
import {
  UserSessionMiddleware,
  UserTempSessionMiddleware,
} from "./middlewares";

function nestedRoutes(path: string, configure: (router) => void) {
  const router = Router({ mergeParams: true });
  router.use(path, router);
  configure(router);
  return router;
}

export const routes = nestedRoutes("/user", (user) => {
  user.post("/login", LoginController);
  user.post("/new-password", UserTempSessionMiddleware, NewPasswordController);

  user.use(UserSessionMiddleware);

  user.get("/list", GetUsersListController);
  user.post("/", CreateUserController);
  user.get("/:id", GetUserByIdController);
  user.delete("/:id", DeleteUserByIdController);
});
