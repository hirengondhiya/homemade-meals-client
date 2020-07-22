import React from 'react'
import { useGlobalState } from '../config/store'
import { logoutUser } from '../services/authServices'
import { NavLink } from 'react-router-dom';

// ternary operator: if user is logged in, will show logout link, else will show Guest, register and login link
const Nav = () => {
  // Logout user
  function handleLogout() {
    logoutUser().then((response) => {
      console.log("Got back response on logout", response.status)
    }).catch((error) => {
      console.log("The server may be down - caught an exception on logout:", error)
    })
    // Even if we catch an error, logout the user locally
    dispatch({
      type: "setLoggedInUser",
      data: null
    })
  }
  const { store, dispatch } = useGlobalState()
  const { loggedInUser } = store

  return (
    <div>
      {loggedInUser ? (
        <div>
          <NavLink to="/">{loggedInUser.username}</NavLink>

          {loggedInUser.role === 'buyer' ? (
            <div>
              <NavLink to="/myOrder">My Order</NavLink>
            </div>
          ) : (
              <div>
                <NavLink to="/meals/new">Create</NavLink>
                <NavLink to="history">Meals history</NavLink>
              </div>
            )}

          <NavLink to="/" onClick={handleLogout}>
            Logout
					</NavLink>
        </div>
      ) : (
          <div>
            <NavLink to="/">Guest</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
        )}

      <div>
        <NavLink to="/">Home</NavLink>
      </div>
    </div>
  );
};

export default Nav;
