import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { config as loadEnv } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function loadEnvironment() {
  const cwd = process.cwd();
  const candidates = [
    resolve(cwd, '.env'),
    resolve(cwd, 'apps', 'api', '.env'),
    resolve(cwd, 'packages', 'db', '.env'),
    resolve(cwd, '..', '..', 'packages', 'db', '.env'),
  ];

  for (const filePath of new Set(candidates)) {
    if (!existsSync(filePath)) {
      continue;
    }

    // Keep already-defined env vars (shell/CI) as highest priority.
    loadEnv({ path: filePath, override: false });
  }
}

async function bootstrap() {
  loadEnvironment();
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
