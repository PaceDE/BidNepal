-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "firstLogin" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileSetup" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "lastName" DROP NOT NULL;
