import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EvidenceRequestService } from './evidence-request.service';
import { CreateEvidenceRequestDto } from './dto/create-evidence-request.dto';

@Controller('evidence-request')
export class EvidenceRequestController {
  constructor(private readonly service: EvidenceRequestService) {}

  @Post()
  async create(@Body() dto: CreateEvidenceRequestDto) {
    const { request } = await this.service.processEvidenceRequest(dto.rawText);
    return request;
  }

  // @Post()
  // create(@Body() dto: CreateEvidenceRequestDto) {
  //   return this.service.processEvidenceRequest(dto.rawText);
  // }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'completed' },
  ) {
    return this.service.updateStatus(Number(id), body.status);
  }
}
