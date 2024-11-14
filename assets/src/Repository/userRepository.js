import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, doc, getDoc, query, where, updateDoc } from 'firebase/firestore';

const userRepository = {
    createUser: async (userData) => {
        try {
            const docRef = await addDoc(collection(db, 'users'), userData);
            return { id: docRef.id, ...userData };
        } catch (error) {
            return console.log(error)
            // throw new Error(error.message);
        }
    },
    
    getUsers: async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
            console.log(users)
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    updateEntryCode: async (entrycode, userid) => {
        try {
            const userDocRef = doc(db, 'users', userid);
            
            await updateDoc(userDocRef, {
                entryCode: entrycode, 
            });
    
            console.log('Entry code atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar entry code:', error);
            throw new Error(error.message);
        }
    },

    getUserById: async (userId) => {
        try {
            const userDoc = doc(db, 'users', userId);
            
            const docSnapshot = await getDoc(userDoc);
    
            if (docSnapshot.exists()) {
                return { id: docSnapshot.id, ...docSnapshot.data() }; 
            } else {
                console.log('Usuário não encontrado!');
                return null; 
            }
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    },

    getUserHistorico: async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                throw new Error('Usuário não encontrado.');
            }
            const userData = userDoc.data();
            let entries = [];
            if (userData.role === 'admin') {
                const entryCollection = collection(db, 'entry');
                const querySnapshot = await getDocs(entryCollection);
                querySnapshot.forEach((doc) => {
                    entries.push({ id: doc.id, ...doc.data() });
                });
            } else {
                const entryCollection = collection(db, 'entry');
                const q = query(entryCollection, where('userid', '==', userId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    entries.push({ id: doc.id, ...doc.data() });
                });
            }
            console.log(entries)
            return entries;
        } catch (error) {
            throw new Error(`Erro ao buscar histórico do usuário: ${error.message}`);
        }
    }
};

export default userRepository;
