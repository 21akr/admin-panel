import { UserStatusEnum } from "../../infrastructure";
import { UserSchema } from "../schemas";
import { Types } from "mongoose";

export class UserEntity {
  protected _id?: Types.ObjectId;
  protected _fullName?: string;
  protected _email?: string;
  protected _password?: string;
  protected _status?: UserStatusEnum;

  buildId(id: Types.ObjectId): UserEntity {
    this._id = id;
    return this;
  }

  buildPassword(password: string): UserEntity {
    this._password = password;
    return this;
  }

  buildFullName(fullName: string): UserEntity {
    this._fullName = fullName;
    return this;
  }

  buildEmail(email: string): UserEntity {
    this._email = email;
    return this;
  }

  buildStatus(status: UserStatusEnum): UserEntity {
    this._status = status;
    return this;
  }

  getFullName(): string {
    return <string>this._fullName;
  }

  getEmail(): string {
    return <string>this._email;
  }

  getId(): Types.ObjectId {
    return <Types.ObjectId>this._id;
  }

  getPassword(): string {
    return <string>this._password;
  }

  getStatus(): UserStatusEnum {
    return <UserStatusEnum>this._status;
  }

  convertToEntity(user: UserSchema): UserEntity {
    if (!user) return null;
    this.buildId(user._id)
      .buildStatus(user.status)
      .buildPassword(user.password)
      .buildEmail(user.email)
      .buildFullName(user.fullName);
    return this;
  }

  convertToSchema(): UserSchema {
    return this
      ? {
          _id: this.getId(),
          status: this.getStatus(),
          email: this.getEmail(),
          fullName: this.getFullName(),
          password: this.getPassword(),
        }
      : null;
  }
}
