import express from "express";
import { Repository } from "../../database";

export async function GetUsersListController(
  req: express.Request,
  res: express.Response,
) {
  try {
    const users = await Repository.User().list();

    res.json(users);
  } catch (err) {
    console.error(err);
    return err;
  }
}
