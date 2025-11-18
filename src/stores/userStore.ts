import { auth, db } from "@/utils/firebaseConfig";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  loadingUser: boolean;
  setUser: (user: User | null) => void;
  syncUserWithFirestore: (firebaseUser: FirebaseUser) => Promise<void>;
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
      // Crear usuario en Firestore la primera vez
      userData = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName ?? "",
        email: firebaseUser.email ?? "",
      };

      await setDoc(userRef, userData);
    } else {
      userData = snap.data() as User;
    }

    set({ user: userData });
  },
}));

//  Sincronizar auth con Zustand automáticamente
onAuthStateChanged(auth, async (firebaseUser) => {
  const store = useUserStore.getState();

  if (firebaseUser) {
    await store.syncUserWithFirestore(firebaseUser);
  } else {
    store.clearUser();
  }

  useUserStore.setState({ loadingUser: false });
});

export default useUserStore;
