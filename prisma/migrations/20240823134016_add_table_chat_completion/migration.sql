/*
  Warnings:

  - You are about to drop the `Generate` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ECompletionType" AS ENUM ('ADD_COMPONENT', 'REFACTOR_COMPONENT', 'ADD_UNIT_TEST', 'ADD_STORYBOOK');

-- DropTable
DROP TABLE "Generate";

-- DropEnum
DROP TYPE "EGenerateTypes";

-- CreateTable
CREATE TABLE "ChatCompletion" (
    "id" TEXT NOT NULL,
    "type" "ECompletionType" NOT NULL,
    "prompt" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "componentName" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatCompletion_pkey" PRIMARY KEY ("id")
);
