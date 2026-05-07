import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signup(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-surface border border-border rounded-3xl p-10 shadow-2xl w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-xl shadow-primary/20">H</div>
          <h1 className="text-3xl font-black text-text-primary mb-2 tracking-tight">Get Started</h1>
          <p className="text-text-secondary font-medium">Create your <span className="text-primary font-bold">HavticHQ</span> account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-tight"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors">
                <User className="w-full h-full" />
              </div>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 pl-12 focus:border-primary focus:bg-white focus:outline-none transition-all text-sm font-bold text-text-primary shadow-inner" 
                placeholder="John Doe" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors">
                <Mail className="w-full h-full" />
              </div>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 pl-12 focus:border-primary focus:bg-white focus:outline-none transition-all text-sm font-bold text-text-primary shadow-inner" 
                placeholder="name@company.com" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors">
                <Lock className="w-full h-full" />
              </div>
              <input 
                type="password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className="w-full bg-slate-50 border border-border rounded-xl px-4 py-3 pl-12 focus:border-primary focus:bg-white focus:outline-none transition-all text-sm font-bold text-text-primary shadow-inner" 
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </div>
        </form>

        <div className="mt-10 pt-8 border-t border-border text-center">
          <p className="text-text-secondary text-xs font-bold uppercase tracking-tight">
            Already have an account? <Link to="/login" className="text-primary hover:underline ml-1">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
