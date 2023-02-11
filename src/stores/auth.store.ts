import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useCurrentUser, useFirebaseAuth } from "vuefire";

export const useAuthStore = defineStore("auth", () => {
  // const auth = useFirebaseAuth();
  const user = computed(() => {
    return useCurrentUser();
  });

  return { user };
});
