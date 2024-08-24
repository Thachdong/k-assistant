// bullmq/queue.js
import { Queue } from 'bullmq';
import { redisOptions } from './redis';

export const TESTCASE_QUEUE_NAME = 'TESTCASE_QUEUE';

export const testcaseQueue = new Queue(TESTCASE_QUEUE_NAME, {
  connection: redisOptions,
});
