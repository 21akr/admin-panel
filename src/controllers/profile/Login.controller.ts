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
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isValidPassword = await new PasswordService().compare(params.password, user.getPassword());
    if (!isValidPassword) {
      return res.status(401).json('Invalid login credentials');
    }

    const JWT_EXPIRES = Number(process.env.JWT_EXPIRES);
    const sessionID = new Types.ObjectId();
    const userID = user.getId();

    const accessToken = new TokenService(process.env.JWT_SECRET, JWT_EXPIRES, {
      user: userID,
      session: sessionID,
    }).sign();

    const session = new UserSessionEntity()
      .buildId(sessionID)
      .buildUser(userID)
      .buildExpireSeconds(JWT_EXPIRES)
      .buildExpiresAt(moment().add(JWT_EXPIRES, 's').toDate())
      .buildStatus(UserSessionStatusEnum.ACTIVE)
      .buildAccessToken(accessToken);

    await Repository.UserSession().create(session);

    response = new LoginResponse(session, user);
    return res.json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
