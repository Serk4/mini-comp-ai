import { Module } from '@nestjs/common';
import { AuditControlService } from './audit-control.service';
import { AuditControlController } from './audit-control.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuditControlController],
  providers: [AuditControlService],
})
export class AuditControlModule {}
