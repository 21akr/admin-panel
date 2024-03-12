import express from 'express';
import { LoginParams, LoginResponse, UserSessionStatusEnum } from '../../infrastructure';
import { Repository, UserSessionEntity } from '../../database';
import { PasswordService, TokenService } from '../../services';
import { Types } from 'mongoose';
import moment from 'moment';

export async function LoginController(req: express.Request, res: express.Response) {
  let params: LoginParams;
  let response: LoginResponse;

  try {
    params = await new LoginParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return err;
  }

  try {
    const user = await Repository.User().getByEmail(params.email);
    if (!user) return 'user not found';

    const comparePassword = await new PasswordService().buildPassword(params.password).buildHash(user.getPassword()).compare();
    if (!comparePassword) return res.send('Invalid email or password');

    const JWT_EXPIRES = Number(process.env.JWT_EXPIRES);
    let session: UserSessionEntity;
    const sessionID = new Types.ObjectId();
    const userID = user.getId();
    const accessToken = new TokenService(process.env.JWT_SECRET, JWT_EXPIRES, {
      user: userID,
      session: sessionID,
    }).sign();
    session = new UserSessionEntity()
      .buildId(sessionID)
      .buildUser(userID)
      .buildExpireSeconds(JWT_EXPIRES)
      .buildExpiresAt(moment().add(JWT_EXPIRES, 's').toDate())
      .buildStatus(UserSessionStatusEnum.ACTIVE)
      .buildAccessToken(accessToken);

    await Repository.UserSession().create(session);

    response = new LoginResponse(session, user);
    return res.send(response);
  } catch (err) {
    console.error(err);
    return err;
  }
}
