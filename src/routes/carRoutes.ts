import { Router, Request, Response } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/carModel';
import CarService from '../services/carService';

const router = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

router.post('/cars', (req: Request, res: Response) =>
  carController.create(req, res));

export default router;
