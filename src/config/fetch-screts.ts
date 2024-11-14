import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { HttpException, HttpStatus } from "@nestjs/common";

export const fetchSecrets = async (secretName: string) => {
  const client = new SecretsManagerClient({
    region: "ap-southeast-1",
  });
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName.toString().trim(),
      }),
    );
    return JSON.parse(response.SecretString);
  } catch (error) {
    console.log("AWS SECRET MANAGER ERROR: ", JSON.stringify(error));
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Internal server error",
        message: "Internal server error",
        errorCode: "INTERNAL_SERVER_ERROR",
      },
      HttpStatus.BAD_REQUEST,
    );
  }
};
