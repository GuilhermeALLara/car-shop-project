import { IService } from '../interfaces/IService';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const carPerId = await this._car.readOne(_id);
    if (!carPerId) throw new Error(ErrorTypes.EntityNotFound);
    return carPerId;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._car.update(_id, obj);
  }

  public async delete(_id: string): Promise<ICar | null> {
    await this.readOne(_id);
    const results = await this._car.delete(_id);
    return results;
  }
}

export default CarService;
