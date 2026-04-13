"use client" //IS THIS SAFE?
import { auth } from "./firebase";
import { createContext, useContext, useState, useEffect } from "react";
import {
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut, 
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth"

//makes auth context avail throughout project's files
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    //whenever auth changes you store info into user
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsub
    }, [])

    //value creates functions :)
    const value = {
        user, 
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