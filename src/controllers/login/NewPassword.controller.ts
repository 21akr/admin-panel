import { BaseUserRequestInterface, GetUserResponse, NewPasswordParams, UserStatusEnum } from '../../infrastructure';
import { Repository } from '../../database';
import { PasswordService } from '../../services';
import express from 'express';

export async function NewPasswordController(req: BaseUserRequestInterface, res: express.Response) {
  const user = req.user;

  try {
    const params = await new NewPasswordParams(req.body).validate();

    const passwordService = new PasswordService();
    const comparePasswords = await passwordService.buildPassword(params.currentPassword).buildHash(user?.getPassword()).compare();

    if (!comparePasswords) {
      return res.status(400).json({ error: 'Invalid current password' });
    }

    const newPassword = await passwordService.buildPassword(params.newPassword).hash();
    user.buildStatus(UserStatusEnum.ACTIVE).buildPassword(newPassword);

    const updated = await Repository.User().update(user);
    const response = new GetUserResponse(updated);

    return res.json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
