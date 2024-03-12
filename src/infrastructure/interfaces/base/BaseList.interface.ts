export interface ListMetadata {
  count?: number;
}

export interface BaseListInterface<T> {
  items: Array<T>;
  meta: ListMetadata;
}
