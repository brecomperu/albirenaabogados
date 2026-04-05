import { storage, db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export interface BookingData {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  profileType: 'trabajador' | 'empresa';
  details?: string;
  attachmentUrls?: string[];
  duration?: number;
}

export const bookingRepository = {
  async createAppointment(data: Omit<BookingData, 'attachmentUrls'>, files?: File[]) {
    console.log('[DEBUG] Starting createAppointment with data:', data);
    
    // 1. Upload files to Storage
    const attachmentUrls: string[] = [];
    if (files && files.length > 0) {
      console.log(`[DEBUG] Found ${files.length} files to upload.`);
      for (const file of files) {
        try {
          const fileRef = ref(storage, `appointments/${Date.now()}_${file.name}`);
          const snapshot = await uploadBytes(fileRef, file);
          console.log(`[DEBUG] File uploaded: ${file.name} -> ${snapshot.ref.fullPath}`);
          attachmentUrls.push(snapshot.ref.fullPath);
        } catch (storageErr) {
          console.error('[DEBUG] Error uploading file:', file.name, storageErr);
        }
      }
    }

    // 2. Save to Firestore
    let docId = '';
    try {
      console.log('[DEBUG] Attempting to save to Firestore collection "appointments"...');
      const docRef = await addDoc(collection(db, "appointments"), {
        ...data,
        attachmentUrls,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      docId = docRef.id;
      console.log('[DEBUG] Firestore save SUCCESS! Document ID:', docId);
    } catch (firestoreErr: any) {
      console.error('[DEBUG] FATAL Error saving to Firestore:', firestoreErr);
      // Re-throw if it's a permission issue so the UI knows it failed
      throw firestoreErr;
    }

    // 3. Trigger Google Meet (via API route)
    try {
      console.log('[DEBUG] Triggering Google Meet creation for doc:', docId);
      const startTime = new Date(`${data.date}T${data.time}:00`);
      const meetingDuration = data.duration || 60;
      const endTime = new Date(startTime.getTime() + meetingDuration * 60 * 1000);

      const response = await fetch('/api/booking/create-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: `Consulta Legal: ${data.name} (${data.profileType})`,
          description: data.details || 'Consulta estratégica programada.',
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          attendees: [data.email, 'contacto@albirenaabogados.com', 'julioalbirena@gmail.com'],
        }),
      });

      console.log('[DEBUG] Meet API response status:', response.status);

      if (response.ok) {
        const { meetLink } = await response.json();
        console.log('[DEBUG] Meet link generated:', meetLink);
        await updateDoc(doc(db, "appointments", docId), { meetLink });
        console.log('[DEBUG] Firestore updated with Meet link.');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('[DEBUG] Meet API failed:', errorData);
      }
    } catch (meetErr) {
      console.error('[DEBUG] Error during Meet link generation:', meetErr);
    }

    return docId;
  },
};

