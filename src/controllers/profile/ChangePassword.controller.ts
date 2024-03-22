import { BaseUserRequestInterface, GetUserResponse, ChangePasswordParams, UserStatusEnum } from '../../infrastructure';
import { Repository } from '../../database';
import { PasswordService } from '../../services';
import express from 'express';

export async function ChangePasswordController(req: BaseUserRequestInterface, res: express.Response) {
  const user = req.user.user;

  try {
    const params = await new ChangePasswordParams(req.body).validate();

    const isValidPassword = await new PasswordService().compare(params.currentPassword, user?.getPassword());
    if (!isValidPassword) {
      return res.status(401).send('Invalid login credentials');
    }

    if (params.currentPassword === params.newPassword) {
      return res.status(401).send('You used this password recently. Please choose a different one.');
    }

    const passwordService = new PasswordService();
    const newPassword = await passwordService.hash(params.newPassword);
    user.buildStatus(UserStatusEnum.ACTIVE).buildPassword(newPassword);

    const updated = await Repository.User().update(user);
    const response = new GetUserResponse(updated);

    return res.json({ message: 'Password successfully changed', data: response });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
