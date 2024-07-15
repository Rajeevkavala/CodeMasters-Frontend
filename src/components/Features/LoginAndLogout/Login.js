import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../Auth/Context/AuthContext';
import './style.css';
import { toast } from 'react-toastify';
import { GoogleButton } from 'react-google-button';

export const Login = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const { signIn, forgotPassword, googleSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true); // Set loading to true
      await googleSignIn();
      setLoading(false); // Reset loading state
    } catch (error) {
      setLoading(false); // Reset loading state on error
      console.error(error);
      toast.error("Google Sign-in Failed");
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(false); // Reset loading state on successful sign-in
      toast.success("Google Sign-in Successful");
      navigate('/courses');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true); // Set loading to true
      await signIn(email, password);
      setLoading(false); // Reset loading state
      navigate('/courses');
      toast.success("Login Successful");
    } catch (e) {
      setLoading(false); // Reset loading state on error
      setError(e.message);
      if (e.message === "Firebase: Error (auth/invalid-credential).") {
        toast.error("Invalid Credentials");
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true
      await forgotPassword(resetEmail);
      setLoading(false); // Reset loading state
      setResetMessage("Password reset email sent. Please check your inbox.");
    } catch (e) {
      setLoading(false); // Reset loading state on error
      setResetMessage(e.message);
    }
  };

  return (
    <div className="login-container">
      <div className="container-one">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <form onSubmit={action === "Login" ? handleSubmit : handleForgotPassword}>
            {loading && ( // Conditionally render loading animation
              <div className="loader">
                <div className="justify-content-center jimu-primary-loading"></div>
              </div>
            )}
            {action === "Login" ? (
              <>
                <div className="input-field svg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='E-mail ID' required />
                </div>
                <div className="input-field svg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' required />
                </div>
                <div className='sign-in-google'>
                  <div className="google-btn">
                    <GoogleButton onClick={handleGoogleSignIn} />
                  </div>
                </div>
                <div className="submit-div-btn">
                  <button className='button-29'>Submit</button>
                </div>
                <div className="forgot-password">Forgot password? <span onClick={() => setAction("Forgot Password")}>Click Here!</span></div>
              </>
            ) : (
              <>
                <div className="input-field svg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
                  <input onChange={(e) => setResetEmail(e.target.value)} type="email" placeholder='Enter your email' required />
                </div>
                <div className="submit-div-btn">
                  <button className='submit-btn'>Reset Password</button>
                </div>
                <div className="back">
                  <div className="back-to-login submit" onClick={() => setAction("Login")}>&larr; Back to Login</div>
                </div>
              </>
            )}
            <div className="submit-container">
              <Link to="/signup" className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</Link>
              <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
