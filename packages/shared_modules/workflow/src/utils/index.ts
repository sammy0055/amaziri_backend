import "dotenv/config"
export const getEnv = (name:string) => process.env[name]