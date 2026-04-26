import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Mail, Lock, Phone, Check } from 'lucide-react';
import { AccountData } from '../types';

interface CreateAccountPageProps {
  setCurrentView: (view: 'home' | 'about' | 'checkout' | 'journal' | 'create-account') => void;
  accountData: AccountData;
  setAccountData: (data: AccountData) => void;
  handleCreateAccount: () => void;
}

export default function CreateAccountPage({
  setCurrentView,
  accountData,
  setAccountData,
  handleCreateAccount
}: CreateAccountPageProps) {
  const handleInputChange = (field: keyof AccountData, value: string | boolean) => {
    setAccountData({ ...accountData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!accountData.firstName || !accountData.lastName || !accountData.email || 
        !accountData.password || !accountData.confirmPassword) {
      alert('Please fill in all required fields');
      return;
    }

    if (accountData.password !== accountData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (accountData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    if (!accountData.acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    handleCreateAccount();
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 min-h-[60vh] sm:min-h-[70vh]"
    >
      <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-16">
        <button 
          onClick={() => setCurrentView('home')}
          className="p-3 sm:p-4 bg-brand-muted rounded-full hover:bg-brand-ink hover:text-white transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft size={18} sm:size={20} />
        </button>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif italic tracking-tight">
          Create Account
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Form Section */}
        <div className="space-y-6 sm:space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/60 flex items-center gap-2">
                  <User size={12} sm:size={14} />
                  FIRST NAME
                </label>
                <input 
                  type="text"
                  placeholder="John"
                  className="w-full bg-brand-muted/40 p-4 sm:p-6 text-sm sm:text-base outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                  value={accountData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/60">
                  LAST NAME
                </label>
                <input 
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-brand-muted/40 p-4 sm:p-6 text-sm sm:text-base outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                  value={accountData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/60 flex items-center gap-2">
                <Mail size={12} sm:size={14} />
                EMAIL ADDRESS
              </label>
              <input 
                type="email"
                placeholder="john.doe@example.com"
                className="w-full bg-brand-muted/40 p-4 sm:p-6 text-sm sm:text-base outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                value={accountData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/60 flex items-center gap-2">
                <Phone size={12} sm:size={14} />
                PHONE (OPTIONAL)
              </label>
              <input 
                type="tel"
                placeholder="+33 1 23 45 67 89"
                className="w-full bg-brand-muted/40 p-4 sm:p-6 text-sm sm:text-base outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                value={accountData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>

            {/* Password Fields */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <label className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/60 flex items-center gap-2">
                  <Lock size={12} sm:size={14} />
                  PASSWORD
                </label>
                <input 
                  type="password"
                  placeholder="Min. 8 characters"
                  className="w-full bg-brand-muted/40 p-4 sm:p-6 text-sm sm:text-base outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                  value={accountData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/60">
                  CONFIRM PASSWORD
                </label>
                <input 
                  type="password"
                  placeholder="Re-enter password"
                  className="w-full bg-brand-muted/40 p-4 sm:p-6 text-sm sm:text-base outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                  value={accountData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  minLength={8}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-brand-accent bg-brand-muted border-brand-ink/20 rounded focus:ring-brand-accent focus:ring-2"
                  checked={accountData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  required
                />
                <span className="text-[11px] sm:text-[12px] leading-relaxed opacity-70">
                  I accept the Terms of Service and Privacy Policy
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-brand-accent bg-brand-muted border-brand-ink/20 rounded focus:ring-brand-accent focus:ring-2"
                  checked={accountData.subscribeNewsletter}
                  onChange={(e) => handleInputChange('subscribeNewsletter', e.target.checked)}
                />
                <span className="text-[11px] sm:text-[12px] leading-relaxed opacity-70">
                  Subscribe to our newsletter for exclusive offers and new arrivals
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-brand-ink text-brand-bg py-4 sm:py-6 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-black hover:bg-brand-accent hover:text-brand-bg transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 active:scale-95 min-h-[48px] sm:min-h-[56px]"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="space-y-8 sm:space-y-12">
          <div className="bg-brand-muted/30 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif italic tracking-tight mb-6 sm:mb-8">
              Join LUXE Paris
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check size={14} sm:size={18} className="text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium mb-2">Exclusive Access</h3>
                  <p className="text-[11px] sm:text-[12px] opacity-70 leading-relaxed">
                    Early access to new collections and limited edition pieces before anyone else.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check size={14} sm:size={18} className="text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium mb-2">Member Benefits</h3>
                  <p className="text-[11px] sm:text-[12px] opacity-70 leading-relaxed">
                    Enjoy complimentary shipping, birthday rewards, and personalized recommendations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check size={14} sm:size={18} className="text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium mb-2">Priority Support</h3>
                  <p className="text-[11px] sm:text-[12px] opacity-70 leading-relaxed">
                    Dedicated customer service and priority assistance for all your inquiries.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-[11px] sm:text-[12px] opacity-50">
              Already have an account?
            </p>
            <button 
              onClick={() => setCurrentView('home')}
              className="text-brand-accent text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] hover:underline"
            >
              Sign In Instead
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
