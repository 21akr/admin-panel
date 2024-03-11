import express from "express";
import { findUserById } from "../../services";

export async function GetUserByIdController(
  req: express.Request,
  res: express.Response,
) {
  const id = req?.params?.id;

  try {
    const user = await findUserById(id);
    if (!user) {
      res.send("user Not Found");
    }

    res.json(user);
  } catch (err) {
    return res.send(err);
  }
}
