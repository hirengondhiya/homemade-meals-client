import { Form, Button, Container, FormControl, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react';
import { useGlobalState } from '../../config/store'
import { loginUser } from '../../services/authServices'
const Login = ({ history }) => {
  // inital state set to empty
  const initialFormState = {
    username: '',
    password: ''
  };

  // useState set to initalFormState
  const [userInfo, setUserInfo] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState(null)
  const { dispatch } = useGlobalState()

  // handleChange
  function handleChange(event) {
    const { name, value } = event.target
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }
  // handleSumbmit
  function handleSubmit(event) {
    event.preventDefault();
    loginUser(userInfo)
      .then((user) => {
        dispatch({
          type: "setLoggedInUser",
          data: user
        })
        history.push('/');
      })
      .catch((err) => {
        if (err.response && err.response.status === 401)
          setErrorMessage("Authentication failed. Please check your username and password.")
        else
          setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
      });
  }
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={4}>
          <Form onSubmit={handleSubmit} className="d-flex flex-wrap">
            <h2>Login</h2>
            {
              errorMessage &&
              <p className="text-danger mt-3">{errorMessage}</p>
            }
            <FormControl type="text" name="username" required placeholder="Username" onChange={handleChange} className="mt-3" />
            <FormControl type="password" name="password" required placeholder="Password" onChange={handleChange} className="mt-3" />
            <Button variant="primary" type="submit" className="mt-3 mx-auto" >Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container >
  );
};

export default Login;
