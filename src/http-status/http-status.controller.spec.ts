import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatusController } from "./http-status.controller";

describe("HttpStatus Controller", () => {
  let controller: HttpStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpStatusController]
    }).compile();

    controller = module.get<HttpStatusController>(HttpStatusController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
