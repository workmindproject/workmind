import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

// export interface SignupDto {
//   email: string;
//   password: string;
//   type: string;
// }

export const useSignupStore = defineStore("signup", () => {
  const auth = useFirebaseAuth();

  async function createUser(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      auth!,
      email,
      password
    );

    const actionCodeSettings = {
      url: `https://productive.workmind.app/signin`,
      // iOS: {
      //   bundleId: "app.workmind.ios",
      // },
      // android: {
      //   packageName: "app.workmind.android",
      //   installApp: true,
      //   minimumVersion: "12",
      // },
      handleCodeInApp: true,
      // dynamicLinkDomain: "productive.workmind.app",
    };
    return await sendEmailVerification(auth?.currentUser!, actionCodeSettings);
  }

  return { createUser };
});
