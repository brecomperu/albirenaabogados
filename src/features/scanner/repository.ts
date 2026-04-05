import { db, storage } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface ScannerData {
  email: string;
  profileType: 'trabajador' | 'empresa';
  documentUrl?: string;
  status: 'pending' | 'analyzing' | 'completed';
}

export const scannerRepository = {
  async submitAnalysis(data: Omit<ScannerData, 'status'>, file?: File) {
    let documentUrl = "";

    if (file) {
      const storageRef = ref(storage, `scans/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      documentUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, "scans"), {
      ...data,
      documentUrl,
      status: 'pending',
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  },
};
