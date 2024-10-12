import { Injectable, Logger } from '@nestjs/common';
import { SecretsManager } from 'aws-sdk';

@Injectable()
export class AwsSecretsService {
  private readonly secretsManager: SecretsManager;
  private readonly logger = new Logger(AwsSecretsService.name);

  constructor() {
    this.secretsManager = new SecretsManager({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  async getSecret(secretName: string): Promise<Record<string, any>> {
    try {
      const data = await this.secretsManager
        .getSecretValue({ SecretId: secretName })
        .promise();
      if (data.SecretString) {
        return JSON.parse(data.SecretString); // Parse JSON formatted secret
      }
      this.logger.error(`Secret ${secretName} is not in a valid format.`);
      throw new Error('Invalid secret format');
    } catch (error) {
      this.logger.error(`Failed to load secret ${secretName}:`, error.message);
      throw error;
    }
  }
}
