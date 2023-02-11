import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useSigninStore = defineStore("signin", () => {
  const auth = useFirebaseAuth();

  async function signinPassword(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      auth!,
      email,
      password
    );

    return userCredential;
  }

  return { signinPassword };
});
