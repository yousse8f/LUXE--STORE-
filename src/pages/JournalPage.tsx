import { motion } from 'motion/react';

export default function JournalPage() {
  const articles = [
    {
      id: 1,
      title: 'The Evolution of Hoodie Culture',
      excerpt: 'From gym wear to high fashion runways, explore how hoodies became the ultimate symbol of comfort and style.',
      date: 'March 15, 2024',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      category: 'Fashion'
    },
    {
      id: 2,
      title: 'Premium Cotton: The Foundation',
      excerpt: 'Understanding why quality cotton makes the perfect hoodie and how to identify superior fabrics.',
      date: 'March 8, 2024',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
      category: 'Materials'
    },
    {
      id: 3,
      title: 'Styling Your Hoodie Collection',
      excerpt: 'Master the art of wearing hoodies from casual street style to elevated everyday looks.',
      date: 'March 1, 2024',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
      category: 'Style Guide'
    },
    {
      id: 4,
      title: 'The Perfect Fit: Sizing Guide',
      excerpt: 'Everything you need to know about hoodie fits - from oversized to athletic cuts.',
      date: 'February 22, 2024',
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800',
      category: 'Sizing'
    },
    {
      id: 5,
      title: 'Care for Your Hoodies',
      excerpt: 'Essential tips to maintain the quality and extend the life of your favorite hoodies.',
      date: 'February 15, 2024',
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800',
      category: 'Care'
    },
    {
      id: 6,
      title: 'Hoodie Colors for Every Season',
      excerpt: 'Choosing the right hoodie colors to match your wardrobe and personal style.',
      date: 'February 8, 2024',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      category: 'Colors'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24"
    >
      {/* Header */}
      <div className="text-center mb-16 sm:mb-24">
        <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent block mb-4 sm:mb-6">Style Journal</span>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-serif italic leading-tight tracking-tighter mb-6 sm:mb-8">
          Hoodie Stories
        </h1>
        <p className="text-sm sm:text-lg text-brand-ink/60 max-w-2xl mx-auto leading-relaxed px-4">
          Discover everything about hoodies - from styling tips to care guides. 
          Your complete resource for mastering the art of comfortable fashion.
        </p>
      </div>

      {/* Featured Article */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.2 }}
        className="mb-16 sm:mb-24"
      >
        <div className="relative rounded-[20px] sm:rounded-[32px] lg:rounded-[48px] overflow-hidden bg-brand-muted h-[40vh] sm:h-[50vh] lg:h-[60vh] xl:h-[70vh] group cursor-pointer">
          <img 
            src={articles[0].image} 
            alt={articles[0].title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/40 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 z-20">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-white/80 mb-2 sm:mb-4 block">
              {articles[0].category} • {articles[0].date}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-white leading-tight mb-3 sm:mb-4">
              {articles[0].title}
            </h2>
            <p className="text-white/80 text-sm sm:text-lg mb-4 sm:mb-6 max-w-xl">
              {articles[0].excerpt}
            </p>
            <button className="bg-white text-brand-ink px-6 sm:px-8 py-2 sm:py-3 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-brand-accent hover:text-white transition-all duration-300 min-h-[44px]">
              Read More
            </button>
          </div>
        </div>
      </motion.div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
        {articles.slice(1).map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/3] rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden bg-brand-muted mb-4 sm:mb-6 lg:mb-8 relative">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" 
              />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-4 text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent flex-wrap">
                <span>{article.category}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-serif italic leading-tight group-hover:text-brand-accent transition-colors">
                {article.title}
              </h3>
              <p className="text-brand-ink/60 leading-relaxed text-sm sm:text-base">
                {article.excerpt}
              </p>
              <button className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-brand-accent group-hover:text-brand-ink transition-colors min-h-[44px] flex items-center">
                Read Article →
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 sm:mt-32 text-center"
      >
        <div className="bg-brand-muted/30 rounded-[24px] sm:rounded-[32px] lg:rounded-[48px] p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic mb-4 sm:mb-6">Get Style Tips</h2>
          <p className="text-brand-ink/60 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base px-4">
            Join our fashion community for exclusive hoodie styling tips, new arrivals, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto px-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-brand-bg/50 border border-brand-ink/10 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-sm outline-none focus:border-brand-accent transition-colors min-h-[44px]"
            />
            <button className="btn-premium px-6 sm:px-8 py-3 sm:py-4 rounded-full min-h-[44px]">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
