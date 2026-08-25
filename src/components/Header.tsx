import { Flower2, Calendar, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentView: 'home' | 'booking' | 'admin' | 'about';
  setView: (view: 'home' | 'booking' | 'admin' | 'about') => void;
}

export function Header({ currentView, setView }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', view: 'home' as const },
    { name: 'About Us', view: 'about' as const },
    { name: 'Book Appointment', view: 'booking' as const },
    { name: 'Admin Portal', view: 'admin' as const },
  ];

  return (
    <header className="sticky top-0 z-50 bg-skin-bg border-b border-skin-text/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-baseline">
          
          {/* Logo */}
          <div 
            className="flex flex-col cursor-pointer" 
            onClick={() => setView('home')}
          >
            <div className="flex items-center gap-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-tight text-skin-primary flex flex-col items-center">
                <span className="italic leading-none">AH</span>
              </h1>
            </div>
            <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] mt-1 text-skin-text font-bold">
              SKIN STUDIO
            </p>
            <p className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] mt-1 opacity-60 text-skin-text">
              SKINCARE | FACIAL | WELLNESS
            </p>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 font-sans text-[11px] uppercase tracking-widest font-medium">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setView(link.view)}
                className={`transition-opacity hover:opacity-50 ${
                  currentView === link.view ? 'text-skin-primary opacity-100' : 'text-skin-text opacity-70'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => setView('booking')}
              className="bg-skin-text text-white px-6 py-2.5 rounded-full hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              Book Online
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-skin-text mt-[-10px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-skin-bg border-b border-skin-text/10 absolute w-full z-40">
          <div className="px-4 py-4 space-y-4 font-sans text-xs uppercase tracking-widest font-medium">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  setView(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left transition-opacity ${
                  currentView === link.view ? 'text-skin-primary' : 'text-skin-text opacity-70'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
