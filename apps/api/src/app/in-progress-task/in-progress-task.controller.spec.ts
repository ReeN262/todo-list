import { Test, TestingModule } from '@nestjs/testing';
import { InProgressTaskController } from './in-progress-task.controller';

describe('InProgressTaskController', () => {
  let controller: InProgressTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InProgressTaskController],
    }).compile();

    controller = module.get<InProgressTaskController>(InProgressTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
