-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Surgeon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "practiceName" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "suburb" TEXT NOT NULL DEFAULT '',
    "state" TEXT NOT NULL DEFAULT '',
    "postcode" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "website" TEXT NOT NULL DEFAULT '',
    "experienceQualification" TEXT NOT NULL DEFAULT '',
    "yearOfCompletion" INTEGER,
    "registrationStatus" TEXT NOT NULL DEFAULT 'fracs',
    "googleRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "googleReviewCount" INTEGER NOT NULL DEFAULT 0,
    "instagram" TEXT NOT NULL DEFAULT '',
    "tiktok" TEXT NOT NULL DEFAULT '',
    "beforeAfterLinks" TEXT NOT NULL DEFAULT '[]',
    "proceduresOffered" TEXT NOT NULL DEFAULT '[]',
    "priceRanges" TEXT NOT NULL DEFAULT '{}',
    "consultWaitTime" TEXT NOT NULL DEFAULT '',
    "consultCost" TEXT NOT NULL DEFAULT '',
    "secondConsultCost" TEXT NOT NULL DEFAULT '',
    "surgeryWaitTime" TEXT NOT NULL DEFAULT '',
    "revisionPolicy" TEXT NOT NULL DEFAULT '',
    "paymentPlansAvailable" BOOLEAN NOT NULL DEFAULT false,
    "paymentPlanDetails" TEXT NOT NULL DEFAULT '',
    "depositInfo" TEXT NOT NULL DEFAULT '',
    "beforeAfterAvailable" BOOLEAN NOT NULL DEFAULT false,
    "callExperienceNotes" TEXT NOT NULL DEFAULT '',
    "followUpNotes" TEXT NOT NULL DEFAULT '',
    "additionalInfo" TEXT NOT NULL DEFAULT '',
    "profileToken" TEXT NOT NULL,
    "lastProfileUpdate" TIMESTAMP(3),
    "reminderSentAt" TIMESTAMP(3),
    "acceptingPatients" BOOLEAN NOT NULL DEFAULT true,
    "internalRating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Surgeon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "typeformRaw" TEXT NOT NULL DEFAULT '',
    "transcript" TEXT NOT NULL DEFAULT '',
    "procedure" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "state" TEXT NOT NULL DEFAULT '',
    "timeline" TEXT NOT NULL DEFAULT '',
    "budget" TEXT NOT NULL DEFAULT '',
    "paymentPlan" TEXT NOT NULL DEFAULT '',
    "priorities" TEXT NOT NULL DEFAULT '[]',
    "travelWillingness" TEXT NOT NULL DEFAULT '',
    "previousConsults" TEXT NOT NULL DEFAULT '',
    "additionalNotes" TEXT NOT NULL DEFAULT '',
    "source" TEXT NOT NULL DEFAULT 'admin',
    "tier" TEXT NOT NULL DEFAULT 'free',
    "paidAt" TIMESTAMP(3),
    "stripeSessionId" TEXT NOT NULL DEFAULT '',
    "priceTransparency" TEXT NOT NULL DEFAULT '',
    "paymentPlanImportance" TEXT NOT NULL DEFAULT '',
    "timeSpentResearching" TEXT NOT NULL DEFAULT '',
    "consultationStatus" TEXT NOT NULL DEFAULT '',
    "confidence" TEXT NOT NULL DEFAULT '',
    "requirements" TEXT NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "aiResponseRaw" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "tier" TEXT NOT NULL DEFAULT 'free',
    "pdfGeneratedAt" TIMESTAMP(3),
    "pdfSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchSurgeon" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "surgeonId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "finalScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "matchReason" TEXT NOT NULL DEFAULT '',
    "strengthsSummary" TEXT NOT NULL DEFAULT '',
    "considerationsSummary" TEXT NOT NULL DEFAULT '',
    "adminNotes" TEXT NOT NULL DEFAULT '',
    "isManualOverride" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchSurgeon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Surgeon_profileToken_key" ON "Surgeon"("profileToken");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSurgeon" ADD CONSTRAINT "MatchSurgeon_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSurgeon" ADD CONSTRAINT "MatchSurgeon_surgeonId_fkey" FOREIGN KEY ("surgeonId") REFERENCES "Surgeon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
