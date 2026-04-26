import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface HomePageProps {
  addToCart: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewProductDetail: (product: Product) => void;
}

export default function HomePage({ addToCart, searchQuery, setSearchQuery, viewProductDetail }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Clear search query when selecting "All" to show all products
    if (category === 'All') {
      setSearchQuery('');
    }
  };

  const filteredProducts = useMemo(() => {
    let products = PRODUCTS;
    
    // First filter by category
    if (selectedCategory !== 'All') {
      products = products.filter(p => p.category === selectedCategory);
    }
    
    // Then filter by search query (only if there's a search query)
    if (searchQuery.trim()) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return products;
  }, [searchQuery, selectedCategory]);

  const scrollToShop = () => {
    const el = document.getElementById('shop');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center px-4 sm:px-6 pb-16 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
            className="lg:col-span-12 xl:col-span-8 relative rounded-[20px] sm:rounded-[32px] overflow-hidden bg-brand-muted h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-end p-6 sm:p-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-brand-ink/20 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" alt="Main" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" />
            <div className="relative z-20 max-w-lg sm:max-w-xl">
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.4em] font-bold text-white/80 mb-2 sm:mb-4 block">New Season Collection</span>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-8xl font-serif text-white leading-[0.9] mb-4 sm:mb-8 tracking-tighter">The Essence of Stillness</h1>
              <button onClick={scrollToShop} className="bg-white text-brand-ink px-6 sm:px-10 py-3 sm:py-4 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-brand-accent hover:text-white hover:scale-105 hover:shadow-2xl active:bg-brand-accent active:text-white active:scale-95 transition-all duration-500 shadow-xl min-w-[120px] sm:min-w-[160px] group">Explore Collection</button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-12 xl:col-span-4 flex flex-col gap-4 sm:gap-8"
          >
            <div className="flex-1 rounded-[32px] bg-[#C5C4BA] p-10 flex flex-col justify-end relative overflow-hidden group min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000" alt="Ceramics" />
              <div className="relative z-10">
                <h2 className="text-3xl font-serif mb-1 italic">Ceramic Study</h2>
                <p className="text-[11px] opacity-70 uppercase tracking-[0.3em] font-bold">Limited Edition</p>
              </div>
            </div>
            <div className="flex-1 rounded-[32px] border border-brand-ink/10 p-10 flex flex-col justify-center items-center text-center bg-white/30 backdrop-blur-sm group">
              <div className="w-16 h-16 rounded-full border border-brand-accent flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:text-white active:bg-brand-accent active:text-white active:scale-110 transition-all duration-500">
                <ArrowRight className="text-brand-accent group-hover:text-white -rotate-45" size={24} />
              </div>
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold">Join the Club</span>
              <p className="text-[12px] opacity-50 mt-3 leading-relaxed max-w-[200px]">Exclusive early access to our curated objects & member events.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Section */}
      <section id="shop" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-2 sm:mb-4 block">Curated Selection</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">Store Objects</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-brand-ink/10 hidden sm:block"></div>
              <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 whitespace-nowrap">{filteredProducts.length} Results</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['All', 'Apparel', 'Outerwear', 'Accessories', 'Fragrance', 'Home', 'Footwear'].map(cat => (
              <button 
                key={cat} 
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-lg border border-brand-ink/10 text-sm font-medium transition-all
                  ${selectedCategory === cat ? 'bg-brand-accent text-white' : 'bg-brand-muted/10 hover:border-brand-accent hover:text-brand-accent'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className="group product-card"
            >
              <div className="product-card-mask mb-4 sm:mb-6 relative overflow-hidden bg-brand-muted aspect-[4/5] rounded-xl sm:rounded-2xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <button 
                  onClick={() => addToCart(product)}
                  className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-brand-bg/95 text-brand-ink py-3 sm:py-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 rounded-lg sm:rounded-xl shadow-2xl hover:bg-brand-accent hover:text-white active:bg-brand-accent active:text-white active:scale-95 min-h-[44px] sm:min-h-[48px] flex items-center justify-center"
                >
                  Add to Bag — ${product.price}
                </button>
              </div>
              <div className="space-y-2 product-info">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-[11px] sm:text-[13px] font-medium leading-tight line-clamp-2">{product.name}</h3>
                    <p className="text-[9px] sm:text-[11px] opacity-50 italic font-serif leading-none">{product.category}</p>
                    <p className="text-[10px] sm:text-[12px] font-medium pt-1">${product.price}</p>
                  </div>
                  <button 
                    onClick={() => viewProductDetail(product)}
                    className="p-2 rounded-full bg-brand-muted/20 hover:bg-brand-accent hover:text-white transition-all duration-300 opacity-100 sm:opacity-0 translate-x-0 sm:translate-x-2 group-hover:translate-x-0 sm:group-hover:translate-x-0 flex-shrink-0"
                    title="View Product Details"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
