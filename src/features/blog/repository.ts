import { db, storage } from "@/lib/firebase/config";
import { 
  collection, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  Timestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  media: { type: 'image' | 'video'; url: string }[];
  status: 'active' | 'draft';
  author: string;
  category: string;
  publishedAt: any;
  createdAt: any;
}

const sanitizeFileName = (name: string) => {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9.]/gi, '_').toLowerCase();
};

export const blogRepository = {
  /**
   * Subscribe to real-time blog posts
   */
  subscribeToPosts(callback: (posts: BlogPost[]) => void, status?: 'active' | 'draft') {
    let q = query(collection(db, "blog_posts"), orderBy("publishedAt", "desc"));
    
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      
      if (status) {
        callback(posts.filter(p => p.status === status));
      } else {
        callback(posts);
      }
    });
  },

  /**
   * Generate a unique ID for a new post
   */
  generateId() {
    return doc(collection(db, "blog_posts")).id;
  },

  /**
   * Create a new post
   */
  async createPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'publishedAt'>, coverFile?: File, customId?: string) {
    // Use customId if provided (pre-generated), otherwise generate one
    const id = customId || doc(collection(db, "blog_posts")).id;
    const postRef = doc(db, "blog_posts", id);

    let coverImage = "";
    if (coverFile) {
      const sanitizedName = sanitizeFileName(coverFile.name);
      const storageRef = ref(storage, `blog/${id}/cover_${Date.now()}_${sanitizedName}`);
      const snapshot = await uploadBytes(storageRef, coverFile);
      coverImage = await getDownloadURL(snapshot.ref);
    }

    await setDoc(postRef, {
      ...data,
      coverImage,
      createdAt: serverTimestamp(),
      publishedAt: data.status === 'active' ? serverTimestamp() : null,
    });

    return id;
  },

  /**
   * Update an existing post
   */
  async updatePost(id: string, data: Partial<BlogPost>, newCoverFile?: File) {
    let updateData = { ...data };
    
    if (newCoverFile) {
      const sanitizedName = sanitizeFileName(newCoverFile.name);
      const storageRef = ref(storage, `blog/${id}/cover_${Date.now()}_${sanitizedName}`);
      const snapshot = await uploadBytes(storageRef, newCoverFile);
      updateData.coverImage = await getDownloadURL(snapshot.ref);
    }

    if (data.status === 'active' && !data.publishedAt) {
      updateData.publishedAt = serverTimestamp();
    }

    const docRef = doc(db, "blog_posts", id);
    await updateDoc(docRef, updateData);
  },

  /**
   * Delete a post and its storage assets
   */
  async deletePost(id: string) {
    // 1. Delete from Firestore
    await deleteDoc(doc(db, "blog_posts", id));

    // 2. Cascade delete from Storage (Folder cleaning)
    try {
      const { listAll, deleteObject } = await import('firebase/storage');
      const folderRef = ref(storage, `blog/${id}`);
      const listResult = await listAll(folderRef);
      
      const deletePromises = listResult.items.map(fileRef => deleteObject(fileRef));
      await Promise.all(deletePromises);
      console.log(`Cascade deleted storage folder: blog/${id}`);
    } catch (e) {
      console.error("Error cleaning up blog storage:", e);
    }
  }
};
