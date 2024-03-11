import { UserSessionEntity } from "../../entities";
import { UserSessionSchema } from "../../schemas";
import { UserModel, UserSessionModel } from "../../models";
import { Types } from "mongoose";

export class UserSessionRepository {
  async create(_userSession: UserSessionEntity): Promise<UserSessionEntity> {
    const userSession: UserSessionSchema = _userSession.convertToSchema();
    const created = await UserSessionModel.create(userSession);
    return new UserSessionEntity().convertToEntity(created);
  }

  async update(_userSession: UserSessionEntity): Promise<UserSessionEntity> {
    const userSession: UserSessionSchema = _userSession.convertToSchema();
    const updated = await UserSessionModel.findOneAndUpdate(
      { _id: _userSession.getId() },
      { $set: userSession },
      { new: true },
    );

    return new UserSessionEntity().convertToEntity(updated);
  }

  async getById(_id: Types.ObjectId): Promise<UserSessionEntity> {
    const found = await UserSessionModel.findOne({ _id });

    return new UserSessionEntity().convertToEntity(found);
  }

  async deleteById(_id: Types.ObjectId): Promise<boolean> {
    const deleted = await UserSessionModel.deleteOne({ _id: _id });
    return deleted.deletedCount === 1;
  }

  async list(): Promise<Array<UserSessionEntity>> {
    return UserModel.find();
  }
}
