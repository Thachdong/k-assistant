import { EStatus, Testcase } from "@prisma/client";
import prisma from "../db";

export type TCreateTestcase = Pick<
  Testcase,
  "title" | "description" | "specId" | "file"
>;

async function create(data: TCreateTestcase): Promise<Testcase> {
  return await prisma.testcase.create({ data });
}

async function findMany(): Promise<Testcase[]> {
  return await prisma.testcase.findMany();
}

async function getById(id: string): Promise<Testcase | null> {
  return await prisma.testcase.findUnique({ where: { id } });
}

async function deleteById(id: string): Promise<void> {
  await prisma.testcase.delete({ where: { id } });
}

async function updateStatu(id: string, status: EStatus): Promise<void> {
  await prisma.testcase.update({ where: { id }, data: { status } });
}

async function addFile(id: string, file: string): Promise<void> {
  await prisma.testcase.update({ where: { id }, data: { file } });
}

export const testcaseRepository = {
  create,
  findMany,
  getById,
  deleteById,
  updateStatu,
  addFile,
};
