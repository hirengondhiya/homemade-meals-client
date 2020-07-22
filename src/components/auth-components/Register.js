import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import React, { useState } from 'react'
import { useGlobalState } from '../../config/store'
import { registerUser } from '../../services/authServices'
const Register = ({ history }) => {
  const initialFormState = {
    username: '',
    email: '',
    role: '',
    password: ''
  };
  const [userInfo, setUserInfo] = useState(initialFormState)
  const [errorMessage, setErrorMessage] = useState(null)
  const { dispatch } = useGlobalState()


  function handleChange(event) {
    const { name, value } = event.target
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { password, confirm } = userInfo
    if (password !== confirm) {
      return setErrorMessage("Password does not match. Please try again.")
    }

    registerUser(userInfo).then((user) => {
      dispatch({
        type: "setLoggedInUser",
        data: user
      })
      history.push("/")
    }).catch((error) => {
      const status = error.response ? error.response.status : 500
      if (status === 409) {
        // This username is already registered. Let the user know.
        setErrorMessage("This username already exists. Please login, or specify another username.")
      }
      else {
        // There was some other error - maybe the server or db is down
        setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
      }
      console.log(`registration failed with error: ${error} and status ${status}`)
    })
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={4}>
          <Form onSubmit={handleSubmit} >
            <h2>Register</h2>
            {
              errorMessage &&
              <p className="text-danger mt-3">{errorMessage}</p>
            }
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control required type="text" name="username" placeholder="Enter a username" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" name="email" placeholder="Enter an email" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role: </Form.Label>
              <br/>
              <Form.Label className="ml-3">
                <Form.Check type="radio" name="role" value="buyer" inline onClick={handleChange} />
              Buyer
              </Form.Label>
              <br/>
              <Form.Label className="ml-3">
                <Form.Check type="radio" name="role" value="seller" inline onClick={handleChange} />
              Seller
              </Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Enter a password"
                onChange={handleChange}
              />
              <Form.Control
                required
                type="password"
                name="confirm"
                placeholder="Confirm password"
                onChange={handleChange}
                className="mt-3"
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container >
  );
};

export default Register;
