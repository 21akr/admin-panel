import { BaseUserRequestInterface } from '../infrastructure';
import express from 'express';
import { Repository } from '../database';

export async function CheckAdminMiddleware(req: BaseUserRequestInterface, res: express.Response, next: express.NextFunction) {
  try {
    const user = req?.user;

    const isAdmin = Repository.User().isAdmin(user);

    if (!isAdmin) {
      throw new Error('Access denied');
    }

    return next();
  } catch (err) {
    console.error('Error while checking admin validation:', err);
    return res.status(401).send('Invalid Credentials');
  }
}
