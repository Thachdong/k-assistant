// bullmq/worker.js
import { Worker } from "bullmq";
import { redisOptions } from "./redis";
import { TESTCASE_QUEUE_NAME } from "./queue";
import { testcaseRepository } from "@/database/repositories/testcase-repository";
import { EStatus } from "@prisma/client";
import { generateTestCasesService } from "@/services/generate-testcase";

export function testcaseWorker() {
  const worker = new Worker(
    TESTCASE_QUEUE_NAME,
    async (job) => {
      const { testcaseId, filePath } = job.data;
      // 1. update testcase status to processing
      await testcaseRepository.updateStatus(testcaseId, EStatus.PROCESSING);

      // 2. start processing testcase
      console.log("Start processing job:", job.id, job.data);

      const file = await generateTestCasesService(filePath);

      // 3. update testcase file
      await testcaseRepository.addFile(testcaseId, file);
    },
    {
      connection: redisOptions,
    }
  );

  worker.on("completed", async(job) => {
    // update testcase status to completed
    const { testcaseId } = job.data;

    await testcaseRepository.updateStatus(testcaseId, EStatus.SUCCESS);

    console.log(`Job with id ${job.id} has been completed`);
  });

  worker.on("failed", async(job, err) => {
    // update testcase status to failed
    const { testcaseId } = job?.data || {};

    await testcaseRepository.updateStatus(testcaseId, EStatus.FAILED);
    
    console.error(`Job with id ${job?.id} has failed with ${err.message}`);
  });
}
