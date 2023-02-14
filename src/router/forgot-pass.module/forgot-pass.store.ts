import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import { confirmPasswordReset, sendPasswordResetEmail, verifyPasswordResetCode } from "firebase/auth";

export const useForgotPassStore = defineStore("forgot-password", () => {
  const auth = useFirebaseAuth();

  async function forgotPassword(email: string) {
    const actionCodeSettings = {
      url: `https://productive.workmind.app/confirm-password`,
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
    return await sendPasswordResetEmail(auth!, email, actionCodeSettings);
  }

  async function confirmPassword(actionCode: string, password: string) {
    await verifyPasswordResetCode(auth!, actionCode);
    return confirmPasswordReset(auth!, actionCode, password);
  }


  return { forgotPassword, confirmPassword };
});
