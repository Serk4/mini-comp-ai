import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is missing');
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function seedControl(c: {
  framework: string;
  controlId: string;
  description: string;
}) {
  try {
    const existing = await prisma.auditControl.findFirst({
      where: {
        framework: c.framework,
        controlId: c.controlId,
      },
    });

    if (existing) {
      await prisma.auditControl.update({
        where: { id: existing.id },
        data: { description: c.description },
      });
      return;
    }

    await prisma.auditControl.create({ data: c });
  } catch (err) {
    console.error(`⚠️ Connection dropped while seeding ${c.controlId}, retrying...`);
    await new Promise((r) => setTimeout(r, 500));

    // retry once
    await prisma.auditControl.create({ data: c });
  }
}

async function main() {
  console.log('🌱 Seeding AuditControl...');

  const controls = [
    {
      framework: 'SOC 2',
      controlId: 'CC6.1',
      description: 'Establish and maintain an access control policy.',
    },
    {
      framework: 'SOC 2',
      controlId: 'CC6.2',
      description: 'Review user access rights on a periodic basis.',
    },
    {
      framework: 'SOC 2',
      controlId: 'CC6.3',
      description: 'Require multi-factor authentication for all users.',
    },
  ];

  for (const c of controls) {
    await seedControl(c);
  }

  console.log('✅ AuditControl seeded successfully');
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
