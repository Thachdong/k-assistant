"use server";

import { specRepository } from "@/database/repositories/spec-repository";
import { IActionResponse } from "@/types/global-action.type";
import { writeUploadFile } from "@/utils/write-to-disk.util";

export async function createSpecAction(
  data: FormData
): Promise<IActionResponse<string | null>> {
  try {
    // WRITE FILE TO DISK
    const file = data.get("file") as File;

    const filename = `${file?.name?.split(".")[0]}-${Date.now()}.xlsx`;

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

    await specRepository.create({ title, description, file: url });

    return {
      success: true,
      data: null,
      message: "Spec created successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: JSON.stringify(error),
    };
  }
}
