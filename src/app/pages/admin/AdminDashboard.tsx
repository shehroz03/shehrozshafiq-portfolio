import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  LayoutDashboard, FileText, LogOut, Plus, Edit, Trash2,
  ExternalLink, Github, X, Menu, User, Mail,
  Image as ImageIcon, UploadCloud, Settings, Star,
  ChevronDown, ChevronUp, Info, Layers,
  FileCode, Globe, Link as LinkIcon, Clock,
  ArrowLeft, Save, Eye, EyeOff,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { projectsAPI } from '../../lib/api';
import { ContactsTab } from '../../components/admin/ContactsTab';
import { ContentTab } from '../../components/admin/ContentTab';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: string | number;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  shortDescription: string;
  overview: string;
  context: string;        // "Problem / Context" — server field name
  solution: string[];     // "Solution & Features" — server field name
  impact: string[];
  role: string;
  timeline: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  status: 'draft' | 'published';
  featured: boolean;
  challenges?: string;
  projectStatus?: 'completed' | 'ongoing';
  location?: string;
  imageConfig?: { objectFit: 'cover' | 'contain'; cornerRadius: number; background: string };
  createdAt?: string;
  updatedAt?: string;
}

const EMPTY_FORM: Partial<Project> = {
  title: '', slug: '', tagline: '', category: 'Web App',
  shortDescription: '', overview: '', context: '', solution: [],
  impact: [], role: '', timeline: '', tech: [],
  image: '', liveUrl: '', githubUrl: '', caseStudyUrl: '',
  status: 'published', featured: false,
  imageConfig: { objectFit: 'cover', cornerRadius: 12, background: '#F3F4F6' },
};

const CATEGORIES = ['Web App', 'Mobile App', 'Dashboard', 'Scraping', 'Automation', 'Full-Stack App', 'Corporate Website', 'Other'];

