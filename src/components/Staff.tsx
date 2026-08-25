import { staffMembers } from '../data';

export function Staff() {
  return (
    <section className="py-24 bg-white border-b border-skin-text/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          <div className="w-full md:w-1/3 sticky top-32">
            <h2 className="font-sans text-xs uppercase tracking-widest font-bold mb-4">Meet Our Experts</h2>
            <p className="text-skin-text/60 text-sm font-sans leading-relaxed mb-8">
              Our clinic is led by board-certified dermatologists and highly trained aestheticians committed to clinical excellence and patient safety.
            </p>
            <button className="px-8 py-3 bg-skin-text text-white font-sans text-xs uppercase tracking-[0.2em] rounded-sm hover:opacity-80 transition-opacity">
              Learn More
            </button>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {staffMembers.map((staff) => (
              <div key={staff.id} className="group">
                <div className="overflow-hidden mb-6 relative bg-gray-100">
                  <img 
                    src={staff.image} 
                    alt={staff.name} 
                    className="w-full aspect-[4/5] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="text-2xl font-serif font-light text-skin-text mb-1">{staff.name}</h3>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-skin-primary mb-4">{staff.role}</p>
                <p className="text-skin-text/70 text-sm font-sans leading-relaxed">{staff.bio}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
