import { Types } from 'mongoose';
import { UserEntity } from './User.entity';
import { UserSessionStatusEnum } from '../../infrastructure';
import { UserSchema, UserSessionSchema } from '../schemas';

export class UserSessionEntity {
  protected _id?: Types.ObjectId;
  protected _user?: Types.ObjectId | UserEntity;
  protected _accessToken?: string;
  protected _userAgent?: string;
  protected _expireSeconds?: number;
  protected _status?: UserSessionStatusEnum;
  protected _usedAt?: Date;
  protected _expiresAt?: Date;

  /** Builders */
  buildId(id: Types.ObjectId): UserSessionEntity {
    this._id = id;
    return this;
  }

  buildUser(user: Types.ObjectId | UserSchema): UserSessionEntity {
    if (user instanceof Types.ObjectId) {
      this._user = user;
    } else {
      this._user = new UserEntity().convertToEntity(user);
    }

    return this;
  }

  buildAccessToken(accessToken: string): UserSessionEntity {
    this._accessToken = accessToken;
    return this;
  }

  buildUserAgent(userAgent: string): UserSessionEntity {
    this._userAgent = userAgent;
    return this;
  }

  buildExpireSeconds(expireSeconds: number): UserSessionEntity {
    this._expireSeconds = expireSeconds;
    return this;
  }

  buildStatus(status: UserSessionStatusEnum): UserSessionEntity {
    this._status = status;
    return this;
  }

  buildUsedAt(usedAt: Date): UserSessionEntity {
    this._usedAt = usedAt;
    return this;
  }

  buildExpiresAt(expiresAt: Date): UserSessionEntity {
    this._expiresAt = expiresAt;
    return this;
  }

  /** Getters */
  getUser(): Types.ObjectId | UserEntity {
    return this._user;
  }

  getAccessToken(): string {
    return this._accessToken;
  }

  getUserAgent(): string {
    return this._userAgent;
  }

  getExpireSeconds(): number {
    return this._expireSeconds;
  }

  getStatus(): UserSessionStatusEnum {
    return this._status;
  }

  getId(): Types.ObjectId {
    return this._id;
  }

  getUsedAt(): Date {
    return this._usedAt;
  }

  getExpiresAt(): Date {
    return this._expiresAt;
  }

  /** Settings */
  convertToEntity(session: UserSessionSchema): UserSessionEntity {
    if (session == null) return null;
    this.buildId(session._id)
      .buildUser(session.user)
      .buildAccessToken(session.accessToken)
      .buildUserAgent(session.userAgent)
      .buildExpireSeconds(session.expireSeconds)
      .buildUsedAt(session.usedAt)
      .buildExpiresAt(session.expiresAt)
      .buildStatus(session.status);
    return this;
  }

  convertToSchema(): UserSessionSchema {
    return this
      ? {
          _id: this.getId(),
          accessToken: this.getAccessToken(),
          status: this.getStatus(),
          expireSeconds: this.getExpireSeconds(),
          expiresAt: this.getExpiresAt(),
          user: this.getUser() as Types.ObjectId,
          usedAt: this.getUsedAt(),
          userAgent: this.getUserAgent(),
        }
      : null;
  }
}
