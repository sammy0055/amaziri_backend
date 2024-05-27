import { DecodedIdToken } from "firebase-admin/auth";
import { errorHandler } from "../../../../helpers/error-handler";
import { Organization } from "../../../../helpers/manage-organization";

import { OrganizationProfile, Profile } from "../../../../types/common/users";

interface UserInput {
  organizationProfileInputData: OrganizationProfile;
}
export const updateOrganization = (
  { email }: DecodedIdToken,
  profile: Profile & { _id: string }
) => {
  return async ({ organizationProfileInputData }: UserInput) => {
    try {
      const { updateOrganization } = new Organization(email, profile._id);
      const data = await updateOrganization(organizationProfileInputData);
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
