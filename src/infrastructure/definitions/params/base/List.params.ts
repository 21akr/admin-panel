import { FilterQuery } from 'mongoose';

export interface ListParams {
  filter: FilterQuery<any>;
}
