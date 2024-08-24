import { Design } from "@prisma/client";
import prisma from "../db";

export type TCreateDesign = Omit<Design, "id" | "createdAt" | "updatedAt">;

async function create(data: TCreateDesign): Promise<void> {
  await prisma.design.create({ data });
}

async function getAll(): Promise<Design[]> {
  return await prisma.design.findMany();
}

async function getById(id: string): Promise<Design | null> {
  return await prisma.design.findUnique({ where: { id } });
}

async function deleteById(id: string): Promise<void> {
  await prisma.design.delete({ where: { id } });
}

export const designRepository = {
  create,
  getAll,
  getById,
  deleteById
};
