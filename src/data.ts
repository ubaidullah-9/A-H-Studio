import { Service, Staff, Testimonial } from './types';

export const services: Service[] = [
  {
    id: 's1',
    name: 'HydraFacial Glow',
    description: 'Deep cleansing, exfoliation, and hydration for an instant radiant glow.',
    price: 'Rs. 4,500',
    duration: '45 min',
    category: 'Facials',
  },
  {
    id: 's2',
    name: 'Acne Clearance Peel',
    description: 'Salicylic acid peel designed to clear pores, reduce inflammation and prevent breakouts.',
    price: 'Rs. 3,500',
    duration: '30 min',
    category: 'Peels',
  },
  {
    id: 's3',
    name: 'Laser Hair Removal (Face)',
    description: 'Safe and effective laser hair reduction using advanced diode technology.',
    price: 'Rs. 5,000',
    duration: '20 min',
    category: 'Laser',
  },
  {
    id: 's4',
    name: 'Anti-Aging PRP Therapy',
    description: 'Platelet-Rich Plasma therapy to stimulate collagen and rejuvenate the skin naturally.',
    price: 'Rs. 8,000',
    duration: '60 min',
    category: 'Specialized',
  },
  {
    id: 's5',
    name: 'Microdermabrasion',
    description: 'Gentle physical exfoliation to remove dead skin cells and improve texture.',
    price: 'Rs. 4,000',
    duration: '40 min',
    category: 'Exfoliation',
  }
];

export const staffMembers: Staff[] = [
  {
    id: 'd1',
    name: 'Dr. Ayesha Hussain',
    role: 'Lead Dermatologist & Founder',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'With over 10 years of experience in aesthetic medicine, Dr. Ayesha specializes in non-invasive skin rejuvenation and personalized care.',
  },
  {
    id: 'd2',
    name: 'Sarah Khan',
    role: 'Senior Aesthetician',
    image: 'https://images.unsplash.com/photo-1594824436998-a626402482e9?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Sarah is an expert in advanced facials and chemical peels, dedicated to helping clients achieve their best skin health.',
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Fatima Z.',
    text: 'AH Skin Studio completely transformed my skin. The acne clearance peel was a game changer, and the staff is so welcoming!',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Sana R.',
    text: 'I had the HydraFacial before my wedding, and my skin was glowing for days. Highly recommend Dr. Ayesha and her team.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'M. Ali',
    text: 'Professional, hygienic, and highly skilled. The laser treatments are painless and very effective.',
    rating: 5,
  }
];

export const galleryImages = [
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600', // clinic interior
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600', // facial
  'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=600', // products/tools
  'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600', // treatment room
];
