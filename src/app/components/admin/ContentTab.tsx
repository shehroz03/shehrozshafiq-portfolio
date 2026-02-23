import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, LayoutDashboard, Star, Info, RefreshCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { configAPI } from '../../lib/api';

export function ContentTab() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [config, setConfig] = useState<any>({
        stats: { experience: '', projects: '', clients: '', success: '' },
        hero: { title: '', subtitle: '', description: '' }
    });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            setIsLoading(true);
            const data = await configAPI.get();
            setConfig(data);
        } catch (e: any) {
            toast.error('Failed to load site config');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) return;

        try {
            setIsSaving(true);
            await configAPI.update(config, token);
            toast.success('Site content updated successfully!');
        } catch (e: any) {
            toast.error('Failed to update content', { description: e.message });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-sm text-gray-400">Loading content settings…</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Manage Site Content</h2>
                    <p className="text-sm text-gray-400">Update stats, hero text, and global settings</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white gap-2 rounded-xl shadow-lg shadow-blue-500/20"
                >
                    {isSaving ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hero Section Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                            <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-gray-900">Hero Section</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Hero Title</label>
                            <Input
                                value={config.hero.title}
                                onChange={e => setConfig({ ...config, hero: { ...config.hero, title: e.target.value } })}
                                className="bg-gray-50 border-gray-200"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Hero Subtitle</label>
                            <Input
                                value={config.hero.subtitle}
                                onChange={e => setConfig({ ...config, hero: { ...config.hero, subtitle: e.target.value } })}
                                className="bg-gray-50 border-gray-200"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Description</label>
                            <Textarea
                                value={config.hero.description}
                                onChange={e => setConfig({ ...config, hero: { ...config.hero, description: e.target.value } })}
                                className="bg-gray-50 border-gray-200 min-h-[120px] text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Section Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500">
                            <Star className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-gray-900">Portfolio Stats</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Experience</label>
                            <Input
                                value={config.stats.experience}
                                onChange={e => setConfig({ ...config, stats: { ...config.stats, experience: e.target.value } })}
                                placeholder="e.g. 3+"
                                className="bg-gray-50 border-gray-200"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Projects</label>
                            <Input
                                value={config.stats.projects}
                                onChange={e => setConfig({ ...config, stats: { ...config.stats, projects: e.target.value } })}
                                placeholder="e.g. 50+"
                                className="bg-gray-50 border-gray-200"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Happy Clients</label>
                            <Input
                                value={config.stats.clients}
                                onChange={e => setConfig({ ...config, stats: { ...config.stats, clients: e.target.value } })}
                                placeholder="e.g. 30+"
                                className="bg-gray-50 border-gray-200"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Success Rate</label>
                            <Input
                                value={config.stats.success}
                                onChange={e => setConfig({ ...config, stats: { ...config.stats, success: e.target.value } })}
                                placeholder="e.g. 100%"
                                className="bg-gray-50 border-gray-200"
                            />
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                        <p className="text-[11px] text-blue-700 leading-relaxed">
                            These stats are displayed on the home page. You can use numbers followed by '+' or '%' as needed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
