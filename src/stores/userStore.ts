import { auth, db } from "@/utils/firebaseConfig";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";

interface User {
  uid: string;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  loadingUser: boolean;
  setUser: (user: User | null) => void;
  syncUserWithFirestore: (firebaseUser: FirebaseUser) => Promise<User>;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  loadingUser: true,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  syncUserWithFirestore: async (firebaseUser) => {
    const userRef = doc(db, "users", firebaseUser.uid);
    const snap = await getDoc(userRef);

    let userData: User;

    if (!snap.exists()) {
      userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName ?? "",
        email: firebaseUser.email ?? "",
      };
      await setDoc(userRef, userData);
    } else {
      userData = snap.data() as User;
    }

    set({ user: userData });
    return userData;
  },
}));

// 🔥 Listener corregido
onAuthStateChanged(auth, async (firebaseUser) => {
  const store = useUserStore.getState();

  if (firebaseUser) {
    await store.syncUserWithFirestore(firebaseUser);
  } else {
    store.clearUser();
  }

  // ✔ Ahora sí se actualiza Zustand
  useUserStore.setState({ loadingUser: false });
});

export default useUserStore;
