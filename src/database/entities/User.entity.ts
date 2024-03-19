import { UserStatusEnum } from '../../infrastructure';
import { UserSchema } from '../schemas';
import { Types } from 'mongoose';

export class UserEntity {
  protected _id?: Types.ObjectId;
  protected _fullName?: string;
  protected _email?: string;
  protected _password?: string;
  protected _status?: UserStatusEnum;
  protected _createdAt?: Date;
  protected _updatedAt?: Date;

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

  buildCreatedAt(createdAt: Date): UserEntity {
    this._createdAt = createdAt;
    return this;
  }

  buildUpdatedAt(updatedAt: Date): UserEntity {
    this._updatedAt = updatedAt;
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

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  convertToEntity(user: UserSchema): UserEntity {
    if (!user) return null;
    this.buildId(user._id)
      .buildStatus(user.status)
      .buildPassword(user.password)
      .buildEmail(user.email)
      .buildFullName(user.fullName)
      .buildCreatedAt(user.createdAt)
      .buildUpdatedAt(user.updatedAt);
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
          createdAt: this.getCreatedAt(),
          updatedAt: this.getUpdatedAt(),
        }
      : null;
  }
}
