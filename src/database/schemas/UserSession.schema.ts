import { index, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { UserSchema } from './User.schema';
import { UserSessionStatusEnum } from '../../infrastructure';

@index({ ownerId: 1 })
@index({ accessToken: 1 }, { unique: true })
@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class UserSessionSchema {
  @prop({ ref: () => UserSchema })
  user?: Ref<UserSchema>;

  @prop({ enum: UserSessionStatusEnum, type: String })
  status?: UserSessionStatusEnum;

  @prop()
  accessToken?: string;

  @prop()
  userAgent?: string;

  @prop()
  expireSeconds?: number;

  _id?: Types.ObjectId;

  @prop()
  usedAt?: Date;

  @prop()
  expiresAt?: Date;
}
