import { set, connect, disconnect } from "amazir_data_model";
import { getEnv } from "../../src/utils";
set("strictQuery", false);

export function connectToMongoDB() {
  const mongoUri = getEnv("MONGO_URI")!;
  connect(mongoUri)
    .then(() => console.info("connected to mongoDB"))
    .catch((err) => console.error("mongo error", err.message));
}

export function disconnectFromMongoDB() {
  disconnect()
    .then(() => console.info("Disconnected from MongoDB"))
    .catch((err) =>
      console.error("Error disconnecting from MongoDB", err.message)
    );
}
