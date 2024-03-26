import express from 'express';
import { BaseIDParams, GetUserResponse, UpdateUserParams } from '../../infrastructure';
import { Repository } from '../../database';
import { Types } from 'mongoose';

export async function UpdateUserController(req: express.Request, res: express.Response) {
  let response: GetUserResponse;
  let idParams: BaseIDParams;
  let params: UpdateUserParams;

  try {
    idParams = await new BaseIDParams(req.params).validate();
    params = await new UpdateUserParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const user = await Repository.User().getById(new Types.ObjectId(idParams.ID));
    if (!user) {
      res.send('User Not Found');
    }

    const updated = user.buildFullName(params.fullName).buildUserRole(params.userRole);

    response = new GetUserResponse(updated);
    return res.json(response);
  } catch (err) {
    return res.send(err);
  }
}
