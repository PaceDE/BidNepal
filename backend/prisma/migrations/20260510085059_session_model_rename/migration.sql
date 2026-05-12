/*
  Warnings:

  - You are about to drop the `VerificationSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('PENDING_VERIFICATION', 'AUTHENTICATED');

-- DropForeignKey
ALTER TABLE "VerificationSession" DROP CONSTRAINT "VerificationSession_userId_fkey";

-- DropTable
DROP TABLE "VerificationSession";

-- CreateTable
CREATE TABLE "Session" (
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT,
    "type" "SessionType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionId")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
