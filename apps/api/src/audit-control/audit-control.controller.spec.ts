import { Test, TestingModule } from '@nestjs/testing';
import { AuditControlController } from './audit-control.controller';

describe('AuditControlController', () => {
  let controller: AuditControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditControlController],
    }).compile();

    controller = module.get<AuditControlController>(AuditControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
