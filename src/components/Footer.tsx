import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-skin-bg pt-16 pb-8 border-t border-skin-text/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <h3 className="text-2xl font-serif font-light italic mb-4 text-skin-text">AH Skin Studio</h3>
            <p className="text-skin-text/60 mb-6 max-w-sm font-sans text-sm">
              Your destination for advanced dermatology and aesthetic treatments. We believe in enhancing your natural beauty through science and artistry.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-skin-text/10 flex items-center justify-center hover:bg-skin-text hover:text-white transition-colors text-skin-text rounded-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-skin-text/10 flex items-center justify-center hover:bg-skin-text hover:text-white transition-colors text-skin-text rounded-sm">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest font-bold mb-6 text-skin-text">Contact & Location</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-skin-text/70 font-sans text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Madina Market, Ratta khanna Rd,<br/>Depalpur</span>
              </li>
              <li className="flex items-center gap-3 text-skin-text/70 font-sans text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <span>0306 1995460</span>
              </li>
              <li className="flex items-center gap-3 text-skin-text/70 font-sans text-sm">
                <Clock className="w-4 h-4 shrink-0" />
                <span>9:00 AM - 7:00 PM (Mon - Sat)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest font-bold mb-6 text-skin-text">Quick Links</h4>
            <ul className="space-y-2 text-skin-text/70 font-sans text-sm">
              <li><a href="#" className="hover:text-skin-text transition-colors">Our Services</a></li>
              <li><a href="#" className="hover:text-skin-text transition-colors">Meet the Team</a></li>
              <li><a href="#" className="hover:text-skin-text transition-colors">Patient Reviews</a></li>
              <li><a href="#" className="hover:text-skin-text transition-colors">Privacy Policy & HIPAA</a></li>
            </ul>
          </div>

        </div>
        <div className="border-t border-skin-text/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-skin-text/50 font-sans uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} AH Skin Studio. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Secure & HIPAA Compliant</p>
        </div>
      </div>
    </footer>
  );
}
