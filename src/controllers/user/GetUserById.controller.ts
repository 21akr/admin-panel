import express from 'express';
import { BaseIDParams, GetUserResponse } from '../../infrastructure';
import { Repository } from '../../database';
import { Types } from 'mongoose';

export async function GetUserByIdController(req: express.Request, res: express.Response) {
  let response: GetUserResponse;
  let params: BaseIDParams;

  try {
    params = await new BaseIDParams(req.params).validate();
  } catch (err) {
    console.error(err);
    return res.json(err);
  }

  try {
    const user = await Repository.User().getById(new Types.ObjectId(params.ID));
    if (!user) {
      res.send('User Not Found');
    }

    response = new GetUserResponse(user);

    res.send(response);
  } catch (err) {
    return res.send(err);
  }
}
