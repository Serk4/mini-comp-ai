import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EvidenceRequestService } from './evidence-request.service';
import { CreateEvidenceRequestDto } from './dto/create-evidence-request.dto';

@Controller('evidence-request')
export class EvidenceRequestController {
  constructor(private readonly service: EvidenceRequestService) {}

  @Post()
  create(@Body() dto: CreateEvidenceRequestDto) {
    return this.service.processEvidenceRequest(dto.rawText);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }
}
