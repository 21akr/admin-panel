import { UserEntity } from '../../../../database';
import { GetUserListResponse } from './GetUserList.response';

export class GetUserResponse extends GetUserListResponse {
  createdAt: Date;

  updatedAt: Date;

  constructor(user: UserEntity) {
    super(user);
    this.createdAt = user.getCreatedAt();
    this.updatedAt = user.getUpdatedAt();
  }
}
