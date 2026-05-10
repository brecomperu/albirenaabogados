"use client";

import React, { useCallback, useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import { StarterKit } from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { Image } from '@tiptap/extension-image';
import { ImageResize } from 'tiptap-extension-resize-image';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Blockquote } from '@tiptap/extension-blockquote';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import Paragraph from '@tiptap/extension-paragraph';
import { FontSize } from './editor/extensions/FontSize';
import { Youtube } from '@tiptap/extension-youtube';
import { FontFamily } from '@tiptap/extension-font-family';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { Node, mergeAttributes } from '@tiptap/core';
import {
  Bold, Italic, Underline as UnderIcon, Link as LinkIcon,
  Image as ImageIcon, List, ListOrdered, AlignLeft,
  AlignCenter, AlignRight, AlignJustify, Type, Palette,
  Quote, Minus, Plus, Smile, Columns, Sparkles, Search,
  ChevronDown, Maximize, AlertCircle, CheckSquare, Highlighter as HighIcon,
  Code, Hash, Layout, FileText, Settings2, Languages, CheckCircle2, Trash2,
  Undo2, Redo2, Strikethrough, Indent as IndentIcon, Outdent, Film, Play as YoutubeIcon,
  Maximize2, Minimize2, Baseline, Heading1, Heading2, Heading3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  onFocus?: (editor: any) => void;
  showToolbar?: boolean;
  placeholder?: string;
  storageId?: string;
  variant?: 'title' | 'excerpt' | 'content';
}

const CustomVideo = Node.create({
  name: 'video',
  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: '100%' },
      margin: { default: 16 },
      controls: { default: true },
    };
  },

  parseHTML() {
    return [{ tag: 'video' }];
  },

  renderHTML({ HTMLAttributes, node }) {
    const { margin, controls } = node.attrs;
    return [
      'div',
      { style: `margin-top: ${margin}px; margin-bottom: ${margin}px; text-align: center;` },
      ['video', mergeAttributes(HTMLAttributes, {
        class: 'rounded-[0.5rem] shadow-magical border border-white/10 max-w-full',
        preload: 'metadata',
        controls: controls,
      })]
    ];
  },
});

