import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import {
  getAuth as clientAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp as initializeAppClient } from "firebase/app";
import {
  firebaseConfigClient,
  firebaseConfigAdmin,
} from "../../config/firebase";

const adminApp = initializeApp({
  credential: cert({...firebaseConfigAdmin} as ServiceAccount),
});

const clientApp = initializeAppClient(firebaseConfigClient);

const actionCodeSettings = {
  url: "https://google.com",
};

export class FirebaseAuth {
  createUser = async (email: string, password: string) => {
    return await getAuth(adminApp).createUser({
      email,
      password,
    });
  };

  loginUser = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(
      clientAuth(clientApp),
      email,
      password
    );
  };

  verifyIdToken = async (idToken: string) => {
    return await getAuth(adminApp).verifyIdToken(idToken);
  };

  verifyRefreshToken = async (uid: string) => {
    const customToken = await getAuth(adminApp).createCustomToken(uid);
    return customToken;
  };

  getVerifyEmailLink = async (email: string) => {
    return await getAuth(adminApp).generateEmailVerificationLink(
      email,
      actionCodeSettings
    );
  };

  getPasswordResetLink = async (email: string) => {
    return await getAuth(adminApp).generatePasswordResetLink(
      email,
      actionCodeSettings
    );
  };
}
