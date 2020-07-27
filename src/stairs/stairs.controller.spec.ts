import { Test, TestingModule } from "@nestjs/testing";
import { StairsController } from "./stairs.controller";

describe("Squares Controller", () => {
  let controller: StairsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StairsController]
    }).compile();

    controller = module.get<StairsController>(StairsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
