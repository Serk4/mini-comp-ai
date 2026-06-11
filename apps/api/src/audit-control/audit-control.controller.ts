import { Controller, Get } from '@nestjs/common';
import { AuditControlService } from './audit-control.service';

@Controller('audit-controls')
export class AuditControlController {
  constructor(private readonly service: AuditControlService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
