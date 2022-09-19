import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';
import { ErrorTypes } from '../../../errors/catalog';
import { ZodError } from 'zod';
import { 
  carMock,
  carMockWithId,
  carMockForChange, 
  carMockForChangeWithId 
} from '../mocks/carMocks';

const { expect } = chai;

describe('CarServices tests', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel , 'create').resolves(carMockForChangeWithId);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockForChangeWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(carMockForChangeWithId);
    sinon.stub(carModel, 'update').resolves(carMockForChangeWithId);
    sinon.stub(carModel, 'read').resolves([carMock]);
    sinon.stub(carModel, 'delete').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('EndPoint POST /cars', () => {
    it('Caso o carro seja criado com sucesso', async () =>{
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockForChangeWithId)
    });
    it('Caso ocorra erro na criação do novo carro', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('EndPoint GET /cars', () => {
    it('Caso todos os carros sejam listados com sucesso', async () => {
      const allCarFound = await carService.read();
      expect(allCarFound).to.be.deep.equal([carMock]);
    });
  });

  describe('EndPoint GET /cars/id', () => {
    it('Caso seja retornado o carro por meio do seu ID com sucesso', async () => {
      const carFoundWithID = await carService.readOne(carMockForChangeWithId._id);
      expect(carFoundWithID).to.be.deep.equal(carMockForChangeWithId);
      });
      it('Caso ocorra erro na listagem por meio do ID', async () => {
        try {
          await carService.readOne(carMockForChangeWithId._id);
        } catch (error: any) {
          expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
        }
      });
  });

  describe('EndPoint PUT /cars/:id', () => {
    it('Atualizado com sucesso o registro de um carro através do seu id', async () => {
			const updateCar = await carService.update('4edd40c86762e0fb12000003', carMockForChange);
			expect(updateCar).to.be.deep.equal(carMockForChangeWithId);
		});
    it('Caso ocorra um erro ao atualizar o registro do carro', async () => {
      try {
          await carService.update('4edd40c86762e0fb12000003', carMockForChange);
      } catch (error: any) {
          expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
  });
    it('Caso o _id não seja válido', async () => {
    try {
        await carModel.readOne('incorrectID');
    } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);

    }
    });
  });

  describe('EndPoint DELETE /cars/:id', () => {
  //  it('Caso os dados sejam apagados com sucesso por meio do _id', async () => {
  //    const deletedCar = await carService.delete('4edd40c86762e0fb12000003');
  //    expect(deletedCar).to.be.deep.equal(carMockWithId);
  //  });
    it('Caso não seja encontrado _ID', async () => {
      try {
        await carService.delete('incorrectID');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    })
  });
});
