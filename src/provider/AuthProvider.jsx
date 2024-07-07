/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase_config";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        return signInWithPopup(auth,googleProvider);
    };
    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    const logOut =() => {
        return signOut(auth);
    };
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            
                setUser(currentUser);
                console.log('User is the auth state changed', currentUser);
        });
        return ()=> unsubscribe(); // unsubscribe on unmount
    }, [])

    const authInfo ={
        user, createUser, signIn, logOut, signInWithGoogle
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider ;