import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailPageProps {
  product: Product | null;
  setCurrentView: (view: 'home') => void;
  addToCart: (product: Product) => void;
}

export default function ProductDetailPage({ product, setCurrentView, addToCart }: ProductDetailPageProps) {
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Product not found</p>
          <button 
            onClick={() => setCurrentView('home')}
            className="bg-brand-accent text-white px-6 py-2 rounded-lg"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 text-brand-ink/60 hover:text-brand-accent transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="text-sm uppercase tracking-[0.2em] font-medium">Back to Store</span>
        </button>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-brand-muted rounded-3xl overflow-hidden aspect-[4/5]">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              {/* Category */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif italic leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="text-3xl lg:text-4xl font-medium">
                ${product.price}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-brand-ink/70 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Details</h3>
                <div className="space-y-2 text-sm text-brand-ink/70">
                  <p>• Premium quality materials</p>
                  <p>• Carefully crafted in our workshop</p>
                  <p>• Limited edition piece</p>
                  <p>• Comes with authentic packaging</p>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="pt-8">
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-brand-accent text-white py-4 px-8 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-brand-accent/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group"
                >
                  Add to Bag — ${product.price}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Additional Info */}
              <div className="pt-8 border-t border-brand-ink/10">
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Shipping</h4>
                    <p className="text-brand-ink/60">Free shipping on orders over $500</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Returns</h4>
                    <p className="text-brand-ink/60">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
