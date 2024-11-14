const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Check if the script is running in production
if (process.env.NODE_ENV === "production") {
  console.error(
    "Error: Model generation is not allowed in the production environment.",
  );
  process.exit(1); // Exit the script with an error code
}
const entitiesDir = path.join(__dirname, "src", "database", "entities");
// Delete all existing files in the entities directory
fs.readdirSync(entitiesDir).forEach((file) => {
  fs.unlinkSync(path.join(entitiesDir, file));
});
console.log("Cleared existing entities files.");

// Run the typeorm-model-generator command
const command = `npx typeorm-model-generator -h ${process.env.DB_HOST} -d ${process.env.DB_DATABASE} -u ${process.env.DB_USERNAME} -x ${process.env.DB_PASSWORD} --ssl false -e postgres -s dbo -p ${process.env.DB_PORT} -o src/database`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing model generation: ${error.message}`);
    process.exit(1);
  }
  console.log(stdout);
  console.error(stderr);
});
