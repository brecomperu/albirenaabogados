"use client";

import React, { useEffect, useState } from 'react';
import { blogRepository, BlogPost } from '@/features/blog/repository';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import RichTextEditor from '@/components/molecules/RichTextEditor';
import EliteStudioToolbar from '@/components/molecules/EliteStudioToolbar';
import styles from './Studio.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [tempId, setTempId] = useState<string>('');
  const [activeEditor, setActiveEditor] = useState<any>(null);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    status: 'draft',
    category: 'Derecho Laboral',
    author: 'Albirena Abogados',
    media: []
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    return blogRepository.subscribeToPosts(setPosts);
  }, []);

  useEffect(() => {
    if (isEditing && !currentPost.id && !tempId) {
      const newId = blogRepository.generateId();
      setTempId(newId);
    }
  }, [isEditing, currentPost.id]);

  const handleSave = async () => {
    if (!currentPost.title || !currentPost.content) {
      alert("Título y contenido son obligatorios");
      return;
    }

    setIsSubmitting(true);
    try {
      const finalId = currentPost.id || tempId;
      if (currentPost.id) {
        await blogRepository.updatePost(finalId, currentPost, coverFile || undefined);
      } else {
        await blogRepository.createPost(currentPost as any, coverFile || undefined, finalId);
      }

      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#000000', '#FFFFFF', '#AA8A2E']
      });

      setIsEditing(false);
      resetForm();
    } catch (k) {
      console.error("Error saving post:", k);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentPost({
      title: '',
      excerpt: '',
      content: '',
      status: 'draft',
      category: 'Derecho Laboral',
      author: 'Albirena Abogados',
      media: []
    });
    setCoverFile(null);
    setTempId('');
    setActiveEditor(null);
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de eliminar este artículo?')) {
      await blogRepository.deletePost(id);
    }
  };

  const currentStorageId = currentPost.id || tempId;

  const handleGlobalUpload = async (file: File) => {
    try {
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const { storage } = await import('@/lib/firebase/config');
      const pathToken = file.type.startsWith('image/') ? 'images' : 'videos';
      const storageRef = ref(storage, `blog/${currentStorageId}/${pathToken}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (e) {
      console.error("Global upload error:", e);
      return null;
    }
  };

  const handleAIReview = async () => {
    if (!activeEditor) return;

    setIsReviewing(true);
    // Simulate premium processing time for sensory experience
    await new Promise(resolve => setTimeout(resolve, 1500));

    const content = activeEditor.getHTML();

    // Advanced Editorial Sanitization Logic
    let sanitized = content
      .replace(/  +/g, ' ')                  // Double spaces
      .replace(/ ,/g, ',')                   // Space before comma
      .replace(/ \./g, '.')                  // Space before period
      .replace(/,(?=[^\s])/g, ', ')          // Space after comma
      .replace(/\.(?=[^\s])/g, '. ')         // Space after period
      .replace(/\bsunafil\b/gi, 'SUNAFIL')   // Legal terms
      .replace(/\blcdo\b/gi, 'Lcdo.')
      .replace(/\bdr\b/gi, 'Dr.')
      .replace(/\babogado\b/gi, 'Abogado');

    activeEditor.commands.setContent(sanitized);
    setIsReviewing(false);

    const confetti = (await import('canvas-confetti')).default;
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.3 },
      colors: ['#D4AF37', '#FFFFFF', '#000000']
    });
  };

  // --- STUDIO VIEW (EDITING) ---
  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.studioLayout}
      >

        {/* Top High-End Control Bar & GLOBAL TOOLBAR */}
        <div className="fixed top-[70px] left-[80px] right-[340px] z-[150] pointer-events-none">
          <AnimatePresence>
            {activeEditor && (
              <motion.div
                initial={{ y: -70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -70, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="pointer-events-auto shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] relative"
              >
                <EliteStudioToolbar
                  editor={activeEditor}
                  onUploadMedia={handleGlobalUpload}
                  isReviewing={isReviewing}
                  onAIAction={handleAIReview}
                  activeSection={
                    activeEditor.isActive('heading', { level: 1 }) ? 'Portal de Título' :
                      activeEditor.options.editorProps.attributes?.class?.includes('excerpt') ? 'Resumen Ejecutivo' :
                        'Albirena'
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.header
          initial={{ y: -70 }}
          animate={{ y: 0 }}
          className={styles.studioTopbar}
        >
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-black font-black text-xs">A</div>
              <Typography variant="p" className="text-[10px] font-black tracking-[.4em] text-white uppercase hidden lg:block">STUDIO</Typography>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest hidden md:block">
              {activeEditor ? 'MODO EDICIÓN ACTIVADO' : (isSubmitting ? 'Guardando...' : 'Cambios Sincronizados')}
            </span>
            <div className="flex items-center gap-3">
              <button className={`${styles.studioBtn} ${styles.studioBtnGlass} hover:bg-white/10 transition-colors`} onClick={() => { setIsEditing(false); resetForm(); }}>Salir</button>
              <button className={`${styles.studioBtn} ${styles.studioBtnPrimary} shadow-2xl shadow-gold/20 hover:scale-105 active:scale-95 transition-all`} onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? '...' : 'Publicar'}
              </button>
            </div>
          </div>
        </motion.header>

        {/* Central Sensory Area */}
        <motion.main
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.studioCanvasArea}
        >
          <div className={styles.paperCanvas}>
            <div className="mb-24 pt-10">
              <span className="text-[11px] font-black text-gold border-b-2 border-gold/10 pb-3 mb-12 inline-block uppercase tracking-[.7em]">
                {currentPost.category}
              </span>

              <div className="mb-12">
                <RichTextEditor
                  content={currentPost.title || ''}
                  onChange={(html: string) => setCurrentPost({ ...currentPost, title: html })}
                  onFocus={setActiveEditor}
                  showToolbar={false}
                  placeholder="Título Magistral..."
                  storageId={currentStorageId}
                  variant="title"
                />
              </div>

              <div className="border-l-[3px] border-gray-100 pl-12 mb-20">
                <RichTextEditor
                  content={currentPost.excerpt || ''}
                  onChange={(html: string) => setCurrentPost({ ...currentPost, excerpt: html })}
                  onFocus={setActiveEditor}
                  showToolbar={false}
                  placeholder="Escribe la esencia de este artículo aquí..."
                  storageId={currentStorageId}
                  variant="excerpt"
                />
              </div>
            </div>

            <div className="relative min-h-[900px] border-t border-gray-50 pt-10">
              <RichTextEditor
                content={currentPost.content || ''}
                onChange={(html: string) => setCurrentPost({ ...currentPost, content: html })}
                onFocus={setActiveEditor}
                showToolbar={false}
                placeholder="Inicie su redacción jurídica magistral..."
                storageId={currentStorageId}
                variant="content"
              />
            </div>
          </div>
        </motion.main>

        {/* Studio Settings Panel */}
        <motion.aside
          initial={{ x: 340 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3, type: 'spring', damping: 25 }}
          className={styles.studioSettings}
        >
          <div className="space-y-12">
            <div className={styles.studioControlGroup}>
              <label className={styles.studioControlLabel}>Identidad Visual</label>
              <div className="relative group rounded-[1rem] overflow-hidden aspect-[4/3] bg-white/5 border border-white/5 mb-6 cursor-pointer shadow-2xl ring-1 ring-white/10">
                {currentPost.coverImage || coverFile ? (
                  <img
                    src={coverFile ? URL.createObjectURL(coverFile) : currentPost.coverImage}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                    <span className="text-[9px] font-black tracking-widest text-gray-500">SUBIR PORTADA</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-white tracking-widest">CAMBIAR IMAGEN</span>
                </div>
                <input
                  type="file"
                  onChange={e => setCoverFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className={styles.studioControlGroup}>
              <label className={styles.studioControlLabel}>Sección Editorial</label>
              <select
                className={styles.studioInput}
                value={currentPost.category}
                onChange={e => setCurrentPost({ ...currentPost, category: e.target.value })}
              >
                <option value="Derecho Laboral">Derecho Laboral</option>
                <option value="SUNAFIL">SUNAFIL</option>
                <option value="Corporativo">Corporativo</option>
                <option value="Sentencias Relevantes">Sentencias Relevantes</option>
              </select>
            </div>

            <div className={styles.studioControlGroup}>
              <label className={styles.studioControlLabel}>Visibilidad</label>
              <select
                className={styles.studioInput}
                value={currentPost.status}
                onChange={e => setCurrentPost({ ...currentPost, status: e.target.value as any })}
              >
                <option value="draft">Borrador Privado</option>
                <option value="active">Público (Publicado)</option>
              </select>
            </div>

            <div className="pt-10 border-t border-white/5">
              <Typography variant="p" className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-loose">
                Última Edición: {new Date().toLocaleTimeString('es-PE')}
              </Typography>
            </div>
          </div>
        </motion.aside>
      </motion.div>
    );
  }

  // --- LIST VIEW (DASHBOARD) ---
  return (
    <div className="space-y-12 animate-spring">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 px-6">
        <div>
          <span className="label-luxury text-gold">GESTIÓN EDITORIAL</span>
          <Typography variant="h1" font="serif" className="text-6xl lg:text-8xl mt-6 tracking-tighter">
            Análisis & <span className="text-gold italic border-b-4 border-gold/10">Contenido</span>
          </Typography>
        </div>
        <Button variant="primary" onClick={() => setIsEditing(true)}>+ NUEVA PUBLICACIÓN</Button>
      </header>

      <div className="grid gap-12 px-6">
        {posts.map(post => (
          <div key={post.id} className="glass-luxury p-12 rounded-[0.5rem] border-white/5 flex items-center gap-12 group hover:border-gold/30 transition-all shadow-2xl">
            <div className="w-56 h-36 rounded-3xl overflow-hidden hidden lg:block bg-white/5 relative ring-1 ring-white/10">
              {post.coverImage && <img src={post.coverImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[.2em] ${post.status === 'active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gray-500/10 text-gray-500 border border-white/5'}`}>
                  {post.status}
                </span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[.3em] font-sans">{post.category}</span>
              </div>
              <Typography variant="h3" font="serif" className="text-4xl mb-4 group-hover:text-gold transition-colors leading-tight">
                <span dangerouslySetInnerHTML={{ __html: post.title }} />
              </Typography>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">A</div>
                <Typography variant="p" className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  {post.author} • {post.publishedAt ? format(post.publishedAt.toDate(), "dd 'DE' MMMM", { locale: es }) : 'RECIÉN CREADO'}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => { setCurrentPost(post); setIsEditing(true); }}
                className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all group/btn"
              >
                <span className="text-2xl group-hover/btn:scale-125 transition-transform">✎</span>
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-maroon hover:text-white transition-all text-maroon group/btn"
              >
                <span className="text-xl group-hover/btn:rotate-12 transition-transform">✕</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
