import { errorHandler } from "../../../../helpers/error-handler";
import { Profile } from "../../../../helpers/manage-profile";
import { verifyUserIdToken } from "../../../../middleware/verifyIdToken";
import {
  AuthUserData,
  Profile as ProfileData,
} from "../../../../types/common/users";

interface UserInput {
  profileInputData: ProfileData;
}
export const updateProfile = async (
  _: unknown,
  { profileInputData }: UserInput,
  { ContextFunctionArgument }: AuthUserData
) => {
  try {
    const { updateUserProfile } = new Profile();
    const authUser = await verifyUserIdToken(ContextFunctionArgument.req);
    const data = await updateUserProfile(authUser.email, profileInputData);

    return {
      code: 200,
      success: true,
      message: "profile updated successfully",
      data: data,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
