import { SessionCacheEntry } from "../services/mongodb/schema";
import { SessionCache as SessionCacheType } from "../types/common/users";

export class SessionCache {
  protected userEmail: string;
  constructor(userEmail: string) {
    this.userEmail = userEmail;
  }

  setOrganizationIdInCache = async (
    organizationProfileId: string,
    profileId: string
  ): Promise<SessionCache> => {
    return await SessionCacheEntry.findOneAndUpdate(
      { userEmail: this.userEmail },
      {
        $set: {
          userEmail: this.userEmail,
          profileId,
          organizationProfileId,
        },
      },
      { new: true, upsert: true }
    );
  };

  getSessionCache = async () => {
    return (await SessionCacheEntry.findOne({
      userEmail: this.userEmail,
    }).lean()) as SessionCacheType;
  };
}
