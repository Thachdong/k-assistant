import { Spec } from "@prisma/client";
import prisma from "../db";

export type TCreateSpec = Pick<Spec, "title" | "description" | "file">;

async function create(data: TCreateSpec): Promise<void> {
  await prisma.spec.create({ data });
}

async function findMany(): Promise<Spec[]> {
  return await prisma.spec.findMany();
}

async function getById(id: string): Promise<Spec | null> {
  return await prisma.spec.findUnique({ where: { id } });
}

async function deleteById(id: string): Promise<void> {
  await prisma.spec.delete({ where: { id } });
}

export const specRepository = {
    create,
    findMany,
    getById,
    deleteById,
}