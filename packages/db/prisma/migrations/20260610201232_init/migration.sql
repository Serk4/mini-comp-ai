-- CreateTable
CREATE TABLE "EvidenceRequest" (
    "id" SERIAL NOT NULL,
    "rawText" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvidenceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceResult" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "recommendedControls" JSONB NOT NULL,
    "missingEvidence" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvidenceResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditControl" (
    "id" SERIAL NOT NULL,
    "framework" TEXT NOT NULL,
    "controlId" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AuditControl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EvidenceResult_requestId_key" ON "EvidenceResult"("requestId");

-- AddForeignKey
ALTER TABLE "EvidenceResult" ADD CONSTRAINT "EvidenceResult_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "EvidenceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
