import { UserEntity } from '../../../../database';
import { GetUserListResponse } from './GetUserList.response';
import { UserRoleEnum } from '../../../enums';

export class GetUserResponse extends GetUserListResponse {
  userRole: UserRoleEnum;

  createdAt: Date;

  updatedAt: Date;

  constructor(user: UserEntity) {
    super(user);
    this.userRole = user.getUserRole();
    this.createdAt = user.getCreatedAt();
    this.updatedAt = user.getUpdatedAt();
  }
}
