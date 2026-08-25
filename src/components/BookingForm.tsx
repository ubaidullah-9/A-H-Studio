import { useState, FormEvent } from 'react';
import { services } from '../data';
import { CheckCircle2, CreditCard, Lock, Calendar as CalendarIcon, Clock, User, Phone, Mail } from 'lucide-react';

interface BookingFormProps {
  onBack: () => void;
}

export function BookingForm({ onBack }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call for payment & HIPAA compliant record creation
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-[80vh] bg-skin-bg py-16">
      <div className="max-w-3xl mx-auto px-4">
        
        <button onClick={onBack} className="text-skin-text font-sans text-xs uppercase tracking-widest font-bold mb-8 hover:opacity-70 transition-opacity">
          &larr; Back to Home
        </button>

        <div className="bg-white border border-skin-text/10">
          {/* Header */}
          <div className="border-b border-skin-text/10 p-8 md:p-12 pb-8">
            <h2 className="text-3xl font-serif font-light italic mb-2">Book Your Consultation</h2>
            <p className="text-skin-text/60 text-sm font-sans">Secure, encrypted, and HIPAA-compliant booking system</p>
          </div>

          <div className="p-8 md:p-12 pt-8">
            
            {/* Step Indicators */}
            <div className="flex justify-start mb-10 border-b border-skin-text/10 pb-6">
              <div className="flex items-center gap-6 font-sans text-xs uppercase tracking-widest">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-skin-text font-bold' : 'text-skin-text/40'}`}>
                  <span>01</span>
                  <span className="hidden sm:inline">Details</span>
                </div>
                <div className="w-8 h-[1px] bg-skin-text/20"></div>
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-skin-text font-bold' : 'text-skin-text/40'}`}>
                  <span>02</span>
                  <span className="hidden sm:inline">Payment</span>
                </div>
                <div className="w-8 h-[1px] bg-skin-text/20"></div>
                <div className={`flex items-center gap-2 ${step >= 3 ? 'text-skin-text font-bold' : 'text-skin-text/40'}`}>
                  <span>03</span>
                  <span className="hidden sm:inline">Confirm</span>
                </div>
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-6 animate-in fade-in duration-500 font-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-skin-text mb-2">Service</label>
                    <select required className="w-full p-3 rounded-sm border border-skin-text/20 bg-skin-bg focus:bg-white focus:border-skin-primary outline-none transition-all text-sm">
                      <option value="">Select a treatment...</option>
                      {services.map(s => <option key={s.id} value={s.id}>{s.name} - {s.price}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-skin-text mb-2">Date</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-skin-text/40" />
                      <input type="date" required className="w-full p-3 pl-10 rounded-sm border border-skin-text/20 bg-skin-bg focus:bg-white focus:border-skin-primary outline-none transition-all text-sm" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-skin-text mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-skin-text/40" />
                      <input type="text" required placeholder="Jane Doe" className="w-full p-3 pl-10 rounded-sm border border-skin-text/20 bg-skin-bg focus:bg-white focus:border-skin-primary outline-none transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-skin-text mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-skin-text/40" />
                      <input type="tel" required placeholder="0300 1234567" className="w-full p-3 pl-10 rounded-sm border border-skin-text/20 bg-skin-bg focus:bg-white focus:border-skin-primary outline-none transition-all text-sm" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 rounded-sm bg-skin-text text-white text-xs uppercase tracking-widest font-bold hover:opacity-80 transition-opacity mt-8">
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500 font-sans">
                <div className="bg-skin-bg border border-skin-text/10 p-4 flex items-start gap-4 mb-8">
                  <Lock className="w-5 h-5 text-skin-primary shrink-0" />
                  <p className="text-xs text-skin-text/80 leading-relaxed">
                    This is a secure, 256-bit encrypted connection. Your medical and payment data is handled in strict compliance with HIPAA privacy rules.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-skin-text mb-2">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-skin-text/40" />
                    <input type="text" required placeholder="0000 0000 0000 0000" className="w-full p-3 pl-10 rounded-sm border border-skin-text/20 bg-skin-bg focus:bg-white focus:border-skin-primary outline-none transition-all text-sm font-mono tracking-widest" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-skin-text mb-2">Expiry</label>
                    <input type="text" required placeholder="MM/YY" className="w-full p-3 rounded-sm border border-skin-text/20 bg-skin-bg focus:bg-white focus:border-skin-primary outline-none transition-all text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-skin-text mb-2">CVC</label>
                    <input type="password" required placeholder="123" maxLength={4} className="w-full p-3 rounded-sm border border-skin-text/20 bg-skin-bg focus:bg-white focus:border-skin-primary outline-none transition-all text-sm font-mono" />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button type="button" onClick={() => setStep(1)} className="w-1/3 py-4 rounded-sm border border-skin-text/20 text-skin-text text-xs uppercase tracking-widest font-bold hover:bg-skin-bg transition-colors">
                    Back
                  </button>
                  <button type="submit" disabled={isSubmitting} className="w-2/3 py-4 rounded-sm bg-skin-text text-white text-xs uppercase tracking-widest font-bold hover:opacity-80 transition-opacity flex justify-center items-center gap-2 disabled:opacity-50">
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>Confirm Booking</>
                    )}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-12 animate-in fade-in duration-500 border border-skin-text/10 bg-skin-bg">
                <CheckCircle2 className="w-12 h-12 text-skin-primary mx-auto mb-6" />
                <h3 className="text-2xl font-serif font-light italic text-skin-text mb-4">Booking Confirmed</h3>
                <p className="text-skin-text/60 mb-8 max-w-sm mx-auto font-sans text-sm leading-relaxed">
                  Your appointment has been successfully scheduled. An automated SMS reminder and receipt have been sent to your phone.
                </p>
                <button onClick={onBack} className="px-8 py-3 bg-skin-text text-white font-sans text-xs uppercase tracking-widest rounded-sm hover:opacity-80 transition-opacity">
                  Return to Home
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
