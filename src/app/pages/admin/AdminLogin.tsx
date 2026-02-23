import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { authAPI } from '../../lib/api';

export function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { access_token, user } = await authAPI.signin(formData.email, formData.password);
      
      // Store auth token in localStorage
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user_email', user.email);
      
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Invalid credentials', {
        description: error.message || 'Please check your email and password.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Back button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-[#6B7280] hover:text-[#2E2E2E] transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Portfolio
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/50"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 mx-auto"
          >
            <Lock className="w-8 h-8" />
          </motion.div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Admin Dashboard</h1>
            <p className="text-[#6B7280]">Sign in to manage your portfolio</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#2E2E2E]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="pl-11 bg-[#F7F7F7] border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#2E2E2E]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="pl-11 bg-[#F7F7F7] border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              size="lg"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-200/50"
          >
            <p className="text-xs text-[#6B7280] mb-2 font-medium">Setup Instructions:</p>
            <div className="text-xs space-y-1 text-[#2E2E2E]">
              <p>1. Create an admin user via Supabase Dashboard</p>
              <p>2. Go to Authentication → Users → Add User</p>
              <p>3. Use that email/password to login here</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}