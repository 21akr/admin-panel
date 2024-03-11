import { TokenService } from "../../services";
import { Repository, UserEntity, UserSessionEntity } from "../../database";
import { Types } from "mongoose";
import { UserSessionStatusEnum, UserStatusEnum } from "../../infrastructure";
import { BaseCaseInterface } from "../../infrastructure/interfaces/base/BaseCase,interface";

interface UserSessionMiddlewareCaseParams {
  accessToken: string;
  status: UserStatusEnum;
}

export interface UserSessionMiddlewareCaseResponse {
  user: Types.ObjectId | UserEntity;
  session: string | UserSessionEntity;
}

export class UserSessionMiddlewareCase
  implements
    BaseCaseInterface<
      UserSessionMiddlewareCaseParams,
      UserSessionMiddlewareCaseResponse
    >
{
  async execute(
    params: UserSessionMiddlewareCaseParams,
  ): Promise<UserSessionMiddlewareCaseResponse> {
    try {
      const payload = new TokenService(
        process.env.JWT_SECRET,
        Number(process.env.JWT_EXPIRES),
      )
        .buildTokenService(params.accessToken)
        .verify() as UserSessionMiddlewareCaseResponse;

      const session = (await Repository.UserSession().getById(
        new Types.ObjectId(String(payload.session)),
      )) as UserSessionEntity;

      if (!session) {
        throw "Session Not Found";
      }

      if (session.getAccessToken() !== params.accessToken) {
        throw "Invalid Token";
      }

      if (session.getStatus() !== UserSessionStatusEnum.ACTIVE) {
        throw "User session is not activated! Please, activate.";
      }

      const user = (await Repository.User().getById(
        payload.user as Types.ObjectId,
      )) as UserEntity;

      if (
        user.getStatus() === UserStatusEnum.NEED_TO_CHANGE_PASSWORD &&
        params.status === UserStatusEnum.NEED_TO_CHANGE_PASSWORD
      ) {
        throw "Please, change your password";
      }

      return { user, session };
    } catch (err) {
      throw err;
    }
  }
}

export const userSessionMiddlewareCase: BaseCaseInterface<
  UserSessionMiddlewareCaseParams,
  UserSessionMiddlewareCaseResponse
> = new UserSessionMiddlewareCase();
