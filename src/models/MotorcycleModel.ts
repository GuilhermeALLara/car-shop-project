import { model as mongoosseCreateMode, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './mongoModel';

const motorcycleMongooseSchema = new Schema({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, {
  versionKey: false,
});

export default class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongoosseCreateMode('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
  }
}