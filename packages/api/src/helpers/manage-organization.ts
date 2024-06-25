import {
  OrganizationProfileEntry,
  ProfileEntry,
} from "../services/mongodb/schema";
import { OrganizationProfile } from "../types/common/users";
import { SessionCache } from "./manage-session-cache";

export class Organization {
  protected userEmail: string;
  protected profileId: string;
  constructor(userEmail: string, profileId: string) {
    this.userEmail = userEmail;
    this.profileId = profileId;
  }
  createOrganization = async (organizationData: OrganizationProfile) => {
    const organization = await OrganizationProfileEntry.create({
      ...organizationData,
      creator: this.profileId,
    });

    await ProfileEntry.findByIdAndUpdate(this.profileId, {
      $push: { organizations: organization._id },
    });

    const { setOrganizationIdInCache } = new SessionCache(this.userEmail);
    await setOrganizationIdInCache(organization._id, this.profileId);
    return organization;
  };

  updateOrganization = async (organizationData: OrganizationProfile) => {
    const { getSessionCache } = new SessionCache(this.userEmail);
    const sessionData = await getSessionCache();
    const organization = await OrganizationProfileEntry.findByIdAndUpdate(
      sessionData.organizationProfileId,
      {
        $set: { ...organizationData },
      },
      { new: true }
    );
    if (!organization) throw new Error("organization not found");
    return organization;
  };

  selectOrganization = async (organizationId: string) => {
    if (!organizationId) throw new Error("organization id was not provided");
    const organization = await OrganizationProfileEntry.findById(
      organizationId
    );

    const { setOrganizationIdInCache } = new SessionCache(this.userEmail);
    await setOrganizationIdInCache(organizationId, this.profileId);
    return organization;
  };
}
