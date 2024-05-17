import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase, signOut, sendEmailVerification, sendPasswordResetEmail, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, set, get } from 'firebase/database';
import { auth, database } from "../FireBase";
import { toast } from 'react-toastify';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [aboutData, setAboutData] = useState([]);

    const storeAboutDataInFirebase = async (aboutData) => {
        try {
            await set(ref(database, 'aboutData'), aboutData);
            console.log('About data stored in Firebase');
        } catch (error) {
            console.error('Error storing about data:', error);
            throw error;
        }
    };

    const fetchAboutDataFromFirebase = async () => {
        try {
            const aboutDataRef = ref(database, 'aboutData');
            const snapshot = await get(aboutDataRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (Array.isArray(data)) {
                    setAboutData(data);
                    // console.log('About data retrieved from Firebase:', data);
                } else if (typeof data === 'object') {
                    // Convert object to array
                    const dataArray = Object.values(data);
                    setAboutData(dataArray);
                    // console.log('About data retrieved from Firebase:', dataArray);
                } else {
                    console.error('Invalid aboutData:', data);
                }
            } else {
                console.log('No about data found in Firebase');
            }
        } catch (error) {
            console.error('Error fetching about data:', error);
            throw error;
        }
    };
    
    const createUser = async (email, password, firstName, lastName) => {
        try {
            const userCredential = await createUserWithEmailAndPasswordFirebase(auth, email, password);
            await sendEmailVerification(auth.currentUser);
            await set(ref(database, `users/${userCredential.user.uid}`), {
                firstName: firstName,
                lastName: lastName,
                email: email,
            });
            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    const signIn = async (email, password) => {
        try {
            return await signInWithEmailAndPasswordFirebase(auth, email, password);
        } catch (error) {
            toast.error("Error signing in: " + error.message);
            throw error;
        }
    };


    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const googleUser = result.user;
            if (credential) {
                set(ref(database, `users/${googleUser.uid}`), {
                    displayName: googleUser.displayName,
                    email: googleUser.email,
                    photoURL: googleUser.photoURL,
                    googleSignIn: true,
                });
            }
        } catch (error) {
            throw error;
        }
    };
    
    const forgotPassword = async (email) => {
        try {
            const snapshot = await get(ref(database, 'users'));
            const users = snapshot.val();
            const userWithEmail = Object.values(users).find(user => user.email === email);
    
            if (!userWithEmail) {
                toast.error("No account found with this email address");
            }
            else{
                await sendPasswordResetEmail(auth, email);
                toast.success("Password reset email sent successfully");
            }

        } catch (error) {
            toast.error("Failed to send password reset email: " + error.message);
            throw error;
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        fetchAboutDataFromFirebase().then((data) => {
            if (Array.isArray(data)) {
                setAboutData(data);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ 
            createUser, 
            signIn, 
            googleSignIn, 
            forgotPassword, 
            storeAboutDataInFirebase, 
            aboutData, 
            user, 
            logout 
        }}>
            {children}
        </UserContext.Provider>
    );
};


export const UserAuth = () => {
    return useContext(UserContext);
};
