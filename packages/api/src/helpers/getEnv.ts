import "dotenv/config"
export const getEnv = (variableName: string): string =>
  process.env[variableName];
