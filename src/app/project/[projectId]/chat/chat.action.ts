"use server";

import {
  chatRepository,
  TCreateChatMessage,
} from "@/database/repositories/chat-repository";
import { IActionResponse } from "@/types/global-action.type";
import { Chat } from "@prisma/client";


export async function createChatMessageAction(
  data: TCreateChatMessage
): Promise<IActionResponse<string | Chat>> {
  try {
    const message = await chatRepository.create(data);

    return { success: true, data: message, message: "chat message created" };
  } catch (error) {
    return {
      success: false,
      data: JSON.stringify(error),
      message: "internal server error",
    };
  }
}
