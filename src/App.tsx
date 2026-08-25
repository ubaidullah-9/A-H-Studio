/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { GalleryAndReviews } from './components/GalleryAndReviews';
import { Staff } from './components/Staff';
import { BookingForm } from './components/BookingForm';
import { AdminDashboard } from './components/AdminDashboard';
import { LiveChat } from './components/LiveChat';
import { AboutUs } from './components/AboutUs';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'booking' | 'admin' | 'about'>('home');

  const navigateToBooking = () => {
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-skin-text bg-skin-bg selection:bg-skin-primary selection:text-white">
      
      {currentView !== 'admin' && (
        <Header currentView={currentView} setView={setCurrentView} />
      )}

      <main className="flex-1 flex flex-col">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-500">
            <Hero onBookClick={navigateToBooking} />
            <Services onBookClick={navigateToBooking} />
            <Staff />
            <GalleryAndReviews />
          </div>
        )}

        {currentView === 'about' && (
          <div className="animate-in fade-in duration-500 flex-1 flex flex-col">
            <AboutUs />
          </div>
        )}

        {currentView === 'booking' && (
          <div className="animate-in slide-in-from-right-8 fade-in duration-500">
            <BookingForm onBack={() => setCurrentView('home')} />
          </div>
        )}

        {currentView === 'admin' && (
          <div className="animate-in zoom-in-95 fade-in duration-500 flex-1">
            <AdminDashboard />
          </div>
        )}
      </main>

      {currentView !== 'admin' && <Footer />}
      
      {currentView !== 'admin' && <LiveChat />}
    </div>
  );
}
