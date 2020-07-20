import { Test, TestingModule } from '@nestjs/testing';
import { SquaresController } from './squares.controller';

describe('Squares Controller', () => {
  let controller: SquaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SquaresController],
    }).compile();

    controller = module.get<SquaresController>(SquaresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
