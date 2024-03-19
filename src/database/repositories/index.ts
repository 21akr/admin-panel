import { UserRepositoryInterface, UserSessionRepositoryInterface } from '../../infrastructure';
import { UserRepository, UserSessionRepository } from './';

class Repositories {
  protected _userRepository: UserRepositoryInterface;
  protected _userSessionRepository: UserSessionRepositoryInterface;

  User(): UserRepositoryInterface {
    if (!this._userRepository) this._userRepository = new UserRepository();
    return this._userRepository;
  }

  UserSession(): UserSessionRepositoryInterface {
    if (!this._userSessionRepository) this._userSessionRepository = new UserSessionRepository();
    return this._userSessionRepository;
  }
}

export * from './user';
export * from './base';

export const Repository = new Repositories();
