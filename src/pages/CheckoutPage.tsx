import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Trash2, Plus, Minus, CheckCircle, CreditCard, Shield, ShoppingBag } from 'lucide-react';
import { CartItem, CheckoutStep, ShippingData, PaymentData } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  checkoutStep: CheckoutStep;
  setCheckoutStep: (step: CheckoutStep) => void;
  shippingData: ShippingData;
  setShippingData: (data: ShippingData) => void;
  paymentData: PaymentData;
  setPaymentData: (data: PaymentData) => void;
  handleCheckoutAction: () => void;
  setCurrentView: (view: 'home' | 'about' | 'checkout') => void;
}

export default function CheckoutPage({
  cart,
  updateQuantity,
  checkoutStep,
  setCheckoutStep,
  shippingData,
  setShippingData,
  paymentData,
  setPaymentData,
  handleCheckoutAction,
  setCurrentView
}: CheckoutPageProps) {
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleBack = () => {
    if (checkoutStep === 'bag') setCurrentView('home');
    else if (checkoutStep === 'shipping') setCheckoutStep('bag');
    else if (checkoutStep === 'payment') setCheckoutStep('shipping');
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 min-h-[60vh] sm:min-h-[70vh]">
      {checkoutStep !== 'success' && (
        <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-16">
          <button 
            onClick={handleBack}
            className="p-3 sm:p-4 bg-brand-muted rounded-full hover:bg-brand-ink hover:text-white transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft size={18} sm:size={20} />
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif italic tracking-tight">
            {checkoutStep === 'bag' ? 'Your Selection' : checkoutStep === 'shipping' ? 'Shipping Details' : 'Secure Payment'}
          </h1>
        </div>
      )}

      {checkoutStep === 'success' ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16 sm:py-24 lg:py-32 space-y-6 sm:space-y-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-brand-accent/10 rounded-full mx-auto flex items-center justify-center text-brand-accent">
            <CheckCircle size={48} sm:size={64} lg:size={80} strokeWidth={1} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif italic tracking-tight px-4">Thank you for your order.</h2>
          <p className="text-brand-ink/50 max-w-md mx-auto text-sm sm:text-base lg:text-lg px-4">A confirmation email has been sent to your address. We are preparing your selection with care.</p>
          <button onClick={() => { setCurrentView('home'); setCheckoutStep('bag'); }} className="btn-premium min-h-[44px] px-6 sm:px-8">Continue Exploring</button>
        </motion.div>
      ) : cart.length === 0 && checkoutStep === 'bag' ? (
        <div className="text-center py-16 sm:py-24 lg:py-32 space-y-6 sm:space-y-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-brand-muted rounded-full mx-auto flex items-center justify-center text-brand-ink/20">
            <ShoppingBag size={32} sm:size={40} lg:size={48} />
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl font-serif italic opacity-40 tracking-tight px-4">Your bag is currently empty.</p>
          <button onClick={() => setCurrentView('home')} className="btn-premium min-h-[44px] px-6 sm:px-8">Return to Store</button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {checkoutStep === 'bag' && (
                <motion.div key="bag" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4 sm:space-y-6 lg:space-y-8">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 bg-brand-muted/30 rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] items-center group">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                        <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                      </div>
                      <div className="flex-1 space-y-1 sm:space-y-2">
                        <span className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-brand-ink/30">{item.product.category}</span>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-serif italic tracking-tight line-clamp-2">{item.product.name}</h3>
                        <p className="text-base sm:text-lg font-medium">${item.product.price}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between sm:justify-end">
                        <div className="flex items-center gap-4 sm:gap-6 bg-brand-bg rounded-full px-3 sm:px-4 py-2 shadow-sm">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 hover:text-brand-accent min-w-[32px] min-h-[32px] flex items-center justify-center"><Minus size={14} sm:size={16} /></button>
                          <span className="w-6 sm:w-8 text-center font-bold text-sm tabular-nums">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 hover:text-brand-accent min-w-[32px] min-h-[32px] flex items-center justify-center"><Plus size={14} sm:size={16} /></button>
                        </div>
                        <button onClick={() => updateQuantity(item.product.id, -item.quantity)} className="p-2 sm:p-3 text-brand-ink/20 hover:text-red-500 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                          <Trash2 size={16} sm:size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {checkoutStep === 'shipping' && (
                <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6 sm:space-y-8 lg:space-y-12">
                  <div className="grid gap-4 sm:gap-6">
                    <input 
                      placeholder="FULL NAME" 
                      className="w-full bg-brand-muted/40 p-4 sm:p-6 text-[8px] sm:text-[10px] tracking-widest font-bold outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                      value={shippingData.name}
                      onChange={e => setShippingData({ ...shippingData, name: e.target.value })}
                    />
                    <input 
                      placeholder="SHIPPING ADDRESS" 
                      className="w-full bg-brand-muted/40 p-4 sm:p-6 text-[8px] sm:text-[10px] tracking-widest font-bold outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                      value={shippingData.address}
                      onChange={e => setShippingData({ ...shippingData, address: e.target.value })}
                    />
                    <input 
                      placeholder="CITY" 
                      className="w-full bg-brand-muted/40 p-4 sm:p-6 text-[8px] sm:text-[10px] tracking-widest font-bold outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                      value={shippingData.city}
                      onChange={e => setShippingData({ ...shippingData, city: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}

              {checkoutStep === 'payment' && (
                <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6 sm:space-y-8 lg:space-y-12">
                  <div className="grid gap-4 sm:gap-6">
                    <div className="p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-brand-ink to-brand-accent text-white rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white/5 rounded-full -mr-16 -mt-16 sm:-mr-24 sm:-mt-24 lg:-mr-32 lg:-mt-32 blur-2xl sm:blur-3xl group-hover:bg-white/10 transition-colors" />
                      <CreditCard className="mb-6 sm:mb-12 opacity-50" size={24} sm:size={32} lg:size={40} />
                      <div className="space-y-4 sm:space-y-6">
                        <div className="text-lg sm:text-xl lg:text-2xl font-mono tracking-[0.3em] h-6 sm:h-8">{paymentData.number || '•••• •••• •••• ••••'}</div>
                        <div className="flex justify-between items-end">
                          <div className="space-y-1">
                            <div className="text-[6px] sm:text-[8px] uppercase tracking-widest opacity-50">Card Holder</div>
                            <div className="text-xs sm:text-sm font-bold tracking-widest uppercase">{shippingData.name || 'YOUR NAME'}</div>
                          </div>
                          <div className="space-y-1 text-right">
                            <div className="text-[6px] sm:text-[8px] uppercase tracking-widest opacity-50">Expires</div>
                            <div className="text-xs sm:text-sm font-bold tracking-widest">{paymentData.expiry || 'MM/YY'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input 
                      placeholder="CARD NUMBER" 
                      className="w-full bg-brand-muted/40 p-4 sm:p-6 text-[8px] sm:text-[10px] tracking-widest font-bold outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                      maxLength={19}
                      value={paymentData.number}
                      onChange={e => setPaymentData({ ...paymentData, number: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-3 sm:gap-6">
                      <input 
                        placeholder="EXPIRY (MM/YY)" 
                        className="w-full bg-brand-muted/40 p-4 sm:p-6 text-[8px] sm:text-[10px] tracking-widest font-bold outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                        value={paymentData.expiry}
                        onChange={e => setPaymentData({ ...paymentData, expiry: e.target.value })}
                      />
                      <input 
                        placeholder="CVV" 
                        className="w-full bg-brand-muted/40 p-4 sm:p-6 text-[8px] sm:text-[10px] tracking-widest font-bold outline-none border border-brand-ink/5 rounded-xl sm:rounded-2xl focus:border-brand-accent min-h-[48px]"
                        value={paymentData.cvv}
                        onChange={e => setPaymentData({ ...paymentData, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-brand-ink text-brand-bg p-6 sm:p-8 lg:p-10 rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] sticky top-24 sm:top-32 shadow-2xl space-y-6 sm:space-y-8 lg:space-y-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif italic tracking-tight border-b border-brand-bg/10 pb-4 sm:pb-6 uppercase font-light">Summary</h2>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm font-medium tracking-wide">
                <div className="flex justify-between opacity-60"><span>Subtotal</span><span>${cartTotal}</span></div>
                <div className="flex justify-between opacity-60"><span>Shipping</span><span>Free</span></div>
                <div className="flex justify-between opacity-60"><span>Tax</span><span>$0.00</span></div>
                <div className="pt-4 sm:pt-6 border-t border-brand-bg/10 flex justify-between text-lg sm:text-xl lg:text-2xl font-serif italic">
                  <span>Total Due</span><span>${cartTotal}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckoutAction}
                disabled={cart.length === 0}
                className="w-full bg-brand-bg text-brand-ink py-4 sm:py-6 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-black hover:bg-brand-accent hover:text-brand-bg transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] sm:min-h-[56px]"
              >
                {checkoutStep === 'bag' ? 'Checkout' : checkoutStep === 'shipping' ? 'Continue to Payment' : 'Complete Purchase'}
              </button>
              <div className="flex justify-center gap-3 sm:gap-4 opacity-30">
                <Shield size={14} sm:size={16} /><CheckCircle size={14} sm:size={16} /><CreditCard size={14} sm:size={16} />
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
