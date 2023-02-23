import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  getCurrentUser,
  useCollection,
  useCurrentUser,
  useDocument,
  useFirestore,
} from "vuefire";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  startAfter,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
  startAt,
  QueryConstraint,
  getDoc,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { throttleFilter, useThrottle, useThrottleFn } from "@vueuse/core";

type QueryOperators =
  | ">"
  | "<="
  | "=="
  | ">"
  | ">="
  | "!="
  | "array-contains"
  | "array-contains-any"
  | "in"
  | "not-in";

export interface TaskMetaDto {
  createdAt?: Date;
  openedAt?: Date;
  closedAt?: Date;
  archivedAt?: Date;
}

export interface TaskDto extends TaskMetaDto {
  id: string;
  title: string;
  note?: string;
  labels?: string[];
  workspace?: string;
  targetAt?: Date;
  createdAt?: Date;
  closedAt?: Date;
}

export interface CreateTaskDto {
  id?: string;
  title: string;
  workspace?: string;
}

export const useTasksStore = defineStore("tasks", () => {
  const firestore = useFirestore();
  const user = useCurrentUser();
  const taskDb = collection(firestore, `tasks`, "users", `${user?.value?.uid}`);

  const taskRef = ref<TaskDto[]>([]);

  // taskDb.withConverter({
  //   toFirestore(post: WithFieldValue<any>): DocumentData {
  //     return {};
  //   },
  //   fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
  //     const data = snapshot.data(options)!;
  //     return {};
  //   },
  // });

  async function updateCurrentUser(profile: {
    displayName: string;
    photoURL?: string;
  }) {
    return updateProfile(user.value!, profile);
  }

  function initId() {
    const targetDocRef = doc(taskDb);
    return targetDocRef.id;
  }

  const create = useThrottleFn(
    async (data: CreateTaskDto) => {
      console.log({ msg: "useTasksStore.create" });
      const targetDocRef = doc(taskDb, data.id);
      delete data.id;
      await setDoc(targetDocRef, data);
      const docSnap = await getDoc(targetDocRef);
      const docData = docSnap.data() as TaskDto;
      taskRef.value.push(docData);
      return docData;
    },
    300,
    true
  );

  async function find(
    filter: [keyof TaskDto, QueryOperators, any][],
    sort?: { field: string; desc: boolean },
    start?: unknown[],
    size: number = 1
  ) {
    let queryConstraints: QueryConstraint[] = [];
    if (filter)
      queryConstraints = queryConstraints.concat(
        filter.map((f) => where(f[0], f[1], f[2]))
      );
    if (sort)
      queryConstraints.push(orderBy(sort.field, sort.desc ? "desc" : "asc"));
    if (start) queryConstraints.push(startAt(start));
    if (size) queryConstraints.push(limit(size));

    const q = query(taskDb, ...queryConstraints);
    const qSnapshot = await getDocs(q);
    qSnapshot.forEach((doc) => {
      if (!doc.exists()) return;
      taskRef.value?.push({ ...(doc.data() as TaskDto), id: doc.id });
    });
    return taskRef;
  }

  return { create, find, tasks: taskRef, updateCurrentUser, initId };
});
