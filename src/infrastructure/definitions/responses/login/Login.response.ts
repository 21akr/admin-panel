// interface PermissionInterFace {
//   target: string;
//   action: string;
// }

import { UserSessionStatusEnum, UserStatusEnum } from "../../../enums";
import { UserEntity, UserSessionEntity } from "../../../../database";

export class LoginResponse {
  fullName: string;

  email: string;

  userStatus?: UserStatusEnum;

  accessToken?: string;

  sessionStatus?: UserSessionStatusEnum;

  expiresAt: Date;

  // permissions?: Array<PermissionInterFace>;

  constructor(
    session: UserSessionEntity,
    user: UserEntity /*permissions: Array<UserPermissionEntity>*/,
  ) {
    if (session && user /*&& permissions*/) {
      this.fullName = user.getFullName();
      this.email = user.getEmail();
      this.userStatus = user.getStatus();
      this.accessToken = session.getAccessToken();
      this.sessionStatus = session.getStatus();
      this.expiresAt = session.getExpiresAt();
      // this.permissions = permissions.map(item => {
      //   return {
      //     target: item.getTarget(),
      //     action: item.getAction(),
      //   };
      // });
    }
  }
}
