import { db } from "@/utils/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { create } from "zustand";

interface Complaint {
  id?: string;
  userId: string;
  title: string;
  description: string;
  categoria: string;
  location: { lat: number; lng: number };
  images: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface ComplaintsStore {
  all: Complaint[];
  mine: Complaint[];
  loading: boolean;

  fetchAll: () => Promise<void>;
  fetchMine: (userId: string) => Promise<void>;
  createComplaint: (
    data: Omit<Complaint, "id" | "createdAt" | "updatedAt">
  ) => Promise<string>;
}

export const useComplaintsStore = create<ComplaintsStore>((set, get) => ({
  all: [],
  mine: [],
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    const snap = await getDocs(collection(db, "complaints"));

    const complaints = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Complaint[];

    set({ all: complaints, loading: false });
  },

  fetchMine: async (userId: string) => {
    const q = query(
      collection(db, "complaints"),
      where("userId", "==", userId)
    );

    const snap = await getDocs(q);

    const complaints = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Complaint[];

    set({ mine: complaints });
  },

  createComplaint: async (data) => {
    const now = Timestamp.now();

    const ref = await addDoc(collection(db, "complaints"), {
      ...data,
      createdAt: now,
      updatedAt: now,
    });

    const newComplaint: Complaint = {
      id: ref.id,
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    set({
      all: [newComplaint, ...get().all],
      mine: [newComplaint, ...get().mine],
    });

    return ref.id;
  },
}));
