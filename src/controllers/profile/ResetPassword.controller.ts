import express from 'express';
import { BaseUserRequestInterface, UserStatusEnum } from '../../infrastructure';
import { PasswordService } from '../../services';
import { Repository, UserEntity } from '../../database';
import { SendEmail } from '../../utils';

export async function ResetPasswordController(req: BaseUserRequestInterface, res: express.Response) {
  const user: UserEntity = req.user;

  try {
    const passwordService = new PasswordService();

    const createPassword = await passwordService.newPassword();
    const hashedPassword = await passwordService.hash(createPassword);
    console.log(user);
    user.buildStatus(UserStatusEnum.NEED_TO_CHANGE_PASSWORD).buildPassword(hashedPassword);

    await Repository.User().update(user);

    await SendEmail({
      from: 'test@example.com',
      to: user.getEmail(),
      subject: 'Set your password for your new account',
      text: `Login: ${user.getEmail()}. Password: ${createPassword}`,
    });
    console.log(createPassword);

    return res.send('Successfully reset! Please, change your password');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
