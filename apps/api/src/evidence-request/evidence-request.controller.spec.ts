import { Test, TestingModule } from '@nestjs/testing';
import { EvidenceRequestController } from './evidence-request.controller';

describe('EvidenceRequestController', () => {
  let controller: EvidenceRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvidenceRequestController],
    }).compile();

    controller = module.get<EvidenceRequestController>(
      EvidenceRequestController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
