import express from 'express';
import { BaseUserRequestInterface, UserStatusEnum } from '../infrastructure';
import { userSessionMiddlewareCase } from '../cases';

export async function UserSessionMiddleware(req: BaseUserRequestInterface, res: express.Response, next: express.NextFunction) {
  try {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).send('Authorization header missing');
    }
    const accessToken = req.headers.authorization?.split(' ')[1] || '';

    const userAndSession = await userSessionMiddlewareCase.execute({
      accessToken,
      status: UserStatusEnum.ACTIVE,
    });

    req.user = userAndSession.user;
    req.session = userAndSession.session;

    return next();
  } catch (err) {
    console.error('Error during session validation:', err);
    return res.status(401).send('Invalid access token');
  }
}
