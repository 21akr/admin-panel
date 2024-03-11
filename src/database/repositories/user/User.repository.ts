import { UserEntity } from "../../entities";
import { UserSchema } from "../../schemas";
import { UserModel } from "../../models";
import { Types } from "mongoose";

export class UserRepository {
  async create(_user: UserEntity): Promise<UserEntity> {
    const user: UserSchema = _user.convertToSchema();
    const created = await UserModel.create(user);
    return new UserEntity().convertToEntity(created);
  }

  async update(_user: UserEntity): Promise<UserEntity> {
    const user: UserSchema = _user.convertToSchema();
    const updated = await UserModel.findOneAndUpdate(
      { _id: _user.getId() },
      { $set: user },
      { new: true },
    );

    return new UserEntity().convertToEntity(updated);
  }

  async getById(_id: Types.ObjectId): Promise<UserEntity> {
    const found = await UserModel.findOne({ _id });

    return new UserEntity().convertToEntity(found);
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const found = await UserModel.findOne({ email });

    return new UserEntity().convertToEntity(found);
  }

  async deleteById(_id: Types.ObjectId): Promise<boolean> {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted.deletedCount === 1;
  }

  async list(): Promise<Array<UserEntity>> {
    return UserModel.find({});
  }
}