const TECH_PRESETS = [
  'React', 'Next.js', 'Vue', 'TypeScript', 'JavaScript',
  'Node.js', 'Python', 'Django', 'FastAPI',
  'Flutter', 'React Native',
  'MongoDB', 'PostgreSQL', 'Firebase', 'Supabase', 'Redis',
  'Tailwind CSS', 'GraphQL', 'Docker', 'AWS',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const fmtDate = (iso?: string) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({
  id, label, hint, icon: Icon, iconBg, iconColor, collapsed, onToggle, children,
}: {
  id: string; label: string; hint: string; icon: any; iconBg: string; iconColor: string;
  collapsed: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50/60 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{label}</p>
            <p className="text-[11px] text-gray-400">{hint}</p>
          </div>
        </div>
        {collapsed ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronUp className="w-4 h-4 text-gray-400" />}
      </button>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="p-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-1.5">
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">{children}</label>
      {hint && <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p>}
    </div>
  );
}

function BulletListEditor({
  items, onAdd, onRemove, input, setInput, placeholder, chipColor,
}: {
  items: string[]; onAdd: () => void; onRemove: (i: string) => void;
  input: string; setInput: (v: string) => void; placeholder: string; chipColor: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
          className="bg-gray-50 border-gray-200 text-sm"
          placeholder={placeholder}
        />
        <Button type="button" onClick={onAdd} size="sm" className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white">Add</Button>
      </div>
      {items.length > 0 && (
        <ul className="space-y-1 mt-2">
          {items.map((item, i) => (
            <li key={i} className={`flex items-start gap-2 text-xs p-2 rounded-lg border ${chipColor}`}>
              <span className="flex-1 leading-relaxed">{item}</span>
              <button type="button" onClick={() => onRemove(item)} className="shrink-0 mt-0.5 text-red-400 hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Delete Confirmation Dialog ───────────────────────────────────────────────

function DeleteConfirm({ project, onCancel, onConfirm, isDeleting }: {
  project: Project; onCancel: () => void; onConfirm: () => void; isDeleting: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
      >
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 text-center mb-1">Delete Project?</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          "<span className="font-semibold text-gray-700">{project.title}</span>" will be permanently removed from your portfolio.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1 rounded-xl" disabled={isDeleting}>Cancel</Button>
          <Button onClick={onConfirm} disabled={isDeleting} className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white">
            {isDeleting ? 'Deleting…' : 'Yes, Delete'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Project Editor (full-page slide-in panel) ────────────────────────────────

function ProjectEditor({
  formData, setFormData, isNew, isSaving, isDeleting,
  onSave, onCancel, onDelete,
}: {
  formData: Partial<Project>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Project>>>;
  isNew: boolean; isSaving: boolean; isDeleting: boolean;
  onSave: () => void; onCancel: () => void; onDelete: () => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    basic: false, card: false, detail: true, links: true, media: false,
  });
  const toggle = (k: string) => setCollapsed(p => ({ ...p, [k]: !p[k] }));

  const [techInput, setTechInput] = useState('');
  const [solInput, setSolInput] = useState('');
  const [impactInput, setImpactInput] = useState('');
  const [imageSource, setImageSource] = useState<'url' | 'upload'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const set = (patch: Partial<Project>) => setFormData(p => ({ ...p, ...patch }));

  // Tech
  const addTech = (t?: string) => {
    const val = (t || techInput).trim();
    if (val && !formData.tech?.includes(val)) {
      set({ tech: [...(formData.tech || []), val] });
      if (!t) setTechInput('');
    }
  };
  const removeTech = (t: string) => set({ tech: formData.tech?.filter(x => x !== t) || [] });

  // Solution bullets
  const addSol = () => {
    if (solInput.trim()) {
      set({ solution: [...(formData.solution || []), solInput.trim()] });
      setSolInput('');
    }
  };
  const removeSol = (s: string) => set({ solution: formData.solution?.filter(x => x !== s) || [] });

  // Impact bullets
  const addImpact = () => {
    if (impactInput.trim()) {
      set({ impact: [...(formData.impact || []), impactInput.trim()] });
      setImpactInput('');
    }
  };
  const removeImpact = (s: string) => set({ impact: formData.impact?.filter(x => x !== s) || [] });

  // Image upload simulation
  const handleFileUpload = (file: File) => {
    if (file.size > 3 * 1024 * 1024) { toast.error('File too large (max 3 MB)'); return; }
    setIsUploading(true); setUploadProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 15; setUploadProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(iv);
        set({ image: URL.createObjectURL(file) });
        setIsUploading(false);
      }
    }, 80);
  };

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 280 }}
      className="fixed inset-0 z-50 flex flex-col bg-[#F7F8FA]"
    >
      {/* ── Top bar ── */}
      <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" onClick={onCancel} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">
              {isNew ? 'Add New Project' : 'Edit Project'}
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {isNew ? 'Fill in the details below' : `Editing: ${formData.title || 'Untitled'}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && (
            <Button
              type="button" variant="ghost" onClick={onDelete} disabled={isDeleting}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-2 text-sm rounded-xl"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          )}
          <Button variant="outline" onClick={onCancel} className="rounded-xl text-sm" disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={onSave} disabled={isSaving}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 gap-2"
          >
            {isSaving
              ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Saving…</>
              : <><Save className="w-4 h-4" /> {isNew ? 'Create Project' : 'Save Changes'}</>
            }
          </Button>
        </div>
      </div>

      {/* ── Body: two-column scroll ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-4">

            {/* 1. Basic Info */}
            <SectionCard id="basic" label="Basic Info" hint="Core identity • Shown everywhere"
              icon={Info} iconBg="bg-blue-100" iconColor="text-blue-600"
              collapsed={collapsed.basic} onToggle={() => toggle('basic')}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <FieldLabel hint="Required. Shown on cards and detail page">Project Title *</FieldLabel>
                  <Input
                    value={formData.title}
                    onChange={(e) => {
                      const t = e.target.value;
                      set({ title: t, slug: isNew ? generateSlug(t) : (formData.slug || '') });
                    }}
                    className="bg-gray-50 border-gray-200" placeholder="e.g. Social Vibing" />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel hint="Auto-generated from title, used in page URL">Slug</FieldLabel>
                  <Input value={formData.slug} onChange={(e) => set({ slug: e.target.value })}
                    className="bg-gray-50 border-gray-200 font-mono text-sm" placeholder="social-vibing" />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel hint="Required. One-liner shown under title on cards">Tagline *</FieldLabel>
                  <Input value={formData.tagline} onChange={(e) => set({ tagline: e.target.value })}
                    className="bg-gray-50 border-gray-200" placeholder="A social platform for connecting through vibe-based matching" />
                </div>
                <div>
                  <FieldLabel>Category</FieldLabel>
                  <select
                    value={formData.category}
                    onChange={(e) => set({ category: e.target.value })}
                    className="w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <FieldLabel>Visibility & Featured</FieldLabel>
                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => set({ status: formData.status === 'published' ? 'draft' : 'published' })}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold transition-all flex-1 justify-center ${formData.status === 'published' ? 'bg-green-100 border-green-200 text-green-700' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                    >
                      {formData.status === 'published' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {formData.status === 'published' ? 'Published' : 'Draft'}
                    </button>
                    <button
                      type="button"
                      onClick={() => set({ featured: !formData.featured })}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold transition-all flex-1 justify-center ${formData.featured ? 'bg-amber-100 border-amber-200 text-amber-700' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                    >
                      <Star className={`w-3.5 h-3.5 ${formData.featured ? 'fill-amber-500' : ''}`} />
                      {formData.featured ? 'Featured' : 'Not Featured'}
                    </button>
                  </div>
                </div>
                <div>
                  <FieldLabel hint="Current state of the project">Completion Status</FieldLabel>
                  <select
                    value={formData.projectStatus || 'completed'}
                    onChange={(e) => set({ projectStatus: e.target.value as any })}
                    className="w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing / Live</option>
                  </select>
                </div>
                <div>
                  <FieldLabel hint="Optional. e.g. Freelance, Upwork, Remote">Location / Context</FieldLabel>
                  <Input
                    value={formData.location || ''}
                    onChange={(e) => set({ location: e.target.value })}
                    className="bg-gray-50 border-gray-200" placeholder="e.g. Remote (Upwork)"
                  />
                </div>
              </div>
            </SectionCard>

            {/* 2. Card Content */}
            <SectionCard id="card" label="Card Content" hint="Shown only on project grid cards"
              icon={Layers} iconBg="bg-purple-100" iconColor="text-purple-600"
              collapsed={collapsed.card} onToggle={() => toggle('card')}
            >
              <div className="space-y-4">
                <div>
                  <FieldLabel hint="1–2 sentences max. Shown below tagline on cards">Short Description</FieldLabel>
                  <Textarea
                    value={formData.shortDescription}
                    onChange={(e) => set({ shortDescription: e.target.value })}
                    className="bg-gray-50 border-gray-200 min-h-[80px] text-sm"
                    placeholder="Brief summary for the project card grid…" />
                </div>
                <div>
                  <FieldLabel hint="Click a preset or type a custom tech and press Add">Tech Stack</FieldLabel>
                  {/* Preset chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {TECH_PRESETS.map(t => {
                      const active = formData.tech?.includes(t);
                      return (
                        <button
                          key={t} type="button"
                          onClick={() => active ? removeTech(t) : addTech(t)}
                          className={`text-[11px] px-2.5 py-1 rounded-full border font-medium transition-all ${active ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'}`}
                        >{t}</button>
                      );
                    })}
                  </div>
                  {/* Custom tech input */}
                  <div className="flex gap-2">
                    <Input value={techInput} onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                      className="bg-gray-50 border-gray-200 text-sm" placeholder="Add custom tech…" />
                    <Button type="button" onClick={() => addTech()} size="sm" className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white">Add</Button>
                  </div>
                  {/* Selected chips */}
                  {(formData.tech?.length ?? 0) > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {formData.tech?.map(t => (
                        <span key={t} className="flex items-center gap-1 text-[11px] bg-blue-500 text-white px-2.5 py-1 rounded-full font-medium">
                          {t} <button type="button" onClick={() => removeTech(t)}><X className="w-2.5 h-2.5" /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </SectionCard>

            {/* 4. Links */}
            <SectionCard id="links" label="Project Links" hint="Buttons shown on card and detail page"
              icon={Globe} iconBg="bg-green-100" iconColor="text-green-600"
              collapsed={collapsed.links} onToggle={() => toggle('links')}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel hint="Live demo URL">Live URL</FieldLabel>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <Input value={formData.liveUrl} onChange={(e) => set({ liveUrl: e.target.value })}
                      className="bg-gray-50 border-gray-200 pl-8 text-sm" placeholder="https://…" />
                  </div>
                </div>
                <div>
                  <FieldLabel hint="Source code repository">GitHub / Code URL</FieldLabel>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <Input value={formData.githubUrl} onChange={(e) => set({ githubUrl: e.target.value })}
                      className="bg-gray-50 border-gray-200 pl-8 text-sm" placeholder="https://github.com/…" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel hint="Optional — blog post, Notion doc, etc.">Case Study / Article URL</FieldLabel>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <Input value={formData.caseStudyUrl} onChange={(e) => set({ caseStudyUrl: e.target.value })}
                      className="bg-gray-50 border-gray-200 pl-8 text-sm" placeholder="https://…" />
                  </div>
                </div>
              </div>
            </SectionCard>

          </div>{/* end LEFT */}

          {/* ── RIGHT COLUMN ── */}
          <div className="space-y-4">

            {/* 3. Detail Page Content */}
            <SectionCard id="detail" label="Detail Page Content" hint="Full case study — shown on project detail page"
              icon={FileCode} iconBg="bg-orange-100" iconColor="text-orange-600"
              collapsed={collapsed.detail} onToggle={() => toggle('detail')}
            >
              <div className="space-y-5">
                <div>
                  <FieldLabel hint="2–3 sentences: problem → solution → result">Overview</FieldLabel>
                  <Textarea value={formData.overview} onChange={(e) => set({ overview: e.target.value })}
                    className="bg-gray-50 border-gray-200 min-h-[90px] text-sm"
                    placeholder="Brief, engaging summary of the entire project…" />
                </div>
                <div>
                  <FieldLabel hint="What pain point or gap existed before this project?">Problem / Context</FieldLabel>
                  <Textarea value={formData.context} onChange={(e) => set({ context: e.target.value })}
                    className="bg-gray-50 border-gray-200 min-h-[90px] text-sm"
                    placeholder="Describe the problem or context that motivated this project…" />
                </div>
                <div>
                  <FieldLabel hint="3–5 bullet points describing key features delivered">Solution & Key Features</FieldLabel>
                  <BulletListEditor
                    items={formData.solution || []} onAdd={addSol} onRemove={removeSol}
                    input={solInput} setInput={setSolInput}
                    placeholder="e.g. Real-time analytics dashboard"
                    chipColor="bg-blue-50/50 border-blue-100 text-blue-700"
                  />
                </div>
                <div>
                  <FieldLabel hint="1–3 bullets on measurable outcomes or results">Impact / Results</FieldLabel>
                  <BulletListEditor
                    items={formData.impact || []} onAdd={addImpact} onRemove={removeImpact}
                    input={impactInput} setInput={setImpactInput}
                    placeholder="e.g. Reduced processing time by 80%"
                    chipColor="bg-green-50/50 border-green-100 text-green-700"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel hint="Your role on this project">Role</FieldLabel>
                    <Input value={formData.role} onChange={(e) => set({ role: e.target.value })}
                      className="bg-gray-50 border-gray-200 text-sm" placeholder="e.g. Full-Stack Developer" />
                  </div>
                  <div>
                    <FieldLabel hint="Duration and period">Timeline</FieldLabel>
                    <Input value={formData.timeline} onChange={(e) => set({ timeline: e.target.value })}
                      className="bg-gray-50 border-gray-200 text-sm" placeholder="e.g. Nov–Dec 2024 · 2 months" />
                  </div>
                </div>
                <div>
                  <FieldLabel hint="Optional — shown at the bottom of the detail page">Challenges & Learnings</FieldLabel>
                  <Textarea value={formData.challenges} onChange={(e) => set({ challenges: e.target.value })}
                    className="bg-gray-50 border-gray-200 min-h-[80px] text-sm"
                    placeholder="What was hard? What did you learn?" />
                </div>
              </div>
            </SectionCard>

            {/* 5. Image & Media */}
            <SectionCard id="media" label="Image & Media" hint="Used on cards and detail page hero"
              icon={ImageIcon} iconBg="bg-pink-100" iconColor="text-pink-600"
              collapsed={collapsed.media} onToggle={() => toggle('media')}
            >
              <div className="space-y-4">
                {/* Source toggle */}
                <div className="flex bg-gray-100 p-1 rounded-lg w-fit gap-1">
                  {(['upload', 'url'] as const).map(src => (
                    <button key={src} type="button" onClick={() => setImageSource(src)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all capitalize ${imageSource === src ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      {src === 'upload' ? '📁 Upload' : '🔗 URL'}
                    </button>
                  ))}
                </div>

                {imageSource === 'url' ? (
                  <div>
                    <FieldLabel hint="Paste a direct image URL">Image URL</FieldLabel>
                    <Input value={formData.image} onChange={(e) => set({ image: e.target.value })}
                      className="bg-gray-50 border-gray-200 text-sm" placeholder="https://…" />
                  </div>
                ) : (
                  <div>
                    <input ref={fileRef} type="file" className="hidden" accept="image/*"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }} />
                    {!formData.image ? (
                      <div
                        onClick={() => fileRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFileUpload(f); }}
                        className="aspect-video rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all"
                      >
                        {isUploading ? (
                          <div className="text-center space-y-3 w-48">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
                            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} className="bg-blue-500 h-full rounded-full" />
                            </div>
                            <p className="text-xs font-bold text-blue-600">Uploading {uploadProgress}%</p>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="w-10 h-10 text-blue-400" />
                            <div className="text-center">
                              <p className="text-sm font-bold text-gray-700">Click to upload or drag & drop</p>
                              <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WebP · max 3 MB · 1600×900 recommended</p>
                            </div>
                          </>
                        )}
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Preview */}
                {formData.image && (
                  <div className="space-y-3">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-100 group">
                      <img src={formData.image} alt="Preview"
                        className={`w-full h-full ${formData.imageConfig?.objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                        style={{ backgroundColor: formData.imageConfig?.background, borderRadius: `${formData.imageConfig?.cornerRadius || 0}px` }} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button type="button" size="sm" variant="secondary" className="h-8 rounded-lg text-xs"
                          onClick={() => imageSource === 'upload' ? fileRef.current?.click() : (() => { const u = prompt('New URL:', formData.image); if (u) set({ image: u }); })()}>
                          Change
                        </Button>
                        <Button type="button" size="sm" className="h-8 rounded-lg text-xs bg-red-500/80 hover:bg-red-600 text-white"
                          onClick={() => set({ image: '' })}>Remove</Button>
                      </div>
                    </div>
                    {/* Image settings */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Settings className="w-3 h-3" /> Object Fit</label>
                        <select value={formData.imageConfig?.objectFit}
                          onChange={(e) => set({ imageConfig: { ...formData.imageConfig!, objectFit: e.target.value as any } })}
                          className="w-full text-xs bg-white border border-gray-200 rounded-md py-1 px-2 focus:ring-2 focus:ring-blue-500/20 focus:outline-none">
                          <option value="cover">Cover (fill)</option>
                          <option value="contain">Contain (fit)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Corner Radius: {formData.imageConfig?.cornerRadius}px</label>
                        <input type="range" min="0" max="24" value={formData.imageConfig?.cornerRadius}
                          onChange={(e) => set({ imageConfig: { ...formData.imageConfig!, cornerRadius: +e.target.value } })}
                          className="w-full accent-blue-600 cursor-pointer" />
                      </div>
                      <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Background Fill</label>
                        <div className="flex items-center gap-2">
                          <input type="color" value={formData.imageConfig?.background}
                            onChange={(e) => set({ imageConfig: { ...formData.imageConfig!, background: e.target.value } })}
                            className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0.5 bg-white" />
                          <span className="font-mono text-[11px] text-gray-500">{formData.imageConfig?.background}</span>
                          <div className="flex gap-1 ml-auto">
                            {['#F3F4F6', '#FFFFFF', '#0F172A', '#3B82F6'].map(c => (
                              <button key={c} type="button" title={c}
                                onClick={() => set({ imageConfig: { ...formData.imageConfig!, background: c } })}
                                className="w-5 h-5 rounded-full border border-gray-200 shadow-sm"
                                style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hint */}
                <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3" /> This image is used on project cards and as the hero banner on the detail page.
                </p>
              </div>
            </SectionCard>

          </div>{/* end RIGHT */}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main AdminDashboard Component ────────────────────────────────────────────

export function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editorOpen, setEditorOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>(EMPTY_FORM);

  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) { toast.error('Please login'); navigate('/admin'); return; }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (e: any) {
      toast.error('Failed to load projects', { description: e.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    toast.success('Logged out');
    navigate('/admin');
  };

  const openNew = () => {
    setFormData({ ...EMPTY_FORM, solution: [], impact: [], tech: [] });
    setIsNew(true);
    setEditingProject(null);
    setEditorOpen(true);
  };

  const openEdit = (p: Project) => {
    setFormData({ ...p, imageConfig: p.imageConfig || EMPTY_FORM.imageConfig });
    setIsNew(false);
    setEditingProject(p);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setFormData({ ...EMPTY_FORM, solution: [], impact: [], tech: [] });
    setEditingProject(null);
  };

  const handleSave = async () => {
    if (!formData.title?.trim()) { toast.error('Project title is required'); return; }
    if (!formData.tagline?.trim()) { toast.error('Tagline is required'); return; }
    const token = localStorage.getItem('auth_token');
    if (!token) { toast.error('Session expired'); navigate('/admin'); return; }
    try {
      setIsSaving(true);
      if (isNew) {
        const created = await projectsAPI.create(formData, token);
        setProjects(p => [created, ...p]);
        toast.success('Project created!');
      } else if (editingProject) {
        const updated = await projectsAPI.update(editingProject.id, formData, token);
        setProjects(p => p.map(x => x.id === editingProject.id ? updated : x));
        toast.success('Project saved!');
      }
      closeEditor();
    } catch (e: any) {
      toast.error('Save failed', { description: e.message });
      if (e.message?.includes('Unauthorized')) { localStorage.removeItem('auth_token'); navigate('/admin'); }
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = (p: Project) => { setDeleteTarget(p); };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const token = localStorage.getItem('auth_token');
    if (!token) { toast.error('Session expired'); navigate('/admin'); return; }
    try {
      setIsDeleting(true);
      await projectsAPI.delete(deleteTarget.id, token);
      setProjects(p => p.filter(x => x.id !== deleteTarget.id));
      toast.success('Project deleted');
      setDeleteTarget(null);
      if (editorOpen) closeEditor();
    } catch (e: any) {
      toast.error('Delete failed', { description: e.message });
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Sidebar ──────────────────────────────────────────────────────────────────

  const navItems = [
    { id: 'projects', icon: FileText, label: 'Projects' },
    { id: 'contacts', icon: Mail, label: 'Contacts' },
    { id: 'content', icon: LayoutDashboard, label: 'Content' },
  ];

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 lg:translate-x-0 lg:static lg:flex-shrink-0 flex flex-col"
      >
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Admin Panel</p>
              <p className="text-[10px] text-gray-400">Portfolio Manager</p>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1 flex-1">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${activeTab === id ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
              <Icon className="w-4 h-4" />
              {label}
              {id === 'projects' && projects.length > 0 && (
                <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{projects.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden" />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                <p className="text-xs text-gray-400">Manage your portfolio {activeTab}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {localStorage.getItem('user_email')?.split('@')[0] || 'Admin'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-6">

          {/* ── Projects Tab ── */}
          {activeTab === 'projects' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">All Projects</h2>
                  <p className="text-sm text-gray-400">{projects.length} project{projects.length !== 1 ? 's' : ''} in your portfolio</p>
                </div>
                <Button onClick={openNew}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white gap-2 rounded-xl shadow-lg shadow-blue-500/20">
                  <Plus className="w-4 h-4" /> Add Project
                </Button>
              </div>

              {isLoading ? (
                <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Loading projects…</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">No projects yet</h3>
                  <p className="text-sm text-gray-400 mb-5">Start by adding your first portfolio project</p>
                  <Button onClick={openNew} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white gap-2 rounded-xl">
                    <Plus className="w-4 h-4" /> Add Project
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Table header */}
                  <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
                    {['Project', 'Tagline', 'Category', 'Status', 'Featured', 'Updated', ''].map((h, i) => (
                      <div key={i} className={`text-[10px] font-bold text-gray-400 uppercase tracking-wider ${i === 6 ? 'text-right' : ''}`}>{h}</div>
                    ))}
                  </div>
                  {/* Rows */}
                  <div className="divide-y divide-gray-50">
                    {projects.map((project, idx) => (
                      <motion.div key={project.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => openEdit(project)}
                        className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 hover:bg-blue-50/30 cursor-pointer transition-colors group"
                      >
                        {/* Project (image + title + slug) */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                            <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 text-sm truncate">{project.title}</div>
                            <div className="text-[10px] text-gray-400 font-mono truncate">{project.slug}</div>
                          </div>
                        </div>
                        {/* Tagline */}
                        <div className="text-sm text-gray-500 line-clamp-1 hidden md:block">{project.tagline || <span className="italic text-gray-300">No tagline</span>}</div>
                        {/* Category */}
                        <div className="hidden md:block">
                          <Badge variant="outline" className="text-[10px] border-blue-100 text-blue-600 bg-blue-50 font-medium">{project.category || '—'}</Badge>
                        </div>
                        {/* Status */}
                        <div className="hidden md:block">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`} />
                            {project.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        {/* Featured */}
                        <div className="hidden md:flex items-center">
                          {project.featured
                            ? <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            : <Star className="w-4 h-4 text-gray-200" />}
                        </div>
                        {/* Updated */}
                        <div className="hidden md:flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock className="w-3 h-3" />
                          {fmtDate(project.updatedAt || project.createdAt)}
                        </div>
                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button type="button" onClick={(e) => { e.stopPropagation(); openEdit(project); }}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-100 text-blue-600 transition-colors">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" onClick={(e) => { e.stopPropagation(); confirmDelete(project); }}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-100 text-red-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contacts' && <ContactsTab />}

          {activeTab === 'content' && <ContentTab />}

        </main>
      </div>

      {/* ── Full-page Editor (slide in from right) ── */}
      <AnimatePresence>
        {editorOpen && (
          <ProjectEditor
            formData={formData}
            setFormData={setFormData}
            isNew={isNew}
            isSaving={isSaving}
            isDeleting={isDeleting}
            onSave={handleSave}
            onCancel={closeEditor}
            onDelete={() => editingProject && confirmDelete(editingProject)}
          />
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation ── */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirm
            project={deleteTarget}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>

    </div>
  );
}