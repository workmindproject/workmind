import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useCollection, useFirestore } from "vuefire";
import { collection } from "firebase/firestore";

export const useTasksStore = defineStore("tasks", () => {
  const firestore = useFirestore()
  const todos = useCollection(collection(firestore, 'todos'))

  return {  };
});
