import { useState, useEffect } from 'react';
import { Product, View, CartItem, CheckoutStep, ShippingData, PaymentData, AccountData } from './types';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CheckoutPage from './pages/CheckoutPage';
import JournalPage from './pages/JournalPage';
import CreateAccountPage from './pages/CreateAccountPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Header from './components/Header';
import Modals from './components/Modals';
import { Instagram, Twitter, Facebook, Youtube, MessageCircle, Music } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const viewProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => 
      item.product.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('bag');
  const [shippingData, setShippingData] = useState<ShippingData>({ name: '', address: '', city: '' });
  const [paymentData, setPaymentData] = useState<PaymentData>({ number: '', expiry: '', cvv: '' });
  const [accountData, setAccountData] = useState<AccountData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false,
    subscribeNewsletter: false
  });

  const handleCheckoutAction = () => {
    if (checkoutStep === 'bag') setCheckoutStep('shipping');
    else if (checkoutStep === 'shipping') setCheckoutStep('payment');
    else if (checkoutStep === 'payment') {
      setCheckoutStep('success');
      setCart([]); // Clear cart on success
    }
  };

  const handleCreateAccount = () => {
    // In a real app, this would send data to backend
    console.log('Account created:', accountData);
    alert('Account created successfully! Welcome to LUXE Paris.');
    // Reset form and go to home
    setAccountData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      acceptTerms: false,
      subscribeNewsletter: false
    });
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white bg-brand-bg text-brand-ink">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        isScrolled={isScrolled}
        setIsMenuOpen={setIsMenuOpen}
        setIsSearchOpen={setIsSearchOpen}
        setIsProfileOpen={setIsProfileOpen}
        cartLength={cart.length}
      />

      <Modals
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCurrentView={setCurrentView}
      />

      <main className="pt-8">
        {currentView === 'home' && (
          <HomePage addToCart={addToCart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} viewProductDetail={viewProductDetail} />
        )}

        {currentView === 'about' && <AboutPage />}

        {currentView === 'journal' && <JournalPage />}

        {currentView === 'create-account' && (
          <CreateAccountPage
            setCurrentView={setCurrentView}
            accountData={accountData}
            setAccountData={setAccountData}
            handleCreateAccount={handleCreateAccount}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            cart={cart}
            updateQuantity={updateQuantity}
            checkoutStep={checkoutStep}
            setCheckoutStep={setCheckoutStep}
            shippingData={shippingData}
            setShippingData={setShippingData}
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            handleCheckoutAction={handleCheckoutAction}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            setCurrentView={() => setCurrentView('home')}
            addToCart={addToCart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-brand-muted/40 text-brand-ink/80 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-14">
          <div className="max-w-xs space-y-6">
            <h2 className="text-3xl font-serif text-brand-ink italic font-light tracking-tight">LUXE</h2>
            <p className="text-[13px] leading-relaxed opacity-70">
              Providing premium essentials for the modern wardrobe since 2018. Based in Paris, shipping worldwide. We believe in objects that carry stories.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="https://instagram.com/luxeparis" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-ink/5 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com/luxeparis" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-ink/5 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="https://facebook.com/luxeparis" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-ink/5 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com/luxeparis" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-ink/5 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                <Youtube size={18} />
              </a>
              <a href="https://pinterest.com/luxeparis" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-ink/5 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                <MessageCircle size={18} />
              </a>
              <a href="https://tiktok.com/@luxeparis" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-ink/5 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                <Music size={18} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink mb-6 underline underline-offset-4 decoration-brand-accent/30">Collections</h3>
              <ul className="space-y-4 text-[12px] font-medium opacity-70">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-brand-accent transition-colors">New Season</button></li>
                <li><button className="hover:text-brand-accent transition-colors">Best Sellers</button></li>
                <li><button className="hover:text-brand-accent transition-colors">Outerwear</button></li>
                <li><button className="hover:text-brand-accent transition-colors">Accessories</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink mb-6 underline underline-offset-4 decoration-brand-accent/30">Support</h3>
              <ul className="space-y-4 text-[12px] font-medium opacity-70">
                <li><button className="hover:text-brand-accent transition-colors">Shipping</button></li>
                <li><button className="hover:text-brand-accent transition-colors">Returns</button></li>
                <li><button className="hover:text-brand-accent transition-colors">Privacy</button></li>
                <li><button className="hover:text-brand-accent transition-colors">Contact</button></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink mb-6 underline underline-offset-4 decoration-brand-accent/30">Journal</h3>
              <p className="text-[13px] italic mb-4 opacity-70 font-serif">
                Rue Saint-Honoré 142<br />
                75001 Paris, France
              </p>
              <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Mon—Fri: 10am to 7pm</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-brand-ink/10 flex flex-col sm:flex-row justify-between gap-4 text-[12px] uppercase tracking-[0.3em] font-bold opacity-40">
            <span>&copy; 2026 LUXE PARIS — All Rights Reserved.</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Return Policy</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
