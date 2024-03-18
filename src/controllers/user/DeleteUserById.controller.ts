import express from 'express';
import { Repository } from '../../database';
import { Types } from 'mongoose';
import { BaseIDParams } from '../../infrastructure';

export async function DeleteUserByIdController(req: express.Request, res: express.Response) {
  let params: BaseIDParams;

  try {
    params = await new BaseIDParams(req.params).validate();
  } catch (err) {
    console.error(err);
    return res.send(err);
  }

  try {
    const user = await Repository.User().deleteById(new Types.ObjectId(params.ID));

    return res.json({ deleted: user });
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
}
