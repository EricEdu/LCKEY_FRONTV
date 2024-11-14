import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import serverTimestamp from "firebase/firestore"
import userRepository from '../Repository/userRepository';

export const authService = {
    signUp: async (email, password, Key) => {
        try {
            let user;
            if (Key) {
                user = await userRepository.getUserById(Key)
                // const adminUser = await userRepository.getUsers(Key);
                if (!user || user.role !== "admin") {
                    return { error: "O ID fornecido não pertence a um administrador válido." };
                }
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const myuser = userCredential.user;

            let role = "user";
            if (Key == "Teste777") {
                role = "admin";
            };

            const entrycode = await Math.floor(100000 + Math.random() * 900000);
            const createdat = new Date()
            const userData = {
                uid: myuser.uid,
                email: myuser.email,
                role: role,
                id_admin: user.uid ? user.uid : null,
                entryCode: entrycode,
                created_at: createdat
            };

            const response = await userRepository.createUser(userData);

            // await auth.setCustomUserClaims(user.uid, {
            //     role: role,
            //     admin_id: idAdmin ? idAdmin : null
            // });

            return response;
        } catch (error) {
            return console.log(error)
            // { error: error.message };
        }
    },

    signIn: async (email, password) => {
        try {
            const client = await signInWithEmailAndPassword(auth, email, password);
            const adminUser = await userRepository.getUserById(client.user.uid);
            return adminUser
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
