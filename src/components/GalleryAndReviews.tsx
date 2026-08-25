import { useState, useEffect } from 'react';
import { galleryImages as defaultGalleryImages, testimonials } from '../data';
import { Star } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export function GalleryAndReviews() {
  const [galleryImages, setGalleryImages] = useState<string[]>(defaultGalleryImages);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        if (!querySnapshot.empty) {
          setGalleryImages(querySnapshot.docs.map(doc => doc.data().url));
        }
      } catch (err) {
        console.error("Error fetching gallery: ", err);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="py-24 bg-skin-bg border-b border-skin-text/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-sans text-xs uppercase tracking-widest font-bold mb-4">Clinic & Results</h2>
              <p className="text-skin-text/60 text-sm max-w-xl font-sans leading-relaxed">Take a glimpse into our serene environment and the transformative results we achieve.</p>
            </div>
            <button className="text-[10px] uppercase tracking-widest font-sans font-bold hover:opacity-70 transition-opacity">
              View All Photos &rarr;
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
              <div key={index} className={`relative overflow-hidden group bg-gray-200 ${index === 0 || index === 3 ? 'md:col-span-2' : ''}`}>
                <img 
                  src={src} 
                  alt="Gallery image" 
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-sans font-bold">
                  Image 0{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="mb-10">
            <h2 className="font-sans text-xs uppercase tracking-widest font-bold mb-4">Patient Experiences</h2>
            <p className="text-skin-text/60 text-sm max-w-xl font-sans leading-relaxed">Hear from our satisfied patients and their clinical outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 border border-skin-text/10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-skin-primary text-skin-primary" />
                    ))}
                  </div>
                  <p className="text-skin-text text-lg italic mb-6 leading-snug">
                    "{testimonial.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-skin-primary/20 shrink-0"></div>
                  <p className="font-sans text-[11px] font-bold">
                    {testimonial.name} <span className="font-normal opacity-50 ml-2">• Patient</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
