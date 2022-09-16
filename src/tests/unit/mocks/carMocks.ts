import { ICar } from '../../../interfaces/ICar';

const carMock:ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carMockWithId:ICar & { _id:string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carMockForChangeWithId: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Caveirão",
  year: 2021,
  color: "preto",
  buyValue: 35000000,
  seatsQty: 7,
  doorsQty: 4
}

const carMockForChange: ICar = {
  model: "Caveirão",
  year: 2021,
  color: "preto",
  buyValue: 35000000,
  seatsQty: 7,
  doorsQty: 4
}

export {
  carMock,
  carMockWithId,
  carMockForChangeWithId,
  carMockForChange,
}
