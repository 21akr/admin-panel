import express from 'express';
import { newPassword, PasswordService } from '../../services';
import { SendEmail } from '../../utils';
import { CreateUserParams, GetUserResponse, UserStatusEnum } from '../../infrastructure';
import { Repository, UserEntity } from '../../database';
import sha1 from 'sha1';

export async function CreateUserController(req: express.Request, res: express.Response) {
  let response: GetUserResponse;
  let params: CreateUserParams;

  try {
    params = await new CreateUserParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return res.send(err);
  }

  try {
    const checkUser = await Repository.User().getByEmail(params.email);
    if (checkUser) {
      return res.send('This email belongs to an active user.');
    }

    const createPassword = newPassword();
    const userPassword = new PasswordService().buildPassword(sha1(createPassword));
    const password = await userPassword.hash();

    const newUser = new UserEntity()
      .buildFullName(params.fullName)
      .buildEmail(params.email)
      .buildStatus(UserStatusEnum.NEED_TO_CHANGE_PASSWORD)
      .buildPassword(password);

    await SendEmail({
      from: 'test@example.com',
      to: newUser.getEmail(),
      subject: 'Change your password',
      text: `Login: ${newUser.getEmail()}. Password: ${userPassword.getPassword()}`,
    });

    const created = await Repository.User().create(newUser);

    response = new GetUserResponse(created);
    return res.send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
}
