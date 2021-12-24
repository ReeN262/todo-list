import { Test, TestingModule } from '@nestjs/testing';
import { DoneTaskService } from './done-task.service';

describe('DoneTaskService', () => {
  let service: DoneTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoneTaskService],
    }).compile();

    service = module.get<DoneTaskService>(DoneTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
