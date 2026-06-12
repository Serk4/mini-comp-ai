import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Groq from 'groq-sdk';
import { EvidenceRequest, EvidenceResult } from '@prisma/client';
import { dedent } from 'ts-dedent';

type AiResponseShape = {
  summary: string;
  missingEvidence: string[];
  recommendedControls: string[];
};

@Injectable()
export class EvidenceRequestService {
  private readonly groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
  });

  constructor(private readonly prisma: PrismaService) {}

  async processEvidenceRequest(rawText: string): Promise<{ 
      request: EvidenceRequest; 
      result: EvidenceResult 
    }> {
    // 1. Save request
    const request = await this.prisma.evidenceRequest.create({
      data: { rawText },
    });

    // 2. Load controls
    const controls = await this.prisma.auditControl.findMany();

    // 3. Build prompt
    // prettier-ignore
const prompt = dedent(`
You are a compliance analyst. Analyze the following evidence text:

"${rawText}"

Tasks:
1. Summarize the evidence.
2. Identify missing evidence.
3. Recommend relevant SOC 2 controls from this list:

${controls.map(c => `- ${c.controlId}: ${c.description}`).join('\n')}

Return ONLY valid JSON with this shape:
{
  "summary": "...",
  "missingEvidence": [...],
  "recommendedControls": [...]
}

Do not include explanations, commentary, markdown, or code fences.
`);


    // 4. Call Groq
    const aiResponse = await this.groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    const message = aiResponse?.choices?.[0]?.message?.content ?? '{}';

    // 5. Safe JSON parse
    let parsed: AiResponseShape;
    try {
      parsed = JSON.parse(message) as AiResponseShape;
    } catch {
      throw new Error(`AI returned invalid JSON: ${message}`);
    }

    // 6. Save result
    const result = await this.prisma.evidenceResult.create({
      data: {
        requestId: request.id,
        summary: parsed.summary,
        missingEvidence: parsed.missingEvidence,
        recommendedControls: parsed.recommendedControls,
      },
    });

    return { request, result };
  }

  findAll() {
    return this.prisma.evidenceRequest.findMany({
      include: { result: true },
    });
  }

  findOne(id: number) {
    return this.prisma.evidenceRequest.findUnique({
      where: { id },
      include: { result: true },
    });
  }
}
