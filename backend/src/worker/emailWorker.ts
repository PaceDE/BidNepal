import redis from "@/config/redis.js";
import transporter from "@/config/email.js";
import { Worker } from "bullmq";
import type { Job } from "bullmq";

const emailWorker = new Worker('emails', async (job: Job) => {
  const { to, subject, content } = job.data;
  const mailOptions = {
    from: process.env.GMAIL_APP_EMAIL,
    to,
    subject,
    html: content,
  };
  return await transporter.sendMail(mailOptions);
}, { connection: redis, concurrency: 5 });

let isWorkerDown = false;

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed permanently:`, err);
});

emailWorker.on('error', (err) => {
  if (!isWorkerDown) {
    console.error('Email worker error, retrying in background:', err);
    isWorkerDown = true; // logs once, silent after
  }
});

emailWorker.on('ready', () => {
  if (isWorkerDown) {
    console.log('Email worker recovered!');
  } else {
    console.log('Email worker ready');
  }
  isWorkerDown = false; // reset so next outage logs again
});