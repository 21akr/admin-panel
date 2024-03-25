import { UserSessionEntity } from '../../entities';
import { UserSessionSchema } from '../../schemas';
import { UserSessionModel } from '../../models';
import { FilterQuery, Types } from 'mongoose';
import { BaseCRUDRepository } from '../base';
import { UserSessionRepositoryInterface } from '../../../infrastructure';

export class UserSessionRepository extends BaseCRUDRepository<UserSessionEntity, UserSessionSchema> implements UserSessionRepositoryInterface {
  async create(_userSession: UserSessionEntity): Promise<UserSessionEntity> {
    const userSession: UserSessionSchema = _userSession.convertToSchema();
    const created = await UserSessionModel.create(userSession);
    return new UserSessionEntity().convertToEntity(created);
  }

  async update(_userSession: UserSessionEntity): Promise<UserSessionEntity> {
    const userSession: UserSessionSchema = _userSession.convertToSchema();
    const updated = await UserSessionModel.findOneAndUpdate({ _id: _userSession.getId() }, { $set: userSession }, { new: true });
    return new UserSessionEntity().convertToEntity(updated);
  }

  async getById(_id: Types.ObjectId): Promise<UserSessionEntity> {
    const found = await UserSessionModel.findOne({ _id });
    return new UserSessionEntity().convertToEntity(found);
  }

  async getByUserId(_user: Types.ObjectId): Promise<UserSessionEntity> {
    const found = await UserSessionModel.findOne({ user: _user });
    return new UserSessionEntity().convertToEntity(found);
  }

  async deleteById(_id: Types.ObjectId): Promise<boolean> {
    const deleted = await UserSessionModel.deleteOne({ _id: _id });
    return deleted.deletedCount === 1;
  }

  async deleteByUserId(_user: Types.ObjectId): Promise<boolean> {
    const deleted = await UserSessionModel.deleteMany({ user: _user });
    return deleted.deletedCount >= 1;
  }

  async list(filter?: FilterQuery<any>): Promise<Array<UserSessionEntity>> {
    const userSessions = await UserSessionModel.find(filter);
    return this.multipleConverter(userSessions, UserSessionEntity);
  }

  async countDocumentsByFilter(filter: object): Promise<number> {
    return UserSessionModel.countDocuments(filter);
  }
}
