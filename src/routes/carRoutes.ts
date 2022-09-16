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

router.get('/cars', (req: Request, res: Response) =>
  carController.read(req, res));

router.get('/cars/:id', (req: Request, res: Response) =>
  carController.readOne(req, res));

router.put('/cars/:id', (req: Request, res: Response) =>
  carController.update(req, res));

export default router;
