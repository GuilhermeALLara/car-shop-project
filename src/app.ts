import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandler';
import carRouter from './routes/carRoutes';
import MotorcycleRoute from './routes/motorcycleRoutes';

const app = express();

app.use(express.json());

app.use(carRouter);

app.use(MotorcycleRoute);

app.use(errorHandler);

export default app;
