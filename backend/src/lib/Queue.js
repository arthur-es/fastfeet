import Bee from 'bee-queue';

import CancelPackageMail from '../app/jobs/cancelPackageMail';
import NewPackageMail from '../app/jobs/newPackageMail';

import redisConfig from '../config/redis';

const jobs = [CancelPackageMail, NewPackageMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, { redis: redisConfig }),
        handle,
      };
    });
  }

  add(queue, job) {
    console.log('Add method');
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('fail', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.error(`Queue ${job.queue.name} FAILED:\n`, err);
  }
}

export default new Queue();
