import { Module } from '@nestjs/common';
import { EvidenceRequestService } from './evidence-request.service';
import { EvidenceRequestController } from './evidence-request.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EvidenceRequestController],
  providers: [EvidenceRequestService],
})
export class EvidenceRequestModule {}
