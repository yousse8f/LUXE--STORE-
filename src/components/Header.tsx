import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isScrolled: boolean;
  setIsMenuOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsProfileOpen: (open: boolean) => void;
  cartLength: number;
}

export default function Header({
  currentView,
  setCurrentView,
  isScrolled,
  setIsMenuOpen,
  setIsSearchOpen,
  setIsProfileOpen,
  cartLength
}: HeaderProps) {
  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-brand-accent text-brand-bg text-[10px] uppercase tracking-[0.2em] py-2.5 text-center font-medium">
        Free International Shipping on Curated Collections over $250
      </div>

      {/* Navigation */}
      <header className={`glass-header transition-all duration-500 ${isScrolled ? 'py-4 shadow-sm' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-brand-ink/5 rounded-full transition-colors z-10"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              <button onClick={() => setCurrentView('home')} className="nav-link text-xs sm:text-[11px]">Shop</button>
              <button onClick={() => setCurrentView('about')} className="nav-link text-xs sm:text-[11px]">About</button>
              <button onClick={() => setCurrentView('journal')} className="nav-link text-xs sm:text-[11px]">Journal</button>
            </nav>
          </div>

          <button 
            onClick={() => setCurrentView('home')} 
            className="text-2xl sm:text-3xl font-serif italic tracking-tight font-light px-2 sm:px-4 shrink-0 hover:text-brand-accent transition-colors"
          >
            LUXE
          </button>

          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Search"
            >
              <Search size={18} sm:size={20} className="opacity-70" />
            </button>
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Profile"
            >
              <User size={18} sm:size={20} className="opacity-70" />
            </button>
            <button 
              onClick={() => setCurrentView('checkout')}
              className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={18} sm:size={20} className="opacity-70" />
              {cartLength > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
