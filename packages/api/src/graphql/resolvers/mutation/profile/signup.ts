import { errorHandler } from "../../../../helpers/error-handler";
import { Profile } from "../../../../helpers/manage-profile";
import { AuthUserInput } from "../../../../types/common/users";

interface UserInput {
  signUpInputData: AuthUserInput;
}

export const createUser = async (
  _: unknown,
  { signUpInputData }: UserInput
) => {
  try {
    const { createUserProfile } = new Profile();
    const payload = await createUserProfile(signUpInputData);
    return {
      code: 200,
      success: true,
      message: "user profile created successfully",
      data: payload,
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
