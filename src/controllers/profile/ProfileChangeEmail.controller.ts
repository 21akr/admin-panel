import { BaseEmailParams, BaseUserRequestInterface } from '../../infrastructure';
import express from 'express';
import { Repository, UserEntity } from '../../database';
import { SendEmail } from '../../utils';
import { RedisService, UtilityService } from '../../services';

export async function ProfileChangeEmailController(req: BaseUserRequestInterface, res: express.Response) {
  let params: BaseEmailParams;
  const user: UserEntity = req.user;

  try {
    params = await new BaseEmailParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const isValidEmail = await Repository.User().getByEmail(params.email);
    if (isValidEmail) {
      return res.status(401).send('You already use this email.');
    }

    const redis = new RedisService();
    redis.connect();

    const confirmationCode = UtilityService.generateConfirmationCode();

    await SendEmail({
      from: 'test@example.com',
      to: params.email,
      subject: 'Verify the confirmation code',
      text: `Confirmation code: ${confirmationCode}`,
    });
    console.log(confirmationCode);

    await redis.set(
      user.getId().toString(),
      JSON.stringify({
        code: confirmationCode,
        email: params.email,
      }),
      1000,
    );

    return res.json({ message: 'Please, verify the confirmation code' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
