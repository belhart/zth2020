import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { LocationController, EmployeeController, EquipmentController } from "../src/crud/crud.controller";
import { Location } from "../src/entities/location.entity";
import { Equipment } from "../src/entities/equipment.entity";
import { Employee } from "../src/entities/employee.entity";
import { CrudService } from "../src/crud/crud.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CrudModule } from "../src/crud/crud.module";
import { Repository } from "typeorm";
import supertest = require("supertest");


describe("AppController (e2e)", () => {
  let locationRepository: Repository<Location>;
  let employeeRepository: Repository<Employee>;
  let equipmentRepository: Repository<Equipment>;
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeAll(async() => {
    jest.setTimeout(300000);
    moduleFixture = await Test.createTestingModule({
      imports: [CrudModule, TypeOrmModule.forRoot({
        name: "default",
        type: 'postgres',
        host: '95.111.254.24',
        port: 5432,
        username: 'dbowner',
        password: 'dc2ggdhn',
        database: 'e2etest',
        entities: ['./**/*.entity.ts'],
        synchronize: true,
      }),]
    }).compile();
    app = moduleFixture.createNestApplication();
    locationRepository = moduleFixture.get('LocationRepository');
    equipmentRepository = moduleFixture.get('EquipmentRepository');
    employeeRepository = moduleFixture.get('EmployeeRepository');
    await app.init();
  })
  
  afterEach(async () => {
    await locationRepository.query(`DELETE FROM location;`);
  });

  afterAll(async () => {
    await app.close();
  });

  /*describe('POST /api/location', () => {
    it('should return an array of locations', async () => {
      // Pre-populate the DB with some dummy users
      await locationRepository.save([
        { name: 'test-name-0', address: "234234" },
        { name: 'test-name-1', address: "456" },
      ]);
  
      // Run your end-to-end test
      const { body } = await supertest.agent(app.getHttpServer())
        .get('/api/location')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(body).toEqual([
        { id: expect.any(String), name: 'test-name-0', address: "234234"},
        { id: expect.any(String), name: 'test-name-1',address: "456" },
      ]);
    });
  });*/

  describe('POST /api/employee', () => {
    it('should return a Badrequest because of too low salary', async () => {
      // Pre-populate the DB with some dummy users
      const location = await locationRepository.save([
        { name: 'test-name-0', address: "234234" },
      ]);
      const equip = await equipmentRepository.save([{ name: "asd", type: "oven", locatedat: location[0]['id'] }]);

      const { body } = await supertest.agent(app.getHttpServer())
        .post('/api/employee')
        .set('Accept', 'application/json')
        .send({name: 'test name', worksat: location[0]['id'], operates: equip[0]['id'], salary: 250, job: "cook"})
        .expect(400);

        expect(body).toEqual({
          statusCode: 400,
          message: [ 'salary must not be less than 300' ],
          error: 'Bad Request'
        });
    });
    it('should return a Badrequest because of not enough oven', async () => {
      // Pre-populate the DB with some dummy users
      const location = await locationRepository.save([
        { name: 'test-name-0', address: "234234" },
      ]);
      const equip = await equipmentRepository.save([{ name: "asd", type: "oven", locatedat: location[0]['id'] }]);

      await supertest.agent(app.getHttpServer())
        .post('/api/employee')
        .set('Accept', 'application/json')
        .send({name: 'test name', worksat: location[0]['id'], operates: equip[0]['id'], salary: 350, job: "cook"}).expect(201);

      const { body } = await supertest.agent(app.getHttpServer())
        .post('/api/employee')
        .set('Accept', 'application/json')
        .send({name: 'test name2', worksat: location[0]['id'], operates: equip[0]['id'], salary: 345, job: "cook"})
        .expect(400);
      
      expect(body).toEqual(
        {
          statusCode: 400,
          message: 'Equipment already in use by someone else',
          error: 'Bad Request'
        });
    });
    it('should return a Badrequest because of avarge salary difference', async () => {
      // Pre-populate the DB with some dummy users
      const location = await locationRepository.save([
        { name: 'test-name-0', address: "234234" },
      ]);
      const equip = await equipmentRepository.save([{ name: "asd", type: "oven", locatedat: location[0]['id'] }]);
      const equip2 = await equipmentRepository.save([{ name: "asd2", type: "oven", locatedat: location[0]['id'] }]);
      //await equipmentRepository.save([{ name: "asd2", type: "oven", locatedat: location[0]['id'] }]);

      await employeeRepository.save([{name: 'test name', worksat: location[0]['id'], operates: equip[0]['id'], salary: 350, job: "cook"}])

      const { body } = await supertest.agent(app.getHttpServer())
        .post('/api/employee')
        .set('Accept', 'application/json')
        .send({name: 'test name2', worksat: location[0]['id'], operates: equip2[0]['id'], salary: 450, job: "cook"})
        .expect(400);

        expect(body).toEqual({
          statusCode: 400,
          message: 'The salary of the employee is too low or too high than the avarge salary at this location',
          error: 'Bad Request'
        });
    });
    it('should return a Badrequest because of manager salary lower than the maximum of employees salary', async () => {
      // Pre-populate the DB with some dummy users
      const location = await locationRepository.save([
        { name: 'test-name-0', address: "234234" },
      ]);
      const equip = await equipmentRepository.save([{ name: "asd", type: "oven", locatedat: location[0]['id'] }]);
      const equip2 = await equipmentRepository.save([{ name: "asd2", type: "oven", locatedat: location[0]['id'] }]);

      await employeeRepository.save([{name: 'test name', worksat: location[0]['id'], operates: equip[0]['id'], salary: 350, job: "cook"}])

      const { body } = await supertest.agent(app.getHttpServer())
        .post('/api/employee')
        .set('Accept', 'application/json')
        .send({name: 'test name2', worksat: location[0]['id'], operates: equip2[0]['id'], salary: 320, job: "manager"})
        .expect(400);
      expect(body).toEqual({
          statusCode: 400,
          message: 'The salary of the manager is too low max salary at this location',
          error: 'Bad Request'
        });
    });
    it('should return a Badrequest because of not same location', async () => {
      // Pre-populate the DB with some dummy users
      const location = await locationRepository.save([
        { name: 'test-name-0', address: "234234" },
      ]);
      const location2 = await locationRepository.save([
        { name: 'test-name-1', address: "234234" },
      ]);
      const equip = await equipmentRepository.save([{ name: "asd", type: "oven", locatedat: location[0]['id'] }]);
      const equip2 = await equipmentRepository.save([{ name: "asd2", type: "oven", locatedat: location2[0]['id'] }]);

      await employeeRepository.save([{name: 'test name', worksat: location[0]['id'], operates: equip[0]['id'], salary: 350, job: "cook"}])

      const { body } = await supertest.agent(app.getHttpServer())
        .post('/api/employee')
        .set('Accept', 'application/json')
        .send({name: 'test name2', worksat: location[0]['id'], operates: equip2[0]['id'], salary: 320, job: "cook"})
        .expect(400);

        expect(body).toEqual({
          statusCode: 400,
          message: 'Not the same location',
          error: 'Bad Request'
        });
    });
  });
});

/*describe("Location Controller", () => {
  let employeecontroller: EmployeeController;
  let locationcontroller: LocationController;
  let equipmentcontroller: EquipmentController;
  let crudService: CrudService;
  let catsService = { findAll: () => ['test'] };
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule,CrudModule],
    }).overrideProvider(CrudService).useValue(crudService).compile();

    app = module.createNestApplication();
    await app.init();
    locationcontroller = module.get<LocationController>(LocationController);
    equipmentcontroller = module.get<EquipmentController>(EquipmentController);
    employeecontroller = module.get<EmployeeController>(EmployeeController);
    crudService = module.get<CrudService>(CrudService);
  });


  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("Hello World!");
  });
});*/
