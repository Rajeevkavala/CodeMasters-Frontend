import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../Auth/Context/AuthContext';
import { toast } from 'react-toastify';
import { GoogleButton } from 'react-google-button';
import axios from 'axios';

export const SignUp = () => {
  const [action, setAction] = useState("Sign Up");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Create user with email, password, first name, and last name
      await createUser(email, password, firstName, lastName);
      // Create user with email, password, first name, and last name
      const userData = { email, password, firstName, lastName };
      await axios.post('https://gross-effie-rajeevkavala-2e775385.koyeb.app/register', userData);
      navigate('/');
      toast.success("Registration completed successfully");
    } catch (e) {
      setError(e.message);
      if (e.message === "Firebase: Error (auth/invalid-email).") {
        toast.error("Invalid E-Mail ID");
      }
      toast.error(e.message);
    }
  }

  return (
    <div className="login-container">
      <div className="container-one">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <div className="input-field svg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
              <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder='First Name' required />
            </div>
            <div className="input-field svg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
              <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder='Last Name' required />
            </div>
            <div className="input-field svg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
              <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='E-mail ID' required />
            </div>
            <div className="input-field svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
              <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' required />
            </div>
            <div className="submit-div-btn">
              <button className='button-29'>Submit</button>
            </div>
            <div className="submit-container">
              <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
              <Link to="/Login" className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
