import { index, prop } from '@typegoose/typegoose';
import { UserStatusEnum } from '../../infrastructure';
import { Types } from 'mongoose';

@index({ firstName: 1, lastName: 1 })
export class UserSchema {
  @prop()
  fullName?: string;

  @prop()
  email?: string;

  @prop()
  password?: string;

  @prop({ enum: UserStatusEnum, type: String })
  status?: UserStatusEnum;

  _id?: Types.ObjectId;
}
