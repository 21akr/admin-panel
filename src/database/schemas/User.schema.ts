import { index, prop } from '@typegoose/typegoose';
import { UserRoleEnum, UserStatusEnum } from '../../infrastructure';
import { Types } from 'mongoose';

@index({ firstName: 1, lastName: 1 })
export class UserSchema {
  _id?: Types.ObjectId;

  @prop()
  fullName?: string;

  @prop()
  email?: string;

  @prop()
  password?: string;

  @prop({ enum: UserStatusEnum, type: String })
  status?: UserStatusEnum;

  @prop({ enum: UserRoleEnum, type: String })
  userRole?: UserRoleEnum;

  createdAt?: Date;

  updatedAt?: Date;
}
