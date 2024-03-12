import express from 'express';
import { BaseUserRequestInterface, GetUserResponse, NewPasswordParams, UserStatusEnum } from '../../infrastructure';
import { Repository } from '../../database';
import { PasswordService } from '../../services';

export async function NewPasswordController(req: BaseUserRequestInterface, res: express.Response) {
  let params: NewPasswordParams;
  let response: GetUserResponse;
  const user = req.user;

  try {
    params = await new NewPasswordParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return err;
  }

  try {
    const comparePasswords = await new PasswordService().buildPassword(params.currentPassword).buildHash(user?.getPassword()).compare();
    if (!comparePasswords) {
      res.send('Invalid current password');
    }

    const newPassword = await new PasswordService().buildPassword(params.newPassword).hash();
    user.buildStatus(UserStatusEnum.ACTIVE).buildPassword(newPassword);

    const updated = await Repository.User().update(user);
    response = new GetUserResponse(updated);

    res.json(response);
  } catch (err) {
    console.error(err);
    return err;
  }
}
