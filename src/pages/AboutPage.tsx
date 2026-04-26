import { motion } from 'motion/react';
import { Globe, Shield, Leaf } from 'lucide-react';

export default function AboutPage() {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent block underline underline-offset-8">Our Philosophy</span>
          <h1 className="text-6xl md:text-8xl font-serif italic leading-tight tracking-tighter">Crafted for the conscious soul.</h1>
          <div className="space-y-8 text-lg font-light leading-relaxed text-brand-ink/70 max-w-xl">
            <p>Founded in Paris, LUXE began with a simple observation: the modern world moves too fast. We wanted to create a space that celebrates the slow, the intentional, and the artisanal.</p>
            <p>Every piece in our collection is curated with longevity in mind. We partner with small-scale artisans across the globe—from ceramicists in Kyoto to weavers in Antwerp—to bring you objects that carry a soul.</p>
            <p>Our commitment is simple: 100% ethical production, sustainable materials, and a timeless aesthetic that transcends trends.</p>
          </div>
          <div className="flex gap-16 pt-8">
            <div>
              <div className="text-5xl font-serif mb-2 tabular-nums">2018</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Est. Paris</div>
            </div>
            <div>
              <div className="text-5xl font-serif mb-2 tabular-nums">142+</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Artisans</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[3/4] bg-brand-muted rounded-[64px] overflow-hidden shadow-2xl relative z-10">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200" alt="About" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-brand-muted/50 rounded-full blur-3xl -z-10" />
        </div>
      </div>

      <div className="mt-48 grid md:grid-cols-3 gap-16">
        {[
          { icon: Globe, title: 'Ethical Sourcing', desc: 'We visit every workshop personally to ensure fair wages and safe environments.' },
          { icon: Shield, title: 'Quality Guarantee', desc: 'Every object is inspected thrice before it enters our inventory. Built to last generations.' },
          { icon: Leaf, title: 'Sustainable Mindset', desc: 'From recycled packaging to carbon-neutral shipping, we protect the world that inspires us.' }
        ].map((item, i) => (
          <div key={i} className="space-y-6">
            <div className="w-12 h-12 bg-brand-muted rounded-2xl flex items-center justify-center text-brand-accent">
              <item.icon size={24} />
            </div>
            <h3 className="text-2xl font-serif italic">{item.title}</h3>
            <p className="text-sm leading-relaxed text-brand-ink/50">{item.desc}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
