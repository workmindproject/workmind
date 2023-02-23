import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useCurrentUser, useFirestore } from "vuefire";
import { collection, doc, getDoc } from "firebase/firestore";

export interface CurrentWorkspaceDto {
  name: string;
  description?: string;
  labels?: string[];
  key?: string;
  date?: Date;
}

export const usePageStore = defineStore("page", () => {
  const firestore = useFirestore();
  const user = useCurrentUser();
  const workspacesRef = collection(
    firestore,
    `workspaces`,
    "users",
    `${user?.value?.uid}`
  );
  let workspace = ref<Record<string, any>>({});

  async function getCurrentWorkspace(key: string) {
    const targetDocRef = doc(workspacesRef, key);
    const docSnap = await getDoc(targetDocRef);
    const docData = docSnap.data() as CurrentWorkspaceDto;
    workspace.value = docData;
    return docData;
  }

  return { workspace, getCurrentWorkspace };
});
