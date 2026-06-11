import { Test, TestingModule } from '@nestjs/testing';
import { AuditControlService } from './audit-control.service';

describe('AuditControlService', () => {
  let service: AuditControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditControlService],
    }).compile();

    service = module.get<AuditControlService>(AuditControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
