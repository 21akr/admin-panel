import express from 'express';
import { BaseListInterface, GetUserListParams, GetUserListResponse, ListParams } from '../../infrastructure';
import { FilterQuery } from 'mongoose';
import { getUserListCase } from '../../cases/user';

export async function GetUsersListController(req: express.Request, res: express.Response) {
  let params: GetUserListParams;
  let response: BaseListInterface<GetUserListResponse> = {
    meta: {
      count: 0,
    },
    items: [],
  };

  const filter: FilterQuery<any> = {};

  try {
    params = await new GetUserListParams(req.query).validate();
  } catch (err) {
    console.error(err);
    return res.send(err);
  }

  try {
    if (params.search && params.search.length > 2) {
      filter.$or = params.search
        .split(' ')
        .filter(Boolean)
        .map((regex: string) => ({
          $or: [{ fullName: { $regex: regex, $options: 'i' } }, { email: { $regex: regex, $options: 'i' } }],
        }));
    }

    const getUserListParams: ListParams = {
      filter: filter,
    };
    const list = await getUserListCase.execute(getUserListParams);

    response.meta = list.meta;
    response.items = list.items.map(users => new GetUserListResponse(users));

    return res.json(response);
  } catch (err) {
    console.error(err);
    return err;
  }
}
