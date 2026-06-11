import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EvidenceRequestModule } from './evidence-request/evidence-request.module';
import { AuditControlModule } from './audit-control/audit-control.module';

@Module({
  imports: [PrismaModule, EvidenceRequestModule, AuditControlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
