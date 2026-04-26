import { motion, AnimatePresence } from 'motion/react';
import { X, User } from 'lucide-react';
import { View } from '../types';

interface ModalsProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCurrentView: (view: View) => void;
}

export default function Modals({
  isMenuOpen,
  setIsMenuOpen,
  isSearchOpen,
  setIsSearchOpen,
  isProfileOpen,
  setIsProfileOpen,
  searchQuery,
  setSearchQuery,
  setCurrentView
}: ModalsProps) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-brand-bg/98 flex flex-col items-center justify-center gap-12"
        >
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 p-4 bg-brand-ink/5 rounded-full"><X size={24} /></button>
          <nav className="flex flex-col items-center gap-8 text-4xl font-serif italic">
            <button onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="hover:text-brand-accent transition-colors">Our Store</button>
            <button onClick={() => { setCurrentView('about'); setIsMenuOpen(false); }} className="hover:text-brand-accent transition-colors">About Us</button>
            <button onClick={() => { setCurrentView('journal'); setIsMenuOpen(false); }} className="hover:text-brand-accent transition-colors">Journal</button>
            <button onClick={() => { setCurrentView('checkout'); setIsMenuOpen(false); }} className="hover:text-brand-accent transition-colors">View Cart</button>
          </nav>
        </motion.div>
      )}

      {isSearchOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-brand-ink/20 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-brand-bg rounded-2xl shadow-2xl border border-brand-ink/5 max-w-md w-full mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-serif italic">Search</h3>
                <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-brand-muted/20 rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="flex gap-2 mb-4">
                <input 
                  autoFocus
                  placeholder="Search products..."
                  className="flex-grow bg-brand-muted/20 border border-brand-ink/10 rounded-lg px-3 py-2 text-base outline-none focus:border-brand-accent transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setIsSearchOpen(false);
                      // Here you would typically trigger the actual search
                    }
                  }}
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="bg-brand-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-accent/90 transition-colors"
                >
                  Search
                </button>
              </div>
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/40 mb-3">Quick Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {['Apparel', 'Accessories', 'Fragrance', 'Jewelry'].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => { setSearchQuery(cat); setIsSearchOpen(false); }}
                      className="px-3 py-1 rounded-md border border-brand-ink/10 hover:border-brand-accent hover:text-brand-accent transition-all text-xs font-medium bg-brand-muted/10"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {isProfileOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
          className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[100] bg-brand-bg shadow-2xl p-12 flex flex-col"
        >
          <button onClick={() => setIsProfileOpen(false)} className="self-end p-2 mb-12"><X size={24} /></button>
          <div className="text-center">
            <div className="w-24 h-24 bg-brand-muted rounded-full mx-auto mb-6 flex items-center justify-center">
              <User size={40} className="text-brand-ink/40" />
            </div>
            <h2 className="text-2xl font-serif italic mb-2 tracking-tight">Welcome back</h2>
            <p className="text-sm text-brand-ink/50 mb-12">Sign in to manage your orders and preferences.</p>
            <div className="space-y-4">
              <input placeholder="EMAIL ADDRESS" className="w-full bg-brand-muted/40 p-4 text-[10px] tracking-widest font-bold outline-none border border-brand-ink/5 focus:border-brand-accent" />
              <input type="password" placeholder="PASSWORD" className="w-full bg-brand-muted/40 p-4 text-[10px] tracking-widest font-bold outline-none border border-brand-ink/5 focus:border-brand-accent" />
              <button className="w-full btn-premium py-5">Sign In</button>
            </div>
            <div className="mt-8 pt-8 border-t border-brand-ink/5">
              <button 
                onClick={() => { setCurrentView('create-account'); setIsProfileOpen(false); }}
                className="text-[10px] uppercase tracking-widest font-bold text-brand-accent hover:underline"
              >
                Create Account
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
