import "dotenv/config";
import express from "express";
import cors from "cors";
import { whatsappWebhook } from "./helpers/webhook";
// import {ProfileEntry} from "amazir_data_model"

export const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/api", async (req, res) => {
  res.status(200).json({
    data: `api working pafectly`,
  });
});

app.all("/webhooks", whatsappWebhook);

const PORT = 5000;
app.listen(PORT, () => console.log("server running on port:", PORT));
