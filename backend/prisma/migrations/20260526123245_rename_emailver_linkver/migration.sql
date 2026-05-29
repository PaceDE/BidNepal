/*
  Warnings:

  - You are about to drop the `EmailVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LinkVerificationType" AS ENUM ('EMAIL', 'PASSWORD_RESET');

-- AlterEnum
ALTER TYPE "OTPVerificationType" ADD VALUE 'EMAIL';

-- DropForeignKey
ALTER TABLE "EmailVerification" DROP CONSTRAINT "EmailVerification_userId_fkey";

-- DropTable
DROP TABLE "EmailVerification";

-- DropEnum
DROP TYPE "EmailVerificationType";

-- CreateTable
CREATE TABLE "LinkVerification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "LinkVerificationType" NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkVerification_userId_type_key" ON "LinkVerification"("userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "LinkVerification_type_token_key" ON "LinkVerification"("type", "token");

-- AddForeignKey
ALTER TABLE "LinkVerification" ADD CONSTRAINT "LinkVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