const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      columns: {
        default: 1,
        parseHTML: element => element.getAttribute('data-columns'),
        renderHTML: attributes => {
          if (attributes.columns === 1) return {};
          return { 'data-columns': attributes.columns, style: `column-count: ${attributes.columns}; column-gap: 2.5rem;` };
        },
      },
      indent: {
        default: 0,
        parseHTML: element => parseInt(element.style.paddingLeft) / 20 || 0,
        renderHTML: attributes => {
          if (!attributes.indent) return {};
          return { style: `padding-left: ${attributes.indent * 40}px;` };
        },
      },
    };
  },
});

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  onFocus,
  showToolbar = true,
  placeholder,
  storageId = 'general',
  variant = 'content'
}) => {
  const [prevImages, setPrevImages] = useState<string[]>([]);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        paragraph: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        horizontalRule: false,
      }),
      CustomParagraph,
      Underline,
      TextStyle,
      Color,
      FontSize,
      FontFamily,
      Youtube.configure({
        controls: true,
        nocookie: true,
        autoplay: false,
        width: 800,
        height: 450,
        HTMLAttributes: { class: 'rounded-[0.5rem] shadow-magical mx-auto my-16 border border-white/10 overflow-hidden' },
      }),
      CustomVideo,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Blockquote.configure({
        HTMLAttributes: { class: 'border-l-8 border-gold/40 pl-10 my-12 italic text-2xl text-gray-500 font-serif leading-relaxed' },
      }),
      HorizontalRule.configure({
        HTMLAttributes: { class: 'border-t-2 border-gold/15 my-16 shadow-sm' },
      }),
      BulletList.configure({
        HTMLAttributes: { class: 'list-disc ml-8 my-10 space-y-4' },
      }),
      OrderedList.configure({
        HTMLAttributes: { class: 'list-decimal ml-8 my-10 space-y-4' },
      }),
      ListItem,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-[0.5rem] shadow-magical my-16 border border-white/10 mx-auto block max-w-full cursor-pointer hover:ring-[12px] ring-gold/10 transition-all duration-1000 ease-[0.16, 1, 0.3, 1]',
        },
      }),
      ImageResize.configure({
        inline: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image', 'video'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-gold underline underline-offset-8 cursor-pointer hover:bg-gold/10 px-1 rounded transition-all font-black',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || (variant === 'content' ? 'El editor maestro está listo para su análisis...' : 'Comience aquí...'),
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content,
    onFocus: ({ editor }) => onFocus?.(editor),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);

      // Advanced Slash Detection
      const { from } = editor.state.selection;
      const textAfterCursor = editor.state.doc.textBetween(from - 1, from, "\n");
      if (textAfterCursor === '/' && variant === 'content') {
        setShowSlashMenu(true);
      } else {
        setShowSlashMenu(false);
      }

      const currentAssets = Array.from(new DOMParser().parseFromString(html, 'text/html').querySelectorAll('img, video source'))
        .map(el => (el as any).src || (el as any).getAttribute('src'))
        .filter(src => src && src.includes('firebasestorage.googleapis.com'));

      const deletedItems = prevImages.filter(item => !currentAssets.includes(item));
      deletedItems.forEach(async (url) => {
        try {
          const { ref, deleteObject } = await import('firebase/storage');
          const { storage } = await import('@/shared/api/firebase/config');
          const decodedUrl = decodeURIComponent(url.split('/o/')[1].split('?')[0]);
          const desertRef = ref(storage, decodedUrl);
          await deleteObject(desertRef);
        } catch (e) {
          console.error("Error auto-deleting media:", e);
        }
      });
      setPrevImages(currentAssets);
    },
    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const files = Array.from(event.dataTransfer.files);
          const mediaFiles = files.filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));

          if (mediaFiles.length > 0) {
            event.preventDefault();
            event.stopPropagation();

            mediaFiles.forEach(async file => {
              if (file.size > 500 * 1024 * 1024) {
                alert(`El archivo ${file.name} supera el límite de 500MB.`);
                return;
              }

              setIsUploading(true);
              const url = await uploadMedia(file);
              setIsUploading(false);

              if (url && editor) {
                if (file.type.startsWith('image/')) {
                  editor.commands.setImage({ src: url });
                } else {
                  editor.commands.insertContent({
                    type: 'video',
                    attrs: { src: url }
                  });
                }
              }
            });
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const item = items.find(item => item.type.startsWith('image/') || item.type.startsWith('video/'));
        if (item) {
          const file = item.getAsFile();
          if (file) {
            event.preventDefault();
            event.stopPropagation();
            setIsUploading(true);
            uploadMedia(file).then(url => {
              setIsUploading(false);
              if (url && editor) {
                if (file.type.startsWith('image/')) {
                  editor.commands.setImage({ src: url });
                } else {
                  editor.commands.insertContent({ type: 'video', attrs: { src: url } });
                }
              }
            });
            return true;
          }
        }
        return false;
      },
      attributes: {
        spellcheck: 'true',
        lang: 'es',
        class: variant === 'title'
          ? 'prose-editorial-title rte-title focus:outline-none max-w-none py-0 font-serif tracking-tighter'
          : variant === 'excerpt'
            ? 'prose-editorial-excerpt rte-excerpt focus:outline-none max-w-none py-0 font-serif italic pr-12 opacity-80'
            : 'prose-editorial-body rte-content focus:outline-none max-w-none min-h-[900px] py-16 px-0 font-serif text-gray-900 selection:bg-gold/20',
      },
    },
  });

  const sizeMap: { [key: string]: string } = {
    title: "48px",
    excerpt: "20px",
    content: "16px",
  };

  useEffect(() => {
    if (!editor) return;

    const size = editor.getAttributes("textStyle").fontSize;

    if (!size) {
      editor.chain().setFontSize(sizeMap[variant]).run();
    }
  }, [editor, variant]);

  const uploadMedia = async (file: File) => {
    try {
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const { storage } = await import('@/shared/api/firebase/config');
      const pathToken = file.type.startsWith('image/') ? 'images' : 'videos';
      const storageRef = ref(storage, `blog/${storageId}/${pathToken}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setPrevImages(prev => [...prev, url]);
      return url;
    } catch (k) {
      console.error("Error uploading media:", k);
      return null;
    }
  };

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enlace Editorial (URL):', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const setYouTubeVideo = useCallback(() => {
    const url = window.prompt('URL de YouTube (MASTER Elite):');
    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        width: 800,
        height: 450,
      });
    }
  }, [editor]);

  if (!editor) return null;

  // 💎 ELITE FONTS
  const fonts = [
    { name: 'Serif Clásico', value: 'var(--font-serif)' },
    { name: 'Sans Moderno', value: 'var(--font-sans)' },
    { name: 'Elegante Display', value: 'var(--font-display)' },
    { name: 'Acento Montserrat', value: 'var(--font-accent)' },
    { name: 'Cuerpo Lato', value: 'var(--font-body)' },
    { name: 'Limpio Roboto', value: 'var(--font-clean)' },
    { name: 'Código Fira', value: 'var(--font-mono)' },
  ];

  const slashCommands = [
    {
      cat: 'Básico', items: [
        { label: 'Título H1', icon: <Heading1 size={18} />, action: () => editor.chain().focus().deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from }).setHeading({ level: 1 }).run() },
        { label: 'Subtítulo H2', icon: <Heading2 size={18} />, action: () => editor.chain().focus().deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from }).setHeading({ level: 2 }).run() },
        { label: 'Párrafo Normal', icon: <Pilcrow size={18} />, action: () => editor.chain().focus().deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from }).setParagraph().run() },
      ]
    },
    {
      cat: 'Medios Masters', items: [
        { label: 'Insertar YouTube', icon: <YoutubeIcon size={18} />, action: () => { editor.chain().focus().deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from }).run(); setYouTubeVideo(); } },
        {
          label: 'Imagen Pro', icon: <ImageIcon size={18} />, action: () => {
            editor.chain().focus().deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from }).run();
            const input = document.createElement('input');
            input.type = 'file'; input.accept = 'image/*';
            input.onchange = (e: any) => {
              const file = e.target.files[0];
              if (file) uploadMedia(file).then(u => u && editor.chain().focus().setImage({ src: u }).run());
            };
            input.click();
          }
        },
      ]
    },
    {
      cat: 'Especialidades', items: [
        { label: 'Cita Magistral', icon: <Quote size={18} />, action: () => editor.chain().focus().deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from }).toggleBlockquote().run() },
        {
          label: 'Doble Columna', icon: <Layout size={18} />, action: () => {
            editor.chain().focus().deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from }).updateAttributes('paragraph', { columns: 2 }).run();
          }
        },
      ]
    }
  ];

  const triggerReward = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#D4AF37', '#111111', '#FFFFFF'] });
  };

  return (
    <div className="relative w-full group transition-all duration-700">

      {/* 🔮 MASTER SLICE MENU */}
      <AnimatePresence>
        {showSlashMenu && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute z-[100] mt-12 bg-black/95 backdrop-blur-3xl p-4 rounded-[0.5rem] border border-white/10 shadow-magical min-w-[300px]">
            {slashCommands.map((section, si) => (
              <div key={si} className="mb-6 last:mb-0">
                <div className="px-4 py-2 mb-2 border-b border-white/5"><span className="text-[9px] font-black text-gold tracking-widest uppercase">{section.cat}</span></div>
                {section.items.map((cmd, i) => (
                  <button key={i} onClick={() => { cmd.action(); setShowSlashMenu(false); }} className="w-full text-left px-5 py-3 rounded-xl flex items-center gap-4 text-white/60 hover:text-white hover:bg-white/10 transition-all font-bold text-xs group/cmd">
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover/cmd:bg-gold group-hover/cmd:text-black">{cmd.icon}</div>
                    {cmd.label}
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎈 CONTEXTUAL MEDIA MASTER CONTROLS */}
      <BubbleMenu editor={editor} shouldShow={({ editor }) => editor.isActive('image') || editor.isActive('video')} options={{ placement: 'top', offset: 25 }}>
        <div className="p-3 rounded-[0.5rem] flex items-center gap-2 shadow-magical bg-black/95 backdrop-blur-3xl border border-white/15 ring-[12px] ring-black/10">
          {/* Presets */}
          <div className="flex items-center bg-white/5 rounded-2xl p-1 gap-1">
            <button
              onClick={() => editor.chain().focus().updateAttributes(editor.isActive('image') ? 'image' : 'video', { width: '100%' }).run()}
              className="px-3 py-1.5 text-[9px] font-black text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >FULL</button>
            <button
              onClick={() => editor.chain().focus().updateAttributes(editor.isActive('image') ? 'image' : 'video', { width: '85%' }).run()}
              className="px-3 py-1.5 text-[9px] font-black text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >WIDE</button>
            <button
              onClick={() => editor.chain().focus().updateAttributes(editor.isActive('image') ? 'image' : 'video', { width: '60%' }).run()}
              className="px-3 py-1.5 text-[9px] font-black text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >CENT</button>
          </div>

          <div className="w-px h-8 bg-white/10 mx-1"></div>

          <ToolbarButton active={false} onClick={() => {
            const current = editor.getAttributes(editor.isActive('image') ? 'image' : 'video').margin || 0;
            editor.chain().focus().updateAttributes(editor.isActive('image') ? 'image' : 'video', { margin: Math.max(current - 20, 0) }).run();
          }} icon={<Minimize2 size={18} />} label="Reducir Margen" className="text-white" />

          <ToolbarButton active={false} onClick={() => {
            const current = editor.getAttributes(editor.isActive('image') ? 'image' : 'video').margin || 0;
            editor.chain().focus().updateAttributes(editor.isActive('image') ? 'image' : 'video', { margin: Math.min(current + 20, 200) }).run();
          }} icon={<Maximize2 size={18} />} label="Aumentar Margen" className="text-white" />

          <div className="w-px h-8 bg-white/10 mx-1"></div>

          <ToolbarButton active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} icon={<AlignLeft size={18} />} className="text-white" />
          <ToolbarButton active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} icon={<AlignCenter size={18} />} className="text-white" />
          <ToolbarButton active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} icon={<AlignRight size={18} />} className="text-white" />

          <div className="w-px h-8 bg-white/10 mx-1"></div>
          <ToolbarButton active={false} onClick={() => editor.chain().focus().deleteSelection().run()} icon={<Trash2 size={18} className="text-red-400" />} className="hover:bg-red-500/20" />
        </div>
      </BubbleMenu>

      <BubbleMenu editor={editor} shouldShow={({ editor }) => !editor.isActive('image') && !editor.isActive('video') && !editor.state.selection.empty}>
        <div className="p-2 rounded-2xl bg-black/95 backdrop-blur-3xl border border-white/10 flex items-center gap-1 shadow-2xl">
          <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} icon={<Bold size={15} />} className="text-white" />
          <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} icon={<Italic size={15} />} className="text-white" />
          <ToolbarButton active={editor.isActive('link')} onClick={setLink} icon={<LinkIcon size={15} />} className="text-white" />
        </div>
      </BubbleMenu>

      <EditorContent editor={editor} />

      <style jsx global>{`
        .prose-editorial-body video { width: 100%; border-radius: 2.5rem; transition: all 1s ease; }
        .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left; color: #eee; pointer-events: none; height: 0; font-style: italic; opacity: 0.5;
        }
        .shadow-magical { box-shadow: 0 40px 100px -20px rgba(0,0,0,0.12), 0 25px 50px -25px rgba(212, 175, 55, 0.15); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
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

const Pilcrow = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4v16" /><path d="M17 4v16" /><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13" /></svg>
);

export default RichTextEditor;
