/*
  Warnings:

  - Added the required column `componentName` to the `Generate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generate" ADD COLUMN     "componentName" TEXT NOT NULL;
