import { Award, BookOpen, Heart, Star } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="flex-1 bg-skin-bg py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-skin-text italic mb-6">About Us</h1>
          <div className="w-12 h-[1px] bg-skin-primary mx-auto mb-6"></div>
          <p className="text-skin-text/80 text-lg md:text-xl font-sans font-light leading-relaxed">
            Dedicated to enhancing your natural beauty through advanced skincare science and holistic wellness.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white border border-skin-text/10 p-8 md:p-16 mb-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-skin-primary"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-skin-text italic mb-6">Our Mission</h2>
              <p className="text-skin-text/80 font-sans leading-relaxed mb-6">
                At AH Skin Studio, our mission is to empower individuals to feel confident in their own skin. We believe that true beauty stems from a harmonious balance of medical-grade treatments and nurturing holistic care. 
              </p>
              <p className="text-skin-text/80 font-sans leading-relaxed mb-8">
                We are committed to providing personalized, evidence-based skincare solutions in a serene, luxurious environment where every patient feels heard, valued, and beautifully transformed.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-skin-primary shrink-0 mt-1" />
                  <span className="text-xs uppercase tracking-widest font-bold text-skin-text">Patient First</span>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-skin-primary shrink-0 mt-1" />
                  <span className="text-xs uppercase tracking-widest font-bold text-skin-text">Excellence</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-skin-bg border border-skin-text/10 p-2">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" 
                alt="Spa interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Doctor Portfolio Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-skin-text italic mb-12 text-center">Meet the Doctor</h2>
          
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 relative">
              <div className="aspect-[3/4] bg-white border border-skin-text/10 p-4 shadow-xl shadow-black/5">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                  alt="Doctor Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:col-span-7 md:py-8">
              <h3 className="text-2xl md:text-3xl font-serif text-skin-text mb-2">Dr. Aisha Hassan, MD</h3>
              <p className="text-xs uppercase tracking-widest font-bold text-skin-primary mb-8">Board Certified Dermatologist</p>
              
              <div className="space-y-6 text-skin-text/80 font-sans leading-relaxed mb-10">
                <p>
                  With over 12 years of specialized experience in medical and cosmetic dermatology, Dr. Hassan founded AH Skin Studio with a singular vision: to bridge the gap between clinical efficacy and luxurious self-care.
                </p>
                <p>
                  She completed her residency at the prestigious Johns Hopkins Hospital, followed by a fellowship in advanced laser therapeutics and aesthetic medicine. Dr. Hassan is renowned for her "less is more" approach, focusing on subtle, natural enhancements that celebrate individual beauty.
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm uppercase tracking-widest font-bold text-skin-text border-b border-skin-text/10 pb-3">Credentials & Achievements</h4>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <BookOpen className="w-5 h-5 text-skin-primary shrink-0" />
                    <div>
                      <h5 className="font-bold text-sm text-skin-text">Education</h5>
                      <p className="text-xs text-skin-text/70 mt-1">MD, Harvard Medical School</p>
                      <p className="text-xs text-skin-text/70">BSc Biology, Stanford University</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Award className="w-5 h-5 text-skin-primary shrink-0" />
                    <div>
                      <h5 className="font-bold text-sm text-skin-text">Certifications</h5>
                      <p className="text-xs text-skin-text/70 mt-1">American Board of Dermatology</p>
                      <p className="text-xs text-skin-text/70">Fellow, AAD</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
