import { useState, useEffect } from 'react';
import { LogOut, Image as ImageIcon, Settings, List, Plus, Trash2, Edit2 } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, User as FirebaseUser, GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

export function AdminDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'services' | 'gallery'>('services');
  const [services, setServices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({ name: '', description: '', price: '', duration: '', category: '' });
  
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const servicesSnapshot = await getDocs(collection(db, 'services'));
      setServices(servicesSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const gallerySnapshot = await getDocs(collection(db, 'gallery'));
      setGallery(gallerySnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name) return;
    
    try {
      const newRef = doc(collection(db, 'services'));
      await setDoc(newRef, newService);
      setNewService({ name: '', description: '', price: '', duration: '', category: '' });
      setIsAddingService(false);
      fetchData();
    } catch (e) {
      console.error(e);
      setError("Error adding service.");
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'services', id));
      fetchData();
    } catch (e) {
      console.error(e);
      setError("Error deleting service.");
    }
  };

  const handleAddGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl) return;
    try {
      const newRef = doc(collection(db, 'gallery'));
      await setDoc(newRef, { url: newImageUrl });
      setNewImageUrl('');
      setIsAddingImage(false);
      fetchData();
    } catch (e) {
      console.error(e);
      setError("Error adding image.");
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
      fetchData();
    } catch (e) {
      console.error(e);
      setError("Error deleting image.");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        // Create user doc
        await setDoc(doc(db, 'users', cred.user.uid), {
          email: cred.user.email,
          role: 'admin' // By default granting admin for the sake of the studio owner
        });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      
      // Ensure user document exists with admin role
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        role: 'admin'
      }, { merge: true });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div className="min-h-screen bg-skin-bg flex items-center justify-center font-sans text-xs uppercase tracking-widest">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-skin-bg flex items-center justify-center p-4">
        <div className="bg-white p-8 max-w-md w-full border border-skin-text/10 shadow-xl shadow-black/5">
          <h2 className="text-3xl font-serif font-light text-skin-text italic mb-2 text-center">Admin Access</h2>
          <p className="text-skin-text/60 font-sans text-[10px] uppercase tracking-widest text-center mb-8">Authenticate to manage content</p>
          
          <div className="space-y-4">
            {error && <p className="text-red-500 text-xs font-sans text-center">{error}</p>}
            
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3 bg-white border border-skin-text/20 text-skin-text text-xs uppercase tracking-widest font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-skin-bg flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-skin-text/10 p-6 flex flex-col bg-white">
        <div className="mb-10">
          <h2 className="text-2xl font-serif font-light text-skin-text italic">Admin Portal</h2>
          <p className="text-[10px] text-skin-text/60 uppercase tracking-widest mt-2 font-sans truncate">
            {user.email}
          </p>
        </div>

        <nav className="space-y-2 flex-1 font-sans text-xs uppercase tracking-widest font-bold">
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
              activeTab === 'services' ? 'bg-skin-text text-white' : 'text-skin-text/70 hover:bg-skin-text/5'
            }`}
          >
            <List className="w-4 h-4" />
            Services
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
              activeTab === 'gallery' ? 'bg-skin-text text-white' : 'text-skin-text/70 hover:bg-skin-text/5'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Gallery
          </button>
        </nav>

        <button onClick={handleLogout} className="mt-auto w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors font-sans text-xs uppercase tracking-widest font-bold rounded-sm">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 bg-skin-bg overflow-y-auto">
        <header className="mb-8 border-b border-skin-text/10 pb-6">
          <h1 className="text-3xl font-serif font-light text-skin-text italic">Manage Website Data</h1>
          <p className="text-skin-text/60 font-sans text-sm mt-2">Any changes here will reflect directly on the main website.</p>
        </header>

        {activeTab === 'services' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-sans text-xs uppercase tracking-widest font-bold text-skin-text">Services List</h3>
              {!isAddingService && (
                <button onClick={() => setIsAddingService(true)} className="flex items-center gap-2 bg-skin-text text-white px-4 py-2 font-sans text-[10px] uppercase tracking-widest font-bold hover:opacity-80 transition-opacity">
                  <Plus className="w-3 h-3" /> Add Service
                </button>
              )}
            </div>
            
            {error && <p className="text-red-500 text-xs font-sans mb-4">{error}</p>}

            {isAddingService && (
              <form onSubmit={handleAddService} className="bg-white border border-skin-text/10 p-6 mb-6 space-y-4">
                <h4 className="font-serif text-lg text-skin-text">Add New Service</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Service Name" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} required className="p-3 border border-skin-text/20 bg-skin-bg text-sm font-sans w-full" />
                  <input type="text" placeholder="Category" value={newService.category} onChange={e => setNewService({...newService, category: e.target.value})} className="p-3 border border-skin-text/20 bg-skin-bg text-sm font-sans w-full" />
                  <input type="text" placeholder="Price (e.g. Rs. 5000)" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} className="p-3 border border-skin-text/20 bg-skin-bg text-sm font-sans w-full" />
                  <input type="text" placeholder="Duration (e.g. 30 min)" value={newService.duration} onChange={e => setNewService({...newService, duration: e.target.value})} className="p-3 border border-skin-text/20 bg-skin-bg text-sm font-sans w-full" />
                  <textarea placeholder="Description" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="p-3 border border-skin-text/20 bg-skin-bg text-sm font-sans w-full md:col-span-2" rows={3}></textarea>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-skin-text text-white px-6 py-2 font-sans text-xs uppercase tracking-widest font-bold hover:opacity-80 transition-opacity">Save Service</button>
                  <button type="button" onClick={() => setIsAddingService(false)} className="bg-gray-200 text-skin-text px-6 py-2 font-sans text-xs uppercase tracking-widest font-bold hover:bg-gray-300 transition-opacity">Cancel</button>
                </div>
              </form>
            )}

            <div className="grid gap-4">
              {services.map((service, i) => (
                <div key={service.id || i} className="bg-white border border-skin-text/10 p-6 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-xl text-skin-text">{service.name}</h4>
                    <p className="font-sans text-sm text-skin-text/60 mt-1">{service.description}</p>
                    <div className="flex gap-4 mt-3 font-sans text-[10px] uppercase tracking-widest text-skin-text/80">
                      <span>{service.price}</span>
                      <span>•</span>
                      <span>{service.duration}</span>
                      <span>•</span>
                      <span>{service.category}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 shrink-0">
                    <button className="p-2 border border-skin-text/10 text-skin-text hover:bg-skin-text hover:text-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteService(service.id)} className="p-2 border border-skin-text/10 text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {services.length === 0 && <p className="font-sans text-sm text-skin-text/50">No services found in database. Add one above.</p>}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-sans text-xs uppercase tracking-widest font-bold text-skin-text">Gallery Images</h3>
              {!isAddingImage && (
                <button onClick={() => setIsAddingImage(true)} className="flex items-center gap-2 bg-skin-text text-white px-4 py-2 font-sans text-[10px] uppercase tracking-widest font-bold hover:opacity-80 transition-opacity">
                  <Plus className="w-3 h-3" /> Add Image
                </button>
              )}
            </div>

            {error && <p className="text-red-500 text-xs font-sans mb-4">{error}</p>}

            {isAddingImage && (
              <form onSubmit={handleAddGalleryImage} className="bg-white border border-skin-text/10 p-6 mb-6 space-y-4">
                <h4 className="font-serif text-lg text-skin-text">Add New Image</h4>
                <input type="url" placeholder="Image URL" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} required className="p-3 border border-skin-text/20 bg-skin-bg text-sm font-sans w-full" />
                <div className="flex gap-2">
                  <button type="submit" className="bg-skin-text text-white px-6 py-2 font-sans text-xs uppercase tracking-widest font-bold hover:opacity-80 transition-opacity">Save Image</button>
                  <button type="button" onClick={() => setIsAddingImage(false)} className="bg-gray-200 text-skin-text px-6 py-2 font-sans text-xs uppercase tracking-widest font-bold hover:bg-gray-300 transition-opacity">Cancel</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((img, i) => (
                <div key={img.id || i} className="relative group aspect-square bg-white border border-skin-text/10 p-2">
                  <img src={img.url} className="w-full h-full object-cover" alt="Gallery item" />
                  <div className="absolute inset-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white text-skin-text hover:bg-gray-100 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteGalleryImage(img.id)} className="p-2 bg-red-500 text-white hover:bg-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {gallery.length === 0 && <p className="font-sans text-sm text-skin-text/50 col-span-full">No images found in database. Add one above.</p>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

