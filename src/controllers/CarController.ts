import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    return res.status(200).json(result);
  }
}

export default CarController;
