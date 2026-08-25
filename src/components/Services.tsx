import { useState, useEffect } from 'react';
import { services as defaultServices } from '../data';
import { ArrowRight } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface ServicesProps {
  onBookClick: () => void;
}

export function Services({ onBookClick }: ServicesProps) {
  const [servicesList, setServicesList] = useState<any[]>(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'services'));
        if (!querySnapshot.empty) {
          setServicesList(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (err) {
        console.error("Error fetching services: ", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-24 bg-skin-bg border-b border-skin-text/10" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-sans text-xs uppercase tracking-widest font-bold mb-4">Our Signature Treatments</h2>
          <p className="text-skin-text/60 text-sm max-w-xl font-sans leading-relaxed">Comprehensive care tailored to your unique skin type and concerns, using the latest clinical technologies.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
          {servicesList.map((service) => (
            <div key={service.id} className="flex flex-col border-b border-skin-text/10 pb-6 group cursor-pointer hover:border-skin-primary transition-colors">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-serif text-skin-text group-hover:text-skin-primary transition-colors">
                  {service.name}
                </h3>
                <span className="font-sans text-[10px] uppercase tracking-widest opacity-60">
                  {service.duration}
                </span>
              </div>
              <p className="font-sans text-sm text-skin-text/70 mb-4 max-w-md leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="font-sans text-xs uppercase tracking-widest">{service.price}</span>
                <button 
                  onClick={onBookClick}
                  className="font-sans text-[10px] uppercase tracking-widest text-skin-primary hover:opacity-70 transition-opacity flex items-center gap-2"
                >
                  Book <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
