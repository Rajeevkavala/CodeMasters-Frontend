import React, { useEffect, useState } from 'react';
import { auth } from "../Features/Auth/FireBase";
import { NavLink } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AuthNav = ({ closeNavbar }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle clicks outside the navbar
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.nav-bar')) {
        closeNavbar(); // Close navbar if clicked outside
      }
    };

    document.addEventListener('click', handleOutsideClick);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [closeNavbar]);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticatedUser(user);
    });

    return () => {
      unsubscribe(); // Unsubscribe when component unmounts
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out Successfully");
        closeNavbar(); // Close navbar after logout
        navigate('/Login'); // Navigate to login page after logout
      })
      .catch(error => {
        toast.error("Error signing out:", error.message);
        // Provide feedback to the user, e.g., display an error message
      });
  };

  return (
    <>
      {/* Render different components based on authentication state */}
      {authenticatedUser ? (
        <>
          <li>
            <NavLink to='/Account' onClick={closeNavbar}>
              <img src="https://i.ibb.co/CstSd33/icons8-account-48-1.png" alt="" />
            </NavLink>
          </li>
          <li className="button-29-login">
            <button className="button-29" onClick={handleLogout}>Logout</button>
          </li>
        </>
      ) : (
        <li className="button-29-login">
          <NavLink to="/Login" id="form-open" onClick={closeNavbar}>
            <button className="button-29">Login</button>
          </NavLink>
        </li>
      )}
    </>
  );
};

export default AuthNav;
