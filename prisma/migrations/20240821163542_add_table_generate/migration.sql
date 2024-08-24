-- CreateEnum
CREATE TYPE "EGenerateTypes" AS ENUM ('ADD_COMPONENT', 'REFACTOR_COMPONENT', 'ADD_UNIT_TEST', 'ADD_STORYBOOK');

-- CreateTable
CREATE TABLE "Generate" (
    "id" TEXT NOT NULL,
    "type" "EGenerateTypes" NOT NULL,
    "role" "ERoles" NOT NULL,
    "prompt" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Generate_pkey" PRIMARY KEY ("id")
);
