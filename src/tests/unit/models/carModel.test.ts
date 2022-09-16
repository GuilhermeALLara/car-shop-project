import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/carModel';
import { Model } from 'mongoose';
import { 
  carMock, 
  carMockWithId, 
  carMockForChange, 
  carMockForChangeWithId 
} from '../mocks/carMocks';
import { ErrorTypes } from '../../../errors/catalog';

describe('CarModel tests', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);      
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId);
    sinon.stub(Model, 'findByIdAndRemove').resolves(carMockForChangeWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('EndPoint POST /cars', () => {
    it('Caso o carro seja criado com sucesso', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('EndPoint GET /cars', () => {
    it('Caso todos os carros sejam listados com sucesso', async () => {
      const allCarFound = await carModel.read();
      expect(allCarFound).to.be.deep.equal(carMockWithId);
    });
  });

  describe('EndPoint GET /cars/id', () => {
    it('Caso seja retornado o carro por meio do seu ID com sucesso', async () => {
    const carFoundWithID = await carModel.readOne('4edd40c86762e0fb12000003');
    expect(carFoundWithID).to.be.deep.equal(carMockWithId);
    });
});

describe('EndPoint GET /cars/id', () => {
  it('Caso seja retornado o carro por meio do seu ID com sucesso', async () => {
    const carFoundWithID = await carModel.readOne('4edd40c86762e0fb12000003');
    expect(carFoundWithID).to.be.deep.equal(carMockWithId);
  });

  it('Caso não encontre o _id', async () => {
    try {
      await carModel.readOne('incorrectID');
    } catch (error: any) {
      expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
    }
  });
});

describe('EndPoint PUT /cars/:id', () => {
  it('Caso os dados sejam atualizados com sucesso', async () => {
    const updateCar = await carModel.update('4edd40c86762e0fb12000003', carMockForChange);
    expect(updateCar).to.be.deep.equal(carMockForChangeWithId);
  });

  it('Caso o _id não seja válido', async () => {
    try {
      await carModel.update('incorrectID', carMockForChange);
    } catch (error:any) {
      expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
    }
  });
});

describe('EndPoint DELETE /cars/:id', () => {
  it('Caso os dados sejam apagados com sucesso por meio do _id', async () => {
  const deletedCar = await carModel.delete('4edd40c86762e0fb12000003');
  expect(deletedCar).to.be.deep.equal(carMockForChangeWithId);
  });
});

});
