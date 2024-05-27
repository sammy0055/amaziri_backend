import { connect, set } from "amazir_data_model";
import "dotenv/config";
import { getEnv } from "../../helpers/getEnv";
set("strictQuery", false);

export function connectToMongoDB() {
  const mongoUri = getEnv("MONGO_URI")!;
  connect(mongoUri)
    .then(() => console.info("connected to mongoDB"))
    .catch((err) => console.error("mongo error", err.message));
}
