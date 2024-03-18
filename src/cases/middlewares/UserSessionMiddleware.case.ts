import { TokenService } from '../../services';
import { Repository, UserEntity, UserSessionEntity } from '../../database';
import { Types } from 'mongoose';
import { BaseCaseInterface, UserSessionStatusEnum, UserStatusEnum } from '../../infrastructure';

interface UserSessionMiddlewareCaseParams {
  accessToken: string;
  status: UserStatusEnum;
}

interface UserSessionMiddlewareCaseResponse {
  user: Types.ObjectId | UserEntity;
  session: UserSessionEntity;
}

export class UserSessionMiddlewareCase implements BaseCaseInterface<UserSessionMiddlewareCaseParams, UserSessionMiddlewareCaseResponse> {
  async execute(params: UserSessionMiddlewareCaseParams): Promise<UserSessionMiddlewareCaseResponse> {
    try {
      const payload = new TokenService(process.env.JWT_SECRET, Number(process.env.JWT_EXPIRES))
        .buildTokenService(params.accessToken)
        .verify() as UserSessionMiddlewareCaseResponse;

      if (!payload || !payload.user || !payload.session) {
        throw new Error('Invalid token structure');
      }

      const session = await Repository.UserSession().getById(new Types.ObjectId(String(payload.session)));
      const user = await Repository.User().getById(payload.user as Types.ObjectId);

      if (!session || session.getStatus() !== UserSessionStatusEnum.ACTIVE) {
        throw new Error('Invalid or inactive session');
      }

      if (session.getAccessToken() !== params.accessToken) {
        throw new Error('Invalid token');
      }

      if (user.getStatus() === UserStatusEnum.NEED_TO_CHANGE_PASSWORD && params.status !== UserStatusEnum.NEED_TO_CHANGE_PASSWORD) {
        throw new Error('Please, change your password');
      }

      return { user, session };
    } catch (err) {
      console.error('Error during session validation:', err);
      throw new Error('An error occurred');
    }
  }
}

export const userSessionMiddlewareCase: BaseCaseInterface<UserSessionMiddlewareCaseParams, UserSessionMiddlewareCaseResponse> =
  new UserSessionMiddlewareCase();
