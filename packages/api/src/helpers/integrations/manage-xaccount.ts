import { XAccountEntry } from "../../services/mongodb/schema";
import { XAccount } from "../../types/integrations";
import { SessionCache } from "../manage-session-cache";


export class XAccountManager {
  protected email: string;
  constructor(email: string) {
    this.email = email;
  }

  addXAccount = async (data: XAccount) => {
    const { getSessionCache } = new SessionCache(this.email);
    const { organizationProfileId } = await getSessionCache();
    const account = await XAccountEntry.findOneAndUpdate(
      { organization: organizationProfileId },
      {
        $set: {
          ...data,
          organization: organizationProfileId,
        },
      },
      { new: true, upsert: true }
    );
    return account as XAccount & { _id: string };
  };
}
