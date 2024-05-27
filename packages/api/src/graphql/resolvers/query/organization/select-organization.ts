import { errorHandler } from "../../../../helpers/error-handler";
import { DecodedIdToken, Profile } from "../../../../types/common/users";
import { Organization } from "../../../../helpers/manage-organization";

interface UserInput {
  organizationId: string;
}
export const selectOrganization = (
  { email }: DecodedIdToken,
  profile: Profile & { _id: string }
) => {
  return async ({ organizationId }: UserInput) => {
    try {
      const { selectOrganization } = new Organization(email, profile._id);
      const currentOrganization = await selectOrganization(organizationId);
      return {
        code: 200,
        success: true,
        message: "organization selected successfully",
        data: currentOrganization,
      };
    } catch (error: any) {
      errorHandler(error);
    }
  };
};
