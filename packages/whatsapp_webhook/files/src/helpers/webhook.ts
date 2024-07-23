import { Response, Request } from "express";

export const whatsappWebhook = async (req: Request, res: Response) => {
  try {
    const mode = req.query["hub.mode"];
    const challenge = req.query["hub.challenge"];
    const token = req.query["hub.verify_token"];
    const VERIFY_TOKEN = "meatyhamhock";

    // Check if the mode and token are correct
    if (mode && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log(`Webhook verified: ${challenge}`);
      res.status(200).send(challenge);
    } else {
      // Respond with 403 Forbidden if tokens do not match
      res.status(403).send('Forbidden');
    }

  } catch (error: any) {
    console.error(error);
  }
};
