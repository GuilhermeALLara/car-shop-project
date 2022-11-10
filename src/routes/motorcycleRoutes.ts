import { Router, Request, Response } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';

const MotorcycleRoute = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

const idRoute = '/motorcycles/:id';

MotorcycleRoute.post('/motorcycles', (req: Request, res: Response) =>
  motorcycleController.create(req, res));

MotorcycleRoute.get(idRoute, (req: Request, res: Response) =>
  motorcycleController.readOne(req, res));

MotorcycleRoute.get('/motorcycles', (req: Request, res: Response) =>
  motorcycleController.read(req, res));  

MotorcycleRoute.put(idRoute, (req: Request, res: Response) =>
  motorcycleController.update(req, res)); 

MotorcycleRoute.delete(idRoute, (req: Request, res: Response) =>
  motorcycleController.delete(req, res)); 

export default MotorcycleRoute;
