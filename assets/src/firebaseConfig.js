import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDABWetSaM3JHkTeF8noZ_lhkvd32PNunI",
    authDomain: "keylock-3d493.firebaseapp.com",
    projectId: "keylock-3d493",
    storageBucket: "keylock-3d493.firebasestorage.app",
    messagingSenderId: "143662392141",
    appId: "1:143662392141:web:3a01a25db2f99bda604d04"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Inicializa Firestore
const db = getFirestore(app);

export { auth, db };
