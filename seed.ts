import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc, getDocs } from 'firebase/firestore';
import { services, galleryImages } from './src/data';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function seed() {
  console.log("Seeding services...");
  const servicesSnap = await getDocs(collection(db, 'services'));
  if (servicesSnap.empty) {
    for (const service of services) {
      await setDoc(doc(collection(db, 'services')), {
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        category: service.category
      });
    }
    console.log("Services seeded.");
  }

  console.log("Seeding gallery...");
  const gallerySnap = await getDocs(collection(db, 'gallery'));
  if (gallerySnap.empty) {
    for (const img of galleryImages) {
      await setDoc(doc(collection(db, 'gallery')), {
        url: img
      });
    }
    console.log("Gallery seeded.");
  }
  process.exit(0);
}

seed().catch(console.error);
