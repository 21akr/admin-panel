import { UserSessionEntity } from '../../../database';
import { BaseCRUDInterface } from '../base';
import { Types } from 'mongoose';

export interface UserSessionRepositoryInterface extends BaseCRUDInterface<UserSessionEntity> {
  deleteByUserId(_id: Types.ObjectId): Promise<boolean>;
}
