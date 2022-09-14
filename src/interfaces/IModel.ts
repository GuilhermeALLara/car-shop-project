export interface IModel<T> {
  create(data: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(_id: string): Promise<T | null>;
  update(_id: string, data: T): Promise<T | null>;
  delete(_id: string): Promise<T | null>; 
}
