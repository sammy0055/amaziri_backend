import { FirebaseAuth } from "../services/firebase/auth";
import { ProfileEntry } from "../services/mongodb/schema";
import { AuthUserInput, Profile as ProfileType } from "../types/common/users";

export class Profile {
  createUserProfile = async ({ email, password }: AuthUserInput) => {
    const { createUser, loginUser } = new FirebaseAuth();
    await createUser(email, password);
    await ProfileEntry.create({ email });
    const loginDetails = await loginUser(email, password);
    const tokenData = await loginDetails.user.getIdTokenResult();
    return {
      email: email,
      IdToken: tokenData.token,
      exp: parseInt(tokenData.claims.exp!),
    };
  };

  updateUserProfile = async (email:string, profile: ProfileType) => {
    return await ProfileEntry.findOneAndUpdate(
      { email: email },
      {
        $set: { ...profile },
      },
      { new: true }
    );
  };
}
