import express from 'express';
import { ProfileLoginParams, ProfileLoginResponse, UserSessionStatusEnum, UserStatusEnum } from '../../infrastructure';
import { Repository, UserSessionEntity } from '../../database';
import { PasswordService, TokenService } from '../../services';
import { Types } from 'mongoose';
import moment from 'moment';

export async function ProfileLoginController(req: express.Request, res: express.Response) {
  let params: ProfileLoginParams;
  let response: ProfileLoginResponse;

  try {
    params = await new ProfileLoginParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const user = await Repository.User().getByEmail(params.email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const userID = user.getId();

    const isValidPassword = await new PasswordService().compare(params.password, user.getPassword());
    if (!isValidPassword) {
      return res.status(401).json('Invalid login credentials');
    }

    let session = await Repository.UserSession()?.getByUserId(userID);
    const JWT_EXPIRES = Number(process.env.JWT_EXPIRES);
    const sessionID = new Types.ObjectId();

    const accessToken = new TokenService(process.env.JWT_SECRET, JWT_EXPIRES, {
      user: userID,
      session: sessionID,
    }).sign();

    if (user.getStatus() === UserStatusEnum.INACTIVE && session.getStatus() === UserSessionStatusEnum.INACTIVE) {
      user.buildStatus(UserStatusEnum.ACTIVE);
      session.buildStatus(UserSessionStatusEnum.ACTIVE);

      await Repository.User().update(user);
      await Repository.UserSession().update(session);
    } else {
      session = new UserSessionEntity()
        .buildId(sessionID)
        .buildUser(userID)
        .buildExpireSeconds(JWT_EXPIRES)
        .buildExpiresAt(moment().add(JWT_EXPIRES, 's').toDate())
        .buildStatus(UserSessionStatusEnum.ACTIVE)
        .buildAccessToken(accessToken);

      await Repository.UserSession().create(session);
    }

    response = new ProfileLoginResponse(session, user);
    return res.json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
