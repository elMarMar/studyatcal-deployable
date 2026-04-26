"use client" 
import { auth, database } from "./firebase";
import { createContext, useContext, useState, useEffect } from "react";
import {
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut, 
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth"
import { onValue, ref } from "firebase/database";



//makes auth context avail throughout project's files
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const[user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); 
    const[loading, setLoading] = useState(true);

    //whenever auth changes you store info into user
    useEffect(() => {
        let unsubscribeDb = null; 

        const unsub = onAuthStateChanged(auth, (user) => {            
            if (unsubscribeDb) unsubscribeDb();
            if (user) {
                setUser(user);

                // listen for token refresh signal from Realtime DB
                const metadataRef = ref(database, 'metadata/' + user.uid + '/refreshTime');
                unsubscribeDb = onValue(metadataRef, async () => {
                    const idTokenResult = await user.getIdTokenResult(true);
                    console.log('claims:', idTokenResult.claims);
                    setIsAdmin(idTokenResult.claims.admin === true);
                });
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });
        return () => {
            unsub();
            if (unsubscribeDb) unsubscribeDb();
        }
    }, [])

    //value creates functions :)
    const value = {
        user, 
        isAdmin,
        signup: (email, password) => createUserWithEmailAndPassword(auth, email, password),
        login: (email, password) => signInWithEmailAndPassword(auth, email, password),
        logout:() => signOut(auth),
        loginWithGoogle: () => signInWithPopup(auth, new GoogleAuthProvider()),
    };

    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}