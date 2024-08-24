"use server";

import {
  chatCompletionRepository,
  TCreateChatCompletion,
} from "@/database/repositories/chat-completion-repository";
import { IActionResponse } from "@/types/global-action.type";
import { ChatCompletion } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createChatCompletionAction(
  data: TCreateChatCompletion,
): Promise<IActionResponse<ChatCompletion | string>> {
  try {
    const completion = await chatCompletionRepository.create(data);

    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Chat completion created",
      data: completion,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
      data: JSON.stringify(error),
    };
  }
}