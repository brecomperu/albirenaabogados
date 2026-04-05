"use client";

import React, { useEffect, useState } from 'react';
import styles from './BlogSection.module.css';
import Typography from '@/components/atoms/Typography';
import { blogRepository, BlogPost } from '@/features/blog/repository';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

const BlogSection: React.FC = () => {
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

  if (loading || posts.length === 0) return null;

  return (
    <section className="section-luxury bg-navy-deep border-t border-white/5" id="blog">
      <div className="container-luxury">
        <header className="mb-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="label-luxury"
          >
            Perspectiva Editorial
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="title-editorial text-5xl lg:text-8xl text-white tracking-tighter"
          >
            Análisis & <span className="text-gold italic">Novedades</span>
          </motion.h2>
          <div className="w-full h-px bg-white/10 mt-12"></div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`${index === 0 ? 'lg:col-span-8' : 'lg:col-span-4'} group cursor-pointer border-b border-white/5 pb-12`}
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-8">
                <img 
                  src={post.coverImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80'} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                  alt={post.title} 
                />
                <div className="absolute inset-0 bg-navy-deep/20 group-hover:bg-transparent transition-colors"></div>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-black tracking-[.3em] text-gold uppercase">{post.category || 'DERECHO LABORAL'}</span>
                <h3 className={`${index === 0 ? 'text-4xl lg:text-6xl' : 'text-2xl lg:text-3xl'} font-serif font-bold text-white group-hover:text-gold transition-colors leading-tight italic`}>
                  <span dangerouslySetInnerHTML={{ __html: post.title }} />
                </h3>
                <p className="text-gray-400 font-light line-clamp-3 leading-relaxed">
                  <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                </p>
                <div className="pt-4 flex items-center justify-between">
                   <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
                     {post.publishedAt ? format(post.publishedAt.toDate(), "d MMM, yyyy", { locale: es }) : ''}
                   </span>
                   <span className="text-[10px] font-black text-white group-hover:text-gold transition-colors">LEER MÁS +</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Full Screen Magazine Reader */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-navy-deep overflow-y-auto"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="fixed top-10 right-10 z-[2100] w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-gold transition-all group"
            >
              <span className="text-xl group-hover:rotate-90 transition-transform">✕</span>
            </button>

            <article className="max-w-4xl mx-auto px-6 py-32 lg:py-48">
              <header className="text-center space-y-10 mb-20">
                <span className="label-luxury">{selectedPost.category}</span>
                <h1 className="title-editorial text-5xl lg:text-9xl text-white tracking-tighter italic">
                  <span dangerouslySetInnerHTML={{ __html: selectedPost.title }} />
                </h1>
                <div className="flex items-center justify-center gap-6 opacity-40">
                  <span className="text-[10px] font-black uppercase tracking-widest">Albirena Abogados & Asociados</span>
                  <span className="w-1 h-1 bg-gold rounded-full"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {selectedPost.publishedAt ? format(selectedPost.publishedAt.toDate(), "d ' de ' MMMM, yyyy", { locale: es }) : ''}
                  </span>
                </div>
              </header>

              {selectedPost.coverImage && (
                <div className="aspect-[21/9] rounded-sm overflow-hidden mb-20 shadow-2xl">
                   <img src={selectedPost.coverImage} className="w-full h-full object-cover" alt="Portada" />
                </div>
              )}

              <div
                className="prose prose-invert prose-editorial max-w-none prose-p:text-xl lg:prose-p:text-2xl prose-p:font-light prose-headings:font-serif prose-headings:italic"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <footer className="mt-32 pt-20 border-t border-white/5 text-center space-y-8">
                 <div className="text-gold italic font-serif text-3xl">Albirena Abogados</div>
                 <p className="text-[10px] font-black tracking-[.5em] text-gray-600 uppercase">Fin de la Lectura Editorial</p>
                 <button
                    onClick={() => setSelectedPost(null)}
                    className="px-12 py-5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-gold hover:text-navy-deep transition-all"
                  >
                    Volver al Análisis
                  </button>
              </footer>
            </article>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .prose-editorial { font-family: 'Inter', sans-serif; color: #d1d5db; }
        .prose-editorial h2 { font-size: 3rem; margin-top: 4rem; color: #fff; }
        .prose-editorial p { line-height: 1.8; margin-bottom: 2rem; }
        .prose-editorial blockquote { border-left-color: #D4AF37; font-family: var(--font-serif); font-style: italic; font-size: 2rem; color: #D4AF37; }
        .prose-editorial img { border-radius: 4px; margin: 4rem 0; }
      `}</style>
    </section>
  );
};

export default BlogSection;
