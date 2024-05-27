import { errorHandler } from "../helpers/error-handler";
import { FirebaseAuth } from "../services/firebase/auth";
import { type IncomingMessage } from "http";
export const verifyUserIdToken = async (req: IncomingMessage) => {
  try {
    const { verifyIdToken } = new FirebaseAuth();
    const token = req.headers.authorization || "";
    if (!token)
      throw {
        code: "unathorized",
        message: "please login to continue",
      };
    const user = await verifyIdToken(token);
    return user;
  } catch (error: any) {
    errorHandler(error);
  }
};
