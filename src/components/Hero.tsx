import { Calendar } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export function Hero({ onBookClick }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center border-b border-skin-text/10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=2000" 
          alt="Spa treatment" 
          className="w-full h-full object-cover"
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-skin-bg via-skin-bg/90 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-skin-text leading-tight mb-6">
            Refining skin health through <br/>
            <span className="italic">science & artistry.</span>
          </h2>
          <p className="text-sm md:text-base text-skin-text/70 mb-10 max-w-lg leading-relaxed font-sans">
            Located in Madina Market, AH Skin Studio offers premium clinical environments for advanced aesthetic procedures. Experience personalized dermatology in a luxurious, relaxing setting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onBookClick}
              className="px-8 py-3 bg-skin-text text-white font-sans text-xs uppercase tracking-[0.2em] rounded-sm hover:opacity-80 transition-opacity"
            >
              Consult a Specialist
            </button>
            <button className="px-8 py-3 border border-skin-text text-skin-text font-sans text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-skin-text hover:text-white transition-colors">
              View Treatments
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-[10px] uppercase tracking-widest text-skin-text/60 font-sans">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="Client" className="w-10 h-10 rounded-full border border-skin-bg object-cover" />
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&h=64" alt="Client" className="w-10 h-10 rounded-full border border-skin-bg object-cover" />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="Client" className="w-10 h-10 rounded-full border border-skin-bg object-cover" />
            </div>
            <p>Trusted by 1000+ patients</p>
          </div>
        </div>
      </div>
    </section>
  );
}
