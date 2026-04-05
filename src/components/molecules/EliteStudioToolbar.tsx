"use client";

import React, { useCallback, useState, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold, Italic, Underline as UnderIcon, Link as LinkIcon,
  Image as ImageIcon, List, AlignLeft, ListOrdered,
  AlignCenter, AlignRight, AlignJustify,
  Quote, Undo2, Redo2, Strikethrough, Indent as IndentIcon, Outdent, Play as YoutubeIcon,
  Baseline, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EliteStudioToolbarProps {
  editor: Editor | null;
  storageId?: string;
  isUploading?: boolean;
  isReviewing?: boolean;
  onUploadMedia?: (file: File) => Promise<string | null>;
  onAIAction?: () => void;
  activeSection?: string;
}

const FontSizeControl = ({ editor }: { editor: Editor }) => {
  const getEditorSize = () => {
    const size = editor.getAttributes("textStyle").fontSize;
    return size ? parseInt(size) : 24;
  };

  const [value, setValue] = useState(getEditorSize());

  // Sync when editor selection changes
  useEffect(() => {
    if (!editor) return;

    const update = () => {
      setValue(getEditorSize());
    };

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  const applyFontSize = (val: any) => {
    if (!val) return;
    editor.chain().focus().extendMarkRange("textStyle").setFontSize(`${val}px`).run();
  };

  return (
    <div className="flex items-center bg-white/5 rounded-xl px-3 h-[42px] border border-[#C9A050]/20 hover:border-gold/40 transition-all group">
      <Baseline size={16} className="text-gray-400 mr-2" />

      <input
        type="number"
        className="w-10 bg-transparent border-none text-sm font-bold text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value) || 0)}
        onBlur={() => applyFontSize(value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            applyFontSize(value);
            (e.target as HTMLInputElement).blur();
          }
        }}
      />

      <span className="text-[10px] font-bold text-white/40 ml-1">PX</span>

      <select
        className="ml-2 bg-transparent text-white/60 text-[10px] font-bold focus:outline-none cursor-pointer hover:text-gold transition-colors"
        onChange={(e) => {
          const val = e.target.value;
          setValue(parseInt(val));
          applyFontSize(val);
        }}
        value={value}
      >
        {[12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 72].map((size) => (
          <option key={size} value={size} className="text-black bg-white font-sans">
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

const fonts = [
  { name: 'Serif Clásico', value: 'var(--font-serif)' },
  { name: 'Sans Moderno', value: 'var(--font-sans)' },
  { name: 'Elegante Display', value: 'var(--font-display)' },
  { name: 'Acento Montserrat', value: 'var(--font-accent)' },
  { name: 'Cuerpo Lato', value: 'var(--font-body)' },
  { name: 'Limpio Roboto', value: 'var(--font-clean)' },
  { name: 'Código Fira', value: 'var(--font-mono)' },
];

const EliteStudioToolbar: React.FC<EliteStudioToolbarProps> = ({
  editor,
  isUploading = false,
  isReviewing = false,
  onUploadMedia,
  onAIAction,
  activeSection
}) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  const handleSetLink = () => {
    if (!editor || !tempUrl) return;
    editor.chain().focus().extendMarkRange('link').setLink({ href: tempUrl }).run();
    setTempUrl('');
    setShowLinkModal(false);
  };

  const handleSetYoutube = () => {
    if (!editor || !tempUrl) return;
    editor.commands.setYoutubeVideo({
      src: tempUrl,
      width: 800,
      height: 450,
    });
    setTempUrl('');
    setShowYoutubeModal(false);
  };

  if (!editor) {
    return (
      <div className="w-full pt-6 pb-4 bg-white/40 backdrop-blur-3xl border-b border-gold/10 flex items-center justify-center opacity-50 grayscale pointer-events-none rounded-b-3xl">
        <span className="text-[10px] font-black uppercase tracking-[.4em] text-gray-400">Seleccione un área para editar</span>
      </div>
    );
  }

  return (
    <div className="w-full pt-8 pb-6 bg-blue-950 backdrop-blur-3xl border-b border-gold/15 flex flex-col gap-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000 overflow-visible rounded-b-[2rem] relative">

      {/* 🏷️ Smart Section Indicator */}
      {activeSection && (
        <div className="absolute -top-10 left-8 bg-black/90 backdrop-blur-xl text-gold border border-white/10 px-6 py-2.5 rounded-t-[1.5rem] flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
          <span className="text-[9px] font-black uppercase tracking-[.3em]">{activeSection}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center gap-2 px-6">

        {/* Group 1: History */}
        <div className="flex items-center gap-1.5 pr-4 border-r border-gold/15">
          <ToolbarButton active={false} onClick={() => editor.chain().focus().undo().run()} icon={<Undo2 size={19} />} label="Deshacer" />
          <ToolbarButton active={false} onClick={() => editor.chain().focus().redo().run()} icon={<Redo2 size={19} />} label="Rehacer" />
        </div>

        {/* Group 2: Typography & Style */}
        <div className="flex items-center gap-1.5 px-4 border-r border-gold/15">
          <select
            className="rounded-xl px-4 py-2.5 text-[11px] font-black uppercase tracking-widest focus:outline-none hover:bg-blue-950 transition-all cursor-pointer border border-[#C9A050]/40 focus:border-gold/20"
            onChange={(e) => {
              if (e.target.value === 'p') editor.chain().focus().setParagraph().run();
              else editor.chain().focus().toggleHeading({ level: parseInt(e.target.value) as any }).run();
            }}
            value={editor.isActive('heading', { level: 1 }) ? '1' : editor.isActive('heading', { level: 2 }) ? '2' : editor.isActive('heading', { level: 3 }) ? '3' : 'p'}
          >
            <option value="p">Cuerpo Estándar</option>
            <option value="1">Título H1</option>
            <option value="2">Subtítulo H2</option>
            <option value="3">Sección H3</option>
          </select>

          <select
            className="rounded-xl px-4 py-2.5 text-[11px] font-black uppercase tracking-widest focus:outline-none hover:bg-blue-950 transition-all cursor-pointer w-44 border border-[#C9A050]/40 focus:border-gold/20"
            onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
            value={editor.getAttributes('textStyle').fontFamily || 'var(--font-serif)'}
          >
            {fonts.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
          </select>

          <FontSizeControl editor={editor} />
        </div>

        {/* Group 3: Character Formatting */}
        <div className="flex items-center gap-1.5 px-4 border-r border-gold/15">
          <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} icon={<Bold size={19} />} label="Negrita" />
          <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} icon={<Italic size={19} />} label="Cursiva" />
          <ToolbarButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} icon={<UnderIcon size={19} />} label="Subrayado" />
          <ToolbarButton active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} icon={<Strikethrough size={19} />} label="Tachado" />
          <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-black/5 hover:border-gold/30 transition-all">
            <input
              type="color"
              className="absolute inset-0 w-full h-full border-none cursor-pointer p-0 bg-transparent scale-[2]"
              value={editor.getAttributes('textStyle').color || '#760109ff'}
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            />
          </div>
        </div>

        {/* Group 4: Paragraph & Alignment */}
        <div className="flex items-center gap-1.5 px-4 border-r border-gold/15">
          <ToolbarButton active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} icon={<AlignLeft size={19} />} label="Izquierda" />
          <ToolbarButton active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} icon={<AlignCenter size={19} />} label="Centro" />
          <ToolbarButton active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} icon={<AlignRight size={19} />} label="Derecha" />
          <ToolbarButton active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} icon={<AlignJustify size={19} />} label="Justificado" />

          <div className="w-px h-8 bg-gold/15 mx-2"></div>

          <ToolbarButton active={false} onClick={() => {
            const current = editor.getAttributes('paragraph').indent || 0;
            editor.chain().focus().updateAttributes('paragraph', { indent: Math.min(current + 1, 5) }).run();
          }} icon={<IndentIcon size={19} />} label="Sangría+" />

          <ToolbarButton active={false} onClick={() => {
            const current = editor.getAttributes('paragraph').indent || 0;
            editor.chain().focus().updateAttributes('paragraph', { indent: Math.max(current - 1, 0) }).run();
          }} icon={<Outdent size={19} />} label="Sangría-" />
        </div>

        {/* Group 5: Studio Insertion */}
        <div className="flex items-center gap-1.5 px-4">
          <ToolbarButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={<List size={19} />} label="Viñetas" />
          <ToolbarButton
            active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={<ListOrdered size={19} />}
            label="Lista numerada"
          />
          <ToolbarButton active={editor.isActive('link')} onClick={() => { setTempUrl(editor.getAttributes('link').href || ''); setShowLinkModal(true); }} icon={<LinkIcon size={19} />} label="Vínculo" />
          <div className="relative group/insert bg-black/5 rounded-xl flex items-center gap-1 px-1">
            <ToolbarButton active={false} onClick={() => {
              const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*,video/*';
              input.onchange = (e: any) => {
                const file = e.target.files[0];
                if (file && onUploadMedia) {
                  onUploadMedia(file).then(u => {
                    if (u && file.type.startsWith('image/')) editor.chain().focus().setImage({ src: u }).run();
                    else if (u) editor.chain().focus().insertContent({ type: 'video', attrs: { src: u } }).run();
                  });
                }
              };
              input.click();
            }} icon={<ImageIcon size={19} />} label="Media Pro" />
            <ToolbarButton active={false} onClick={() => setShowYoutubeModal(true)} icon={<YoutubeIcon size={19} />} label="YouTube" />
            <ToolbarButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={<Quote size={19} />} label="Cita" />
          </div>
        </div>

        {/* Status Actions */}
        <div className="ml-auto flex items-center gap-6">
          {isUploading && (
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Sparkles size={18} className="text-gold" />
            </motion.div>
          )}

          <div className="flex flex-col items-end gap-0.5 border-l border-gold/20 pl-6 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[7px] font-black uppercase tracking-[.4em] text-gray-400">Albirena Studio</span>
            <span className="text-[10px] font-black text-gold tracking-widest">MASTER V4.4</span>
          </div>
        </div>
      </div>

      {/* 🎭 STUDIO PREMIUM MODALS */}
      <AnimatePresence>
        {(showLinkModal || showYoutubeModal) && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-10 z-[200] w-[480px] bg-blue-950 backdrop-blur-xl border border-[#C9A050]/40 p-4 rounded-[0.5rem] shadow-[0_30px_100px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/5"
          >
            {/* Header: Más compacto para dar aire al input */}
            <div className="flex items-center justify-between" style={{ padding: '10px' }}>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-[.6em] text-[#C9A050] leading-none">
                  {showLinkModal ? 'Vínculo Maestro' : 'Video YouTube'}
                </span>
                <div className="h-[1px] w-8 bg-[#C9A050]/30" /> {/* Detalle visual de diseño */}
              </div>
              <button
                onClick={() => { setShowLinkModal(false); setShowYoutubeModal(false); setTempUrl(''); }}
                className="group p-2 -mr-2 text-white/20 hover:text-white transition-all"
              >
                <div className="group-hover:rotate-90 transition-transform duration-300">✕</div>
              </button>
            </div>

            {/* Body: El input necesita ser el centro de atención */}
            <div className="space-y-8" style={{ padding: '10px' }}>
              <div className="relative group">
                <input
                  autoFocus
                  type="text"
                  placeholder="https://ejemplo.com/recurso"
                  value={tempUrl}
                  onChange={e => setTempUrl(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') showLinkModal ? handleSetLink() : handleSetYoutube(); }}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white font-medium text-sm focus:outline-none focus:border-[#C9A050] focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                />
                {/* Glow sutil en el borde al hacer focus */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none group-focus-within:ring-4 ring-[#C9A050]/10 transition-all" />
              </div>

              {/* Action: Un solo botón protagonista */}
              <button
                onClick={showLinkModal ? handleSetLink : handleSetYoutube}
                className="w-full bg-[#C9A050] text-black font-black text-[10px] uppercase tracking-[.3em] py-5 rounded-2xl hover:bg-[#D4AF37] hover:shadow-[0_0_30px_rgba(201,160,80,0.3)] active:scale-[0.98] transition-all"
              >
                Vincular Ahora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ToolbarButton = ({ active, onClick, icon, label, className = '' }: any) => (
  <button
    type="button" onClick={onClick} title={label}
    className={`w-11 h-11 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${active ? 'bg-gold text-black shadow-lg scale-110' : 'text-gray-400 hover:text-black hover:bg-gold/10'} ${className}`}
  >
    {icon}
  </button>
);

export default EliteStudioToolbar;
