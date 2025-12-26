import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Tag as TagIcon,
  X,
  Loader2,
  Send,
  AlertCircle,
  Info,
  CheckCircle2,
  Type
} from 'lucide-react';
import { useFeeds } from '../../features/posts/hooks/useFeeds';
import { PageLoader } from '../../components/PageLoader';
import { notify } from '../../components/Toast';
import { useCreatePost } from '../../features/posts/hooks/useCreatePost';
import { useUpdatePost } from '../../features/posts/hooks/useUpdatePost';
import { TagInput } from '../../features/posts/components/TagInput';

export default function PostFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { post, isLoadingPost } = useFeeds({ id });

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [tags, setTags] = useState(post?.tags || []);

  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({});

  const { mutate: createPost, isPending: creatingPost } = useCreatePost();
  const { mutate: updatePost, isPending: updatingPost } = useUpdatePost();

  useEffect(() => {
    if (!post) return;
    const id = setTimeout(() => {
      setTitle(post.title);
      setContent(post.content);
      setTags(post.tags || []);
    }, 0);
    return () => clearTimeout(id);
  }, [post]);

  const stats = useMemo(() => ({
    words: content.trim() ? content.trim().split(/\s+/).length : 0,
    chars: content.length,
    readTime: Math.max(1, Math.ceil(content.length / 1000))
  }), [content]);

  const handleTagInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();

      // maximum of 10
      if (tags.length >= 10) {
        setErrors({ tags: 'Maximum tag allowed is 10' });
        return;
      }

      const tag = currentTag.trim().replace(/,/g, '');

      // prevent tags with 20 or more texts
      if (tag.length > 20) {
        setErrors({ tags: "A tag can't be more than 20 words" });
        return;
      }

      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
        setCurrentTag('');
        setErrors(prev => ({ ...prev, tags: null }));
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!title.trim() || !content.trim()) {
      setErrors({ general: 'Both the title and the content fields are required!' });
      return;
    }

    if (tags.length === 0) {
      setErrors({ tags: 'Add at least one tag to categorize your insight' });
      return;
    }

    const payload = { title, content, tags };

    if (isEditMode) {
      updatePost({ id: post.id, payload }, {
        onSuccess: () => {
          notify.success('Article Updated', 'Your changes are now live.');
          navigate('/');
        },
        onError: (err) => setErrors(err.response?.data?.errors || { general: 'Failed to update' })
      });
    } else {
      createPost(payload, {
        onSuccess: () => {
          notify.success('Article Published', 'Your story has been shared with the world.');
          navigate('/');
        },
        onError: (err) => {
          setErrors(err.response?.data?.errors || { general: err.response?.data?.message || 'Failed to publish' })
          notify.error('Error', err.response?.data?.message || 'Failed to publish');
        }
      });
    }
  };

  if (isLoadingPost) return <PageLoader />;
  if (!isLoadingPost && !post && isEditMode) return <Navigate to="/" replace />;

  const isSubmitting = creatingPost || updatingPost;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100">
      {/* Editorial Header */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 h-20">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="group p-2 hover:bg-slate-50 rounded-xl transition-all"
            >
              <ArrowLeft size={20} className="text-slate-400 group-hover:text-slate-900 group-hover:-translate-x-1 transition-all" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 leading-none mb-1">
                Workspace
              </span>
              <span className="text-sm font-bold text-slate-900">
                {isEditMode ? 'Editing Story' : 'New Draft'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Saved to Cloud</span>
            </div>

            <button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="relative flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 group overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 className="animate-spin" size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span>{isEditMode ? 'Update' : 'Publish'}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-20">

          {/* Main Writing Area */}
          <div className="flex-1 max-w-3xl">
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-3 text-sm font-bold"
                >
                  <AlertCircle size={18} /> {errors.general}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-12">
              <textarea
                placeholder="The story title..."
                value={title}
                rows={1}
                onChange={(e) => {
                  setTitle(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                className="w-full text-5xl md:text-7xl font-black text-slate-900 placeholder:text-slate-100 outline-none border-none bg-transparent tracking-tighter resize-none leading-[1.1]"
              />

              <div className="flex items-center gap-6 text-slate-400 border-y border-slate-50 py-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <Type size={14} /> {stats.words} Words
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <Sparkles size={14} /> {stats.readTime} min read
                </div>
              </div>

              <textarea
                placeholder="Tell your story..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[600px] text-xl md:text-2xl text-slate-700 placeholder:text-slate-100 outline-none border-none bg-transparent resize-none leading-relaxed font-serif italic"
              />
            </div>
          </div>

          <aside className="lg:w-80">
            <div className="sticky top-32 space-y-8">

              <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-8">
                  <TagIcon size={14} /> Classification
                </div>

                <TagInput
                  tags={tags}
                  currentTag={currentTag}
                  setCurrentTag={setCurrentTag}
                  handleTagInput={handleTagInput}
                  removeTag={removeTag}
                  error={errors.tags}
                />
                
              </div>

              {/* Checklist Card */}
              <div className="px-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Article Checklist</h4>
                <ul className="space-y-4">
                  <CheckItem done={title.length > 10} text="Compelling Title" />
                  <CheckItem done={content.length > 200} text="Deep Content (200+ chars)" />
                  <CheckItem done={tags.length > 0} text="At least one tag" />
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function CheckItem({ done, text }) {
  return (
    <li className={`flex items-center gap-3 text-xs font-bold transition-all ${done ? 'text-slate-900' : 'text-slate-300'}`}>
      <div className={`transition-all ${done ? 'text-emerald-500 scale-110' : 'text-slate-200'}`}>
        {done ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
      </div>
      {text}
    </li>
  );
}