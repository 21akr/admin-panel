import { getModelForClass } from '@typegoose/typegoose';
import { UserSessionSchema } from '../schemas';

export const UserSessionModel = getModelForClass(UserSessionSchema, {
  schemaOptions: {
    collection: 'user_sessions',
    timestamps: true,
    minimize: true,
    versionKey: false,
  },
});
