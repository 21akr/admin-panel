import { BaseCRUDInterface, UserRepositoryInterface } from '../../infrastructure';
import { UserRepository, UserSessionRepository } from './';
import { UserSessionEntity } from '../entities';

class Repositories {
  protected _userRepository: UserRepositoryInterface;
  protected _userSessionRepository: BaseCRUDInterface<UserSessionEntity>;

  User(): UserRepositoryInterface {
    if (!this._userRepository) this._userRepository = new UserRepository();
    return this._userRepository;
  }

  UserSession(): BaseCRUDInterface<UserSessionEntity> {
    if (!this._userSessionRepository) this._userSessionRepository = new UserSessionRepository();
    return this._userSessionRepository;
  }
}

export * from './user';
export * from './base';

export const Repository = new Repositories();
