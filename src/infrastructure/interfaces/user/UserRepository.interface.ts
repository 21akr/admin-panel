import { UserEntity } from '../../../database';
import { BaseCRUDInterface } from '../base';

export interface UserRepositoryInterface extends BaseCRUDInterface<UserEntity> {
  getByEmail(email: string): Promise<UserEntity>;
}
