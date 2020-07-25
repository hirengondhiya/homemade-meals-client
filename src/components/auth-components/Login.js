import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useGlobalState } from '../../config/store';
import { loginUser } from '../../services/authServices';
const Login = ({ history, location }) => {
	// inital state set to empty
	const initialFormState = {
		username: '',
		password: ''
	};
	// useState set to initalFormState
	const [ userInfo, setUserInfo ] = useState(initialFormState);

	const { referrer = '/', msg = null } = location.state || {};
	const [ errorMessage, setErrorMessage ] = useState(msg);

	// when user is logged in redirect back
	const { loggedInUser, setLoggedInUser, dispatch } = useGlobalState();
	if (loggedInUser) {
		return <Redirect to={referrer} />;
	}

	// handleChange
	function handleChange(event) {
		const { name, value } = event.target;
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
				// dispatch({
				//   type: "setLoggedInUser",
				//   data: user
				// })
				setLoggedInUser(user);
				dispatch({
					type: 'setInfo',
					data: {
						title: 'Success!',
						msg: `Welcome back, ${user.username}`
					}
				});
				history.push(referrer);
			})
			.catch((err) => {
				const { status } = err.response || {};
				if (status === 401) setErrorMessage('Authentication failed. Please check your username and password.');
				else setErrorMessage('Well, this is embarrassing... There was a problem on the server.');
			});
	}
	return (
		<Container>
			<Row className="justify-content-center">
				<Col lg={4}>
					<Form onSubmit={handleSubmit}>
						<h2>Login</h2>
						{errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
						<Form.Group>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								name="username"
								required
								placeholder="Enter username"
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								required
								placeholder="Enter password"
								onChange={handleChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit" className="mt-3">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
