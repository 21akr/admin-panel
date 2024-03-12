import { FilterQuery, Types } from 'mongoose';

export interface BaseCRUDInterface<K> {
  create(arg: K): Promise<K>;

  update(arg: K): Promise<K>;

  getById(id: Types.ObjectId): Promise<K>;

  deleteById?(_id: Types.ObjectId): Promise<boolean>;

  list?(filter: FilterQuery<any>): Promise<Array<K>>;

  countDocumentsByFilter?(filter: FilterQuery<any>): Promise<number>;
}
