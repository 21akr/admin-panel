import express from 'express';
import { BaseUserRequestInterface, UserStatusEnum } from '../infrastructure';
import { userSessionMiddlewareCase } from '../cases';

export async function UserTempSessionMiddleware(req: BaseUserRequestInterface, res: express.Response, next: express.NextFunction) {
  try {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).send('Authorization header missing');
    }

    const accessToken = req.headers.authorization?.split(' ')[1] || '';
    req.user = await userSessionMiddlewareCase.execute({
      accessToken,
      status: UserStatusEnum.NEED_TO_CHANGE_PASSWORD,
    });

    return next();
  } catch (err) {
    console.error('Error during session validation:', err);
    return res.send(`An error occurred. Problem: ${err}`);
  }
}
