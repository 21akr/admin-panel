import { FilterQuery, Promise, Types } from 'mongoose';
import { BaseCRUDInterface, BaseEntityInterface } from '../../../infrastructure';

export abstract class BaseCRUDRepository<T extends BaseEntityInterface<T, K>, K> implements BaseCRUDInterface<T> {
  abstract create(arg: T): Promise<T>;

  abstract update(arg: T): Promise<T>;

  abstract getById(id: Types.ObjectId): Promise<T>;

  abstract list(filter?: FilterQuery<any>): Promise<Array<T>>;

  protected multipleConverter(_modelClassItems: K[], TCreator: { new (): T }): Array<T> {
    const entities: T[] = [];
    for (const item of _modelClassItems) {
      const entityObject = new TCreator().convertToEntity(item);
      entities.push(entityObject);
    }
    return entities;
  }
}
