import { BaseUserRequestInterface, GetUserResponse, NewPasswordParams, UserStatusEnum } from '../../infrastructure';
import { Repository } from '../../database';
import { PasswordService } from '../../services';
import express from 'express';

export async function NewPasswordController(req: BaseUserRequestInterface, res: express.Response) {
  const user = req.user.user;

  try {
    const params = await new NewPasswordParams(req.body).validate();

    const passwordService = new PasswordService();
    const isValidPassword = await new PasswordService().compare(params.currentPassword, user?.getPassword());
    if (!isValidPassword) {
      return res.status(401).send('Invalid login credentials');
    }

    if (params.currentPassword === params.newPassword) {
      return res.status(401).send('You used this password recently. Please choose a different one.');
    }

    const newPassword = await passwordService.hash(params.newPassword);
    user.buildStatus(UserStatusEnum.ACTIVE).buildPassword(newPassword);

    const updated = await Repository.User().update(user);
    const response = new GetUserResponse(updated);

    return res.json({ data: 'Password successfully changed', response });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
