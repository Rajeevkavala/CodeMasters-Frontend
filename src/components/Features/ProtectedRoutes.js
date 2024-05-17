import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './Auth/Context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Features/Auth/FireBase';
import { toast } from 'react-toastify';

const ProtectedRoutes = ({ children }) => {
  const { user } = UserAuth();
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const isEmailVerified = currentUser.emailVerified;
        setEmailVerified(isEmailVerified);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to handle email verification
  const handleEmailVerification = () => {
    setEmailVerified(true); 
    window.location.reload(); // Reload the page
    toast.success("Your E-mail is Verified")  // Update the email verification status
  };

  if (!user) {
    return (
      <div className="login-con">
        <div className="login-heading">
          <h1>Login To Proceed...</h1>
        </div>
        <div className="login-btn">
          <button className='button-29' onClick={() => navigate('/Login')}>Login</button>
        </div>
      </div>
    );
  } else if (user && !emailVerified) {
    return (
      <div className="login-con">
        <div className="login-heading">
          <h1>Please Verify Your Email Address</h1>
          <p>A verification email has been sent to your email address. Please verify your email to proceed.</p>
          <button onClick={handleEmailVerification} className='button-22'>I have verified my email</button>
        </div>
      </div>
    );
  }
  
  return children;
};

export default ProtectedRoutes;
