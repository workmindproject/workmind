import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import {
  applyActionCode,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";

export const useVerifyStore = defineStore("verify", () => {
  const auth = useFirebaseAuth();

  async function verifyLink(actionCode: string) {
    return await applyActionCode(auth!, actionCode);
  }

  async function resetPassword(actionCode: string, password: string) {
    await verifyPasswordResetCode(auth!, actionCode);
    return confirmPasswordReset(auth!, actionCode, password);
  }

  return { verifyLink, resetPassword };
});
