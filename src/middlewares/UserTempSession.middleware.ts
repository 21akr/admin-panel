import express from 'express';
import { BaseUserRequestInterface, UserStatusEnum } from '../infrastructure';
import { userSessionMiddlewareCase } from '../cases';

export async function UserTempSessionMiddleware(req: BaseUserRequestInterface, res: express.Response, next: express.NextFunction) {
  try {
    if (!(req.headers && req.headers.authorization)) {
      res.send('Token not provided');
    }

    const accessToken = req.headers.authorization?.split(' ')[1] || '';
    const userAndSession = await userSessionMiddlewareCase.execute({
      accessToken,
      status: UserStatusEnum.NEED_TO_CHANGE_PASSWORD,
    });

    req.user = userAndSession.user;
    req.session = userAndSession.session;

    return next();
  } catch (err) {
    console.error('Error during session validation:', err);
    return res.send(`An error occurred. Problem: ${err}`);
  }
}
