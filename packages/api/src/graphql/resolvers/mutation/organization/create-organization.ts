import { errorHandler } from "../../../../helpers/error-handler";
import { Organization } from "../../../../helpers/manage-organization";

import { DecodedIdToken, OrganizationProfile, Profile } from "../../../../types/common/users";

interface UserInput {
  organizationProfileInputData: OrganizationProfile;
}
export const createOrganization = (
  { email }: DecodedIdToken,
  profile: Profile & { _id: string }
) => {
  return async ({ organizationProfileInputData }: UserInput) => {
    try {
      const { createOrganization } = new Organization(email, profile._id);
      const data = await createOrganization(organizationProfileInputData);
      return {
        code: 200,
        success: true,
        message: "organization created successfully",
        data,
      };
    } catch (error: any) {
      errorHandler(error);
    }
  };
};
