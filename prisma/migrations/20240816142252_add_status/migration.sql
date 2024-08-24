-- CreateEnum
CREATE TYPE "EStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "Testcase" ADD COLUMN     "status" "EStatus" NOT NULL DEFAULT 'PENDING';
