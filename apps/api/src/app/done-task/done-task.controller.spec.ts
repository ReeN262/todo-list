import { Test, TestingModule } from '@nestjs/testing';
import { DoneTaskController } from './done-task.controller';

describe('DoneTaskController', () => {
  let controller: DoneTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoneTaskController],
    }).compile();

    controller = module.get<DoneTaskController>(DoneTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
