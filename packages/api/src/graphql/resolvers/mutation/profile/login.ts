import { errorHandler } from "../../../../helpers/error-handler";
import { FirebaseAuth } from "../../../../services/firebase/auth";
import { AuthUserInput } from "../../../../types/common/users";

interface UserInput {
  loginInputData: AuthUserInput;
}

export const emailAndPasswordLogin = async (
  _: unknown,
  { loginInputData }: UserInput
) => {
  const { email, password } = loginInputData;
  try {
    const { loginUser } = new FirebaseAuth();
    const loginDetails = await loginUser(email, password);
    const tokenData = await loginDetails.user.getIdTokenResult();
    return {
      code: 200,
      success: true,
      message: "logged in successfully",
      data: {
        email: email,
        IdToken: tokenData.token,
        exp: parseInt(tokenData.claims.exp!),
      },
    };
  } catch (error: any) {
    errorHandler(error);
  }
};
