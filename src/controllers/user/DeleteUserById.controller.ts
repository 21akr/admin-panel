import express from "express";
import { Repository } from "../../database";
import { Types } from "mongoose";

export async function DeleteUserByIdController(
  req: express.Request,
  res: express.Response,
) {
  try {
    const id = req?.params?.id;

    const user = await Repository.User().deleteById(new Types.ObjectId(id));

    return res.json(`deleted: ${user}`);
  } catch (err) {
    console.error(err);
    return err;
  }
}
