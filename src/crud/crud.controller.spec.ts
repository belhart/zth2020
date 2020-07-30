import { Test, TestingModule } from "@nestjs/testing";
import { LocationController, EmployeeController, EquipmentController } from "./crud.controller";
import { Location } from "../entities/location.entity";
import { Equipment } from "../entities/equipment.entity";
import { Employee } from "../entities/employee.entity";
import { CrudService } from "./crud.service";
import { TypeOrmModule } from "@nestjs/typeorm";

describe("Location Controller", () => {
  let controller: LocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Location, Equipment, Employee])],
      providers: [CrudService],
      controllers: [
        LocationController,
        EquipmentController,
        EmployeeController
      ]
    }).compile();

    controller = module.get<LocationController>(LocationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

/*import { Test, TestingModule } from "@nestjs/testing";
import { CrudService } from "./crud.service";
import { LocationController, EmployeeController, EquipmentController } from "./crud.controller";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Employee } from "../entities/employee.entity";
import { Location } from "../entities/location.entity";
import { Equipment } from "../entities/equipment.entity";
import { Repository } from "typeorm";
describe("-- Client Controller --", () => {
 let clientService: CrudService;
 let module: TestingModule;
 let clientController: LocationController;
 let clientRepositoryMock: MockType<Repository<Employee>>;
 let clientTypeRepositoryMock: MockType<Repository<Employee>>;
  beforeAll(async () => {
      module = await Test.createTestingModule({
        controllers: [LocationController, EmployeeController, EquipmentController],
        providers: [
          { provide: getRepositoryToken(Location), useFactory: repositoryMockFactory },
          { provide: getRepositoryToken(Employee), useFactory: repositoryMockFactory },
          { provide: getRepositoryToken(Equipment), useFactory: repositoryMockFactory },

        ]
    }).compile();
    clientService = module.get<CrudService>(CrudService);
    clientRepositoryMock = module.get(getRepositoryToken(Employee));
    clientTypeRepositoryMock = module.get(getRepositoryToken(Employee));
    clientService = module.get<CrudService>(CrudService);
  });

  it("should return true if active ", async () => {
    /*const equipment = new Equipment(); 
    equipment.name = "asd a";
    equipment.type = "oven";
    equipment.locatedat = "asd";
    await clientService.CreateEquipment(equipment);
    const asdasd = await clientService.GetAllEquipment();
    console.log(asdasd);
    clientRepositoryMock.create()
    const clientId = "1000-asdasd-asdasds-dfdfh";
    const employee = new Employee();
    employee.salary = 360;
    employee.job = "cook";
    employee.operates = "asdasdsadsa";
    employee.worksat = "asd";
    employee.name = "kis gizda";
    expect(await clientService.CreateEmployee(employee)).toThrow();
  });

  afterEach(async () => {
      jest.resetAllMocks();
  });
});


// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  CreateEmployee: jest.fn(entity => entity),
  CreateLocation: jest.fn(entity => entity),
  find: jest.fn(entity => entity),
  findAndCount: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  update: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
 }));

/*export const employeeMockFactory: () => MockType<Repository<Employee>> = jest.fn(() => ({ 
  createEmployee: jest.fn(entity => entity),
  find: jest.fn(entity => entity),
  findAndCount: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  update: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  createQueryBuilder: jest.fn(() => ({
    delete: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
})),
}));

 export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
 }*/