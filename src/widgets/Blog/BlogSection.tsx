"use client";

import React, { useEffect, useState } from 'react';
import styles from './BlogSection.module.css';
import { blogRepository } from '@/features/blog/api/repository';
import { BlogPost } from '@/entities/blog-post/model/types';
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
    <section className="section-luxury border-t border-white/5 bg-brand-bg" id="blog">
      <div className="container-luxury">
        <header className="mb-24">
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
            className="title-editorial text-5xl lg:text-7xl text-white tracking-tighter"
          >
            Análisis & <span className="text-brand-primary italic">Novedades</span>
          </motion.h2>
          <div className="w-full h-[1px] bg-white/5 mt-12"></div>
        </header>

        <div className="grid lg:grid-cols-12 gap-16">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`${index === 0 ? 'lg:col-span-8' : 'lg:col-span-4'} group cursor-pointer border-b border-white/5 pb-16 transition-all duration-500 hover:border-brand-primary/30`}
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-10 border border-white/5">
                <img 
                  src={post.coverImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80'} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                  alt={post.title} 
                />
                <div className="absolute inset-0 bg-brand-bg/40 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>

              <div className="space-y-6">
                <span className="text-[10px] font-bold tracking-[.35em] text-brand-primary uppercase">{post.category || 'DERECHO LABORAL'}</span>
                <h3 className={`${index === 0 ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'} font-serif font-bold text-white group-hover:text-brand-primary transition-colors duration-500 leading-tight italic`}>
                  <span dangerouslySetInnerHTML={{ __html: post.title }} />
                </h3>
                <p className="text-brand-silver/60 font-light line-clamp-3 leading-relaxed text-lg">
                  <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                </p>
                <div className="pt-6 flex items-center justify-between border-t border-white/5">
                   <span className="text-[10px] font-bold text-brand-silver/30 uppercase tracking-[0.2em]">
                     {post.publishedAt ? format(post.publishedAt.toDate(), "d MMM, yyyy", { locale: es }) : ''}
                   </span>
                   <span className="text-[10px] font-bold text-white group-hover:text-brand-primary transition-all duration-500 tracking-widest flex items-center gap-2">
                     LEER ARTÍCULO <span className="text-lg">+</span>
                   </span>
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
                className={`prose prose-invert ${styles.proseEditorial} max-w-none`}
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <footer className="mt-40 pt-20 border-t border-white/5 text-center space-y-10">
                 <div className="text-brand-primary italic font-serif text-4xl">Albirena Abogados</div>
                 <p className="text-[9px] font-bold tracking-[0.6em] text-brand-silver/20 uppercase">Fin del Análisis Editorial</p>
                 <button
                    onClick={() => setSelectedPost(null)}
                    className="px-12 py-5 bg-transparent border border-brand-silver/30 text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-primary hover:border-brand-primary transition-all duration-500"
                  >
                    VOLVER AL BLOG
                  </button>
              </footer>
            </article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
