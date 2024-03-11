import express from "express";
import { BaseUserRequestInterface, UserStatusEnum } from "../infrastructure";
import { userSessionMiddlewareCase } from "../cases";

export async function UserSessionMiddleware(
  req: BaseUserRequestInterface,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (!(req.headers && req.headers.authorization)) {
      res.send("Token not provided");
    }

    const accessToken = req.headers.authorization?.split(" ")[1] || "";
    req.user = await userSessionMiddlewareCase.execute({
      accessToken,
      status: UserStatusEnum.ACTIVE,
    });

    return next();
  } catch (err) {
    console.error("Error during session validation:", err);
    return res.send(`An error occurred: ${err}`);
  }
}
