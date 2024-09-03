import { ChatCompletion } from "@prisma/client";
import prisma from "../db";
import { TSearchChatCompletion } from "@/app/project/[projectId]/sourcecode/_components/drawing-box/fillter-chat-completion-form";

export type TCreateChatCompletion = Omit<
  ChatCompletion,
  "id" | "createdAt" | "updatedAt"
>;

async function create(data: TCreateChatCompletion): Promise<ChatCompletion> {
  return await prisma.chatCompletion.create({ data });
}

async function search(data: TSearchChatCompletion): Promise<ChatCompletion[]> {
  return prisma.chatCompletion.findMany({
    where: {
      prompt: {
        contains: data.searchTerms,
      },
      type: data.type,
    },
  });
}

export const chatCompletionRepository = {
  create,
  search,
};
