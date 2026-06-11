import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditControlService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.auditControl.findMany({
      orderBy: { controlId: 'asc' },
    });
  }
}
