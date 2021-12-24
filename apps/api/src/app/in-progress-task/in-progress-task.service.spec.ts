import { Test, TestingModule } from '@nestjs/testing';
import { InPrgoressTaskService } from './in-progress-task.service';

describe('InPrgoressTaskService', () => {
  let service: InPrgoressTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InPrgoressTaskService],
    }).compile();

    service = module.get<InPrgoressTaskService>(InPrgoressTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
