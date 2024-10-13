import { Injectable, Logger } from '@nestjs/common';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
@Injectable()
export class AwsSecretsService {
  private readonly logger = new Logger(AwsSecretsService.name);

  constructor() {}

  async getSecret(secretName: string): Promise<any> {
    try {
      const client = new SecretsManagerClient({
        region: 'ap-southeast-1',
      });
      const data = await client.send(
        new GetSecretValueCommand({
          SecretId: secretName.toString().trim(),
        }),
      );
      if (data.SecretString) {
        console.log(data.SecretString);
        return data.SecretString; // Parse JSON formatted secret
      } else {
        this.logger.error(`Secret ${secretName} is not in a valid format.`);
        throw new Error('Invalid secret format');
      }
    } catch (error) {
      this.logger.error(`Failed to load secret ${secretName}:`, error.message);
      throw error;
    }
  }
}
