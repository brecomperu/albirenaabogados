import { db } from "@/lib/firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export interface Lead {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  date?: string;
  time?: string;
  status: string;
  profileType: string;
  createdAt: any;
}

export const adminRepository = {
  subscribeToAppointments(callback: (leads: Lead[]) => void) {
    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const leads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      callback(leads);
    });
  }
};
