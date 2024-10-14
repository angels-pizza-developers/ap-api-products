
import { fetchSecrets } from "./fetch-screts";

export default async () => {
  const secretName = process.env.AWS_SECRETS_NAME;

  console.log("secretName", process.env.AWS_SECRETS_NAME)

  const secrets = await fetchSecrets(secretName.toString().trim());
  return secrets;
};
