"use server";

import { designRepository } from "@/database/repositories/design-repository";
import { IActionResponse } from "@/types/global-action.type";
import { writeUploadFile } from "@/utils/write-to-disk.util";

export async function createDesignAction(
  data: FormData
): Promise<IActionResponse<string | null>> {
  try {
    // WRITE FILE TO DISK
    const file = data.get("file") as File;

    const filename = `${Date.now()}-${file?.name}`;

    const url = await writeUploadFile(file, filename);

    if (!url) {
      return {
        success: false,
        data: null,
        message: "Failed to save file",
      };
    }

    // SAVE FILE PATH TO DATABASE
    const title = data.get("title") as string;

    const description = data.get("description") as string;

    await designRepository.create({ title, description, file: url });

    return {
      success: true,
      message: "Design created successfully",
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
      data: JSON.stringify(error),
    };
  }
}
