import { errorHandler } from "../../../../helpers/error-handler";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import { ProfileEntry } from "../../../../services/mongodb/schema";
import { AuthUserData } from "../../../../types/common/users";
import { createOrganization } from "./create-organization";
import { updateOrganization } from "./update-organization";

export const organization = async (
  _: unknown,
  __: unknown,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const authUser = await verifyUserIdToken(ContextFunctionArgument.req);
    const profile = await ProfileEntry.findOne({ email: authUser.email });
    if (!profile) throw new Error("user does not exist");
    return {
      createOrganizationProfile: createOrganization(authUser, profile),
      updateOrganizationProfile: updateOrganization(authUser, profile),
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
