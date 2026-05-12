/*
  Warnings:

  - The values [AUTHENTICATED] on the enum `SessionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SessionType_new" AS ENUM ('PENDING_VERIFICATION', 'AUTHENTICATION');
ALTER TABLE "public"."Session" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Session" ALTER COLUMN "type" TYPE "SessionType_new" USING ("type"::text::"SessionType_new");
ALTER TYPE "SessionType" RENAME TO "SessionType_old";
ALTER TYPE "SessionType_new" RENAME TO "SessionType";
DROP TYPE "public"."SessionType_old";
ALTER TABLE "Session" ALTER COLUMN "type" SET DEFAULT 'AUTHENTICATION';
COMMIT;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "type" SET DEFAULT 'AUTHENTICATION';
