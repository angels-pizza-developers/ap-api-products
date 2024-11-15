import secretManagerConfig from "./secret-manager.config";
export function createConfig(): any {
  const env = process.env.NODE_ENV || "development";
  if (env && env !== "development") {
    // return {
    //   load: [secretManagerConfig],
    // };
    return {
      envFilePath: [".env"],
    }
  } else {
    return {
      envFilePath: [".env", `.env.${process.env.NODE_ENV || "development"}`],
    };
  }
}
