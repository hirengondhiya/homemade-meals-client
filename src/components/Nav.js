import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import React from 'react'
import { useGlobalState } from '../config/store'
import { logoutUser } from '../services/authServices'
import { NavLink } from 'react-router-dom';

// ternary operator: if user is logged in, will show logout link, else will show Guest, register and login link
const Navigation = () => {
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
  // /*
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Homemade Meals</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {
              loggedInUser &&
              loggedInUser.role === 'buyer' &&
              <Nav.Link as={NavLink} to="/myorders">My Orders</Nav.Link>
            }
            {
              loggedInUser &&
              loggedInUser.role === 'seller' &&
              <>
                <Nav.Link as={NavLink} to="/meals/new">Create</Nav.Link>
                <Nav.Link as={NavLink} to="/mealshistory">Meals history</Nav.Link>
              </>
            }
          </Nav>
          <Nav>
            {
              !loggedInUser &&
              <>
                <Nav.Link as={NavLink} to="/register"  >Register</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              </>
            }
            {
              loggedInUser &&
              <>
                <Navbar.Text>
                  Logged in as: <strong>{loggedInUser.username}</strong>
                </Navbar.Text>
                <Nav.Link as={NavLink} to="/" onClick={handleLogout}>Logout</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Navigation;
