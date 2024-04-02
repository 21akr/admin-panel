import { BaseUserRequestInterface, ProfileConfirmChangeEmailParams } from '../../infrastructure';
import express from 'express';
import { Repository, UserEntity } from '../../database';
import { RedisService } from '../../services';

export async function ProfileConfirmChangeEmailController(req: BaseUserRequestInterface, res: express.Response) {
  let params: ProfileConfirmChangeEmailParams;
  const user: UserEntity = req.user;

  try {
    params = await new ProfileConfirmChangeEmailParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const redis = new RedisService();
    redis.connect();
    const cachedData = JSON.parse(await redis.get(user.getId().toString()));

    if (cachedData?.code !== params.confirmationCode) {
      throw new Error('Invalid confirmation code');
    }

    user.buildEmail(cachedData.email);
    await Repository.User().update(user);

    return res.json({ message: 'Verified the confirmation code' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
