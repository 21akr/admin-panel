import { UserSessionStatusEnum, UserStatusEnum } from '../../../enums';
import { UserEntity, UserSessionEntity } from '../../../../database';

export class LoginResponse {
  fullName: string;

  email: string;

  userStatus?: UserStatusEnum;

  accessToken?: string;

  sessionStatus?: UserSessionStatusEnum;

  expiresAt: Date;

  constructor(session: UserSessionEntity, user: UserEntity) {
    if (session && user) {
      this.fullName = user.getFullName();
      this.email = user.getEmail();
      this.userStatus = user.getStatus();
      this.accessToken = session.getAccessToken();
      this.sessionStatus = session.getStatus();
      this.expiresAt = session.getExpiresAt();
    }
  }
}
