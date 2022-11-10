import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const motoSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().positive().lte(2500),
});

export type IMotorcycle = z.infer<typeof motoSchema>;