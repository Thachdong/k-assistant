"use server";

import { IActionResponse } from "@/types/global-action.type";
import { TCreateTestcase } from "./testcase.type";
import { testcaseRepository } from "@/database/repositories/testcase-repository";
import { specRepository } from "@/database/repositories/spec-repository";
import { testcaseQueue } from "@/bullmq/queue";
import { testcaseWorker } from "@/bullmq/worker";
import { EStatus } from "@prisma/client";
import { revalidatePath } from 'next/cache'

export async function createTestcaseAction(
  data: TCreateTestcase
): Promise<IActionResponse<string | null>> {
  try {
    const testcase = { ...data, file: null, status: EStatus.PENDING };

    const specs = await specRepository.getById(data.specId);

    if (specs) {
      const result = await testcaseRepository.create(testcase);

      await testcaseQueue.add('create-testcase', { filePath: `public${specs.file}`, testcaseId: result.id });

      revalidatePath('/', 'layout');

      testcaseWorker();
    }

    return {
      success: true,
      data: null,
      message: "Create testcase successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      message: JSON.stringify(error),
    };
  }
}
