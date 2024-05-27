import "dotenv/config"
export const getEnv = (env:string) => process.env[env]!