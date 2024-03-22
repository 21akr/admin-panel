import { Types } from 'mongoose';
import { UserStatusEnum } from '../../../enums';
import { UserEntity } from '../../../../database';

export class GetUserListResponse {
  id?: Types.ObjectId;
  fullName?: string;
  email?: string;
  status?: UserStatusEnum;

  constructor(user: UserEntity) {
    this.id = user.getId();
    this.fullName = user.getFullName();
    this.email = user.getEmail();
    this.status = user.getStatus();
  }
}
