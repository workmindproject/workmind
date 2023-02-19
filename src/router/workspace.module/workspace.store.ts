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

export interface WorkspaceDto {
  name: string;
  description?: string;
  labels?: string[];
  key?: string;
  date?: Date;
}

export interface CreateWorkspaceDto {
  name: string;
  description?: string;
  labels?: string[];
  date?: Date;
}

export const useWorkspaceStore = defineStore("workspaces", () => {
  const firestore = useFirestore();
  const user = useCurrentUser();
  const workspacesRef = collection(
    firestore,
    `workspaces`,
    "users",
    `${user?.value?.uid}`
  );

  const workspaces = ref<WorkspaceDto[]>();

  // workspacesCollection.withConverter({
  //   toFirestore(post: WithFieldValue<any>): DocumentData {
  //     return {};
  //   },
  //   fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
  //     const data = snapshot.data(options)!;
  //     return {};
  //   },
  // });

  async function create(data: CreateWorkspaceDto) {
    const keyData = data.name;
    const dateData = data.date
      ? Timestamp.fromDate(data.date)
      : Timestamp.fromDate(new Date());
    const targetDocRef = doc(workspacesRef, keyData);
    await setDoc(targetDocRef, {
      ...data,
      key: keyData,
      date: dateData,
    });
    const docSnap = await getDoc(targetDocRef);
    return docSnap.data() as WorkspaceDto;
  }

  async function find(
    filter: [keyof CreateWorkspaceDto, QueryOperators, any][],
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

    const q = query(workspacesRef, ...queryConstraints);
    const qSnapshot = await getDocs(q);
    const results: WorkspaceDto[] = [];
    qSnapshot.forEach((doc) => results.push(doc.data() as WorkspaceDto));
    workspaces.value = results;
    return results;
  }

  return { create, find, workspaces };
});
