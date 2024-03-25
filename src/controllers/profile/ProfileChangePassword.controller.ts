import { BaseUserRequestInterface, ProfileChangePasswordParams, GetUserResponse, UserStatusEnum } from '../../infrastructure';
import { Repository } from '../../database';
import { PasswordService } from '../../services';
import express from 'express';

export async function ProfileChangePasswordController(req: BaseUserRequestInterface, res: express.Response) {
  const user = req.user.user;
  let params: ProfileChangePasswordParams;

  try {
    params = await new ProfileChangePasswordParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const isValidPassword = await new PasswordService().compare(params.currentPassword, user?.getPassword());
    if (!isValidPassword) {
      return res.status(401).send('Invalid Password');
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
