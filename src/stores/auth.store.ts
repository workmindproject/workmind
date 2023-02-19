import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getCurrentUser, useCurrentUser, useFirebaseAuth } from "vuefire";

export const useAuthStore = defineStore("auth", () => {
  const auth = useFirebaseAuth();
  const currentUser = async () => {
    const user = await getCurrentUser();
    console.log("user:", user);
    return user;
  };
  return { currentUser };
});
