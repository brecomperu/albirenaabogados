"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogRepository } from '@/features/blog/api/repository';
import { BlogPost } from '@/entities/blog-post/model/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Navbar from '@/widgets/Navbar';
import FloatingContactButtons from '@/shared/ui/molecules/FloatingContactButtons';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const unsub = blogRepository.subscribeToPosts((data) => {
      setPosts(data);
      setLoading(false);
    }, 'active');

    return () => unsub();
  }, []);

  const openBooking = () => {
    window.location.href = '/#inicio';
  };

  return (
    <div className="relative min-h-screen bg-[#091D36] text-white overflow-hidden">
      <Navbar onOpenBooking={openBooking} />
      
      <main className="pt-32 pb-40">
        <section className="section-luxury">
          <div className="container-luxury">
            <header className="mb-24">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="label-luxury"
              >
                Perspectiva Editorial
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="title-editorial text-5xl lg:text-8xl text-white tracking-tighter"
              >
                Análisis & <span className="text-brand-primary italic">Estrategia</span>
              </motion.h1>
              <p className="text-brand-silver/50 text-xl font-light mt-8 max-w-2xl leading-relaxed">
                Nuestra firma comparte conocimientos críticos y análisis profundos sobre el panorama legal y laboral contemporáneo.
              </p>
            </header>

            {loading ? (
              <div className="flex justify-center py-40">
                <div className="w-12 h-12 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer flex flex-col h-full border-b border-white/5 pb-12 hover:border-brand-primary/30 transition-all duration-500"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-8 border border-white/5">
                       <img 
                        src={post.coverImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80'} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                        alt={post.title} 
                      />
                      <div className="absolute inset-0 bg-brand-bg/40 group-hover:bg-transparent transition-colors duration-700"></div>
                    </div>
                    
                    <div className="flex-grow space-y-4">
                      <span className="text-[9px] font-bold tracking-[.3em] text-brand-primary uppercase">{post.category || 'DERECHO LABORAL'}</span>
                      <h2 className="text-2xl font-serif font-bold text-white group-hover:text-brand-primary transition-colors duration-500 italic leading-tight">
                        <span dangerouslySetInnerHTML={{ __html: post.title }} />
                      </h2>
                      <p className="text-brand-silver/60 font-light line-clamp-3 text-sm leading-relaxed">
                        <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                      </p>
                    </div>

                    <div className="pt-6 flex items-center justify-between">
                       <span className="text-[9px] font-bold text-brand-silver/30 uppercase tracking-widest">
                         {post.publishedAt ? format(post.publishedAt.toDate(), "d MMM, yyyy", { locale: es }) : ''}
                       </span>
                       <span className="text-[9px] font-bold text-white group-hover:text-brand-primary transition-colors tracking-widest flex items-center gap-2">
                         LEER <span className="text-lg">+</span>
                       </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <FloatingContactButtons />

      {/* Reader Modal Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-brand-bg overflow-y-auto"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="fixed top-8 right-8 z-[2100] w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-white hover:bg-brand-primary transition-all group"
            >
              <span className="text-xl group-hover:rotate-90 transition-transform">✕</span>
            </button>

            <article className="max-w-3xl mx-auto px-6 py-32 lg:py-40">
              <header className="text-center space-y-12 mb-24">
                <span className="label-luxury px-4 py-1 border border-brand-primary/20 rounded-full">{selectedPost.category}</span>
                <h1 className="title-editorial text-5xl lg:text-8xl text-white tracking-tight italic leading-[1.05]">
                  <span dangerouslySetInnerHTML={{ __html: selectedPost.title }} />
                </h1>
                <div className="flex items-center justify-center gap-8 opacity-40">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-silver">Albirena Abogados</span>
                  <span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-silver">
                    {selectedPost.publishedAt ? format(selectedPost.publishedAt.toDate(), "d ' de ' MMMM, yyyy", { locale: es }) : ''}
                  </span>
                </div>
              </header>

              {selectedPost.coverImage && (
                <div className="aspect-[21/10] rounded-sm overflow-hidden mb-24 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5">
                   <img src={selectedPost.coverImage} className="w-full h-full object-cover" alt="Portada" />
                </div>
              )}

              <div
                className="prose prose-invert prose-editorial max-w-none prose-p:text-xl lg:prose-p:text-2xl prose-p:font-light prose-headings:font-serif prose-headings:italic prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <footer className="mt-40 pt-20 border-t border-white/5 text-center space-y-10">
                 <div className="text-brand-primary italic font-serif text-4xl">Albirena Abogados</div>
                 <p className="text-[9px] font-bold tracking-[0.6em] text-brand-silver/20 uppercase">Análisis Editorial Finalizado</p>
                 <button
                    onClick={() => setSelectedPost(null)}
                    className="px-12 py-5 bg-transparent border border-brand-silver/30 text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-primary hover:border-brand-primary transition-all duration-500"
                  >
                    VOLVER AL LISTADO
                  </button>
              </footer>
            </article>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 border-t border-white/5 bg-[#05101d] text-center">
         <p className="text-[10px] text-brand-silver/20 font-bold tracking-[0.5em] uppercase">
            © 2026 ALBIRENA ABOGADOS | ELITE DEFENSE ARCHITECTURE
         </p>
      </footer>
    </div>
  );
}
