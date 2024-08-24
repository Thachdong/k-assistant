import { Project } from "@prisma/client";
import prisma from "../db";

export type TCreateProject = Omit<Project, "id" | "createdAt" | "updatedAt">;

async function create(data: TCreateProject): Promise<void> {
  await prisma.project.create({ data });
}

async function getAll(): Promise<Project[]> {
  return await prisma.project.findMany();
}

async function getById(id: string): Promise<Project | null> {
  return await prisma.project.findUnique({ where: { id } });
}

async function updateSourceCode(id: string, sourceCode: string): Promise<void> {
  await prisma.project.update({
    where: { id },
    data: { sourceCode },
  });
}

export const projectRepository = {
  create,
  getAll,
  getById,
  updateSourceCode,
};
