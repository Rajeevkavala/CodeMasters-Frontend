import React, { useEffect, useState } from 'react';
import { UserAuth } from '../Features/Auth/Context/AuthContext';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getAuth, signOut } from 'firebase/auth'; // Import the necessary functions from Firebase Authentication
import { ref, get } from 'firebase/database'; // Import ref and get from Firebase Realtime Database
import { database } from '../Features/Auth/FireBase';
export const Account = () => {
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

    useEffect(() => {
        if (user) {
            // Fetch user data from Realtime Database based on user's UID
            const userRef = ref(database, `users/${user.uid}`);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            });

            // Check if user has signed in with Google
            const isGoogleSignIn = user.providerData && user.providerData.some(provider => provider.providerId === 'google.com');
            setIsGoogleSignIn(isGoogleSignIn);
            if (isGoogleSignIn) {
                setDisplayName(user.displayName);
                setPhotoURL(user.photoURL);
            }
        }
    }, [user]);

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigate('/Login');
            toast.success("Logged Out Successfully");
        } catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <React.Fragment>
            <motion.div className="account-main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                <div className="account-details">
                    <h1 className="account">Account</h1>
                    <p className='user-email'>User Email-Id: {user && user.email}</p>
                    {!isGoogleSignIn && (
                        <React.Fragment>
                            <p className='user-name'>First Name: {firstName}</p>
                            <p className='user-name'>Last Name: {lastName}</p>
                        </React.Fragment>
                    )}
                    {isGoogleSignIn && (
                        <React.Fragment>
                            <p className='user-display-name'>Name: {displayName}</p>
                            {photoURL && <img src={photoURL} alt="User Profile" className="user-profile-picture" />}
                        </React.Fragment>
                    )}
                    <button onClick={handleLogout} className='button-29'>Logout</button>
                </div>
            </motion.div>
        </React.Fragment>
    )
}
