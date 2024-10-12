import { registerAs } from '@nestjs/config';

export default registerAs('sqs', () => ({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  queueUrl: process.env.SQS_QUEUE_URL,
}));
