import { db } from "@/lib/firebase/config";
import { collection, query, orderBy, onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";

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

export interface ContactSettings {
  address: string;
  phone: string;
  whatsapp: string;
  shortWord: string;
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
  },

  async getContactSettings(): Promise<ContactSettings | null> {
    const docRef = doc(db, "settings", "contact_info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ContactSettings;
    }
    return null;
  },

  async updateContactSettings(settings: ContactSettings): Promise<void> {
    const docRef = doc(db, "settings", "contact_info");
    await setDoc(docRef, settings, { merge: true });
  },

  subscribeToContactSettings(callback: (settings: ContactSettings | null) => void) {
    const docRef = doc(db, "settings", "contact_info");
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as ContactSettings);
      } else {
        callback(null);
      }
    });
  }
};
