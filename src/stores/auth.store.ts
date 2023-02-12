import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useCurrentUser, useFirebaseAuth } from "vuefire";

export const useAuthStore = defineStore("auth", () => {
  // const auth = useFirebaseAuth();
  const currentUser = () => {
    const user = useCurrentUser();
    console.log("user:", user.value);
    return user.value;
  };

  return { currentUser };
});
