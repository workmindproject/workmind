import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// ... other firebase imports

const firebaseConfig = {
  apiKey: "AIzaSyAKmFXy3M_y37ApMDiiOEBE9PQO_wS341E",
  authDomain: "workmind.firebaseapp.com",
  projectId: "workmind",
  storageBucket: "workmind.appspot.com",
  messagingSenderId: "677163711888",
  appId: "1:677163711888:web:7104a3727d35838050c715",
};
export const firebaseApp = initializeApp(firebaseConfig);

// used for the firestore refs
// const db = getFirestore(firebaseApp)

// here we can export reusable database references
// export const todosRef = collection(db, 'todos')
