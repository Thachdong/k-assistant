import { Chat } from "@prisma/client";
import prisma from "../db";

export type TCreateChatMessage = Omit<Chat, "id" | "createdAt" | "updatedAt">;

async function create(data: TCreateChatMessage): Promise<Chat> {
  const message = await prisma.chat.create({ data });

  return message;
}

async function getAll(): Promise<Chat[]> {
  return await prisma.chat.findMany();
}


export const chatRepository = {
    create,
    getAll
};