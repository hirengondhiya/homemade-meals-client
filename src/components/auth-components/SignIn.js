import React, { useState } from 'react';

const SignIn = ({ history }) => {
	// inital state set to empty
	const initialFormState = {
		username: '',
		password: ''
	};

	// useState set to initalFormState
	const [ userInfo, setUserInfo ] = useState(initialFormState);

	// handleChange
	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setUserInfo({
			...userInfo,
			[name]: value
		});
	}

	// handleSumbmit
	function handleSubmit(event) {
		event.prevenDefault();
		loginUser(userInfo);
		history.push('/');
	}
	return (
		// form to login
		// handleChange and handleSubmit function to make form field controlled form
		<form onSubmit={handleSubmit}>
			<div>
				<label>Username</label>
				<input required type="text" name="username" placeholder="Enter a username" onChange={handleChange} />
			</div>
			<div>
				<label>Password</label>
				<input
					required
					type="password"
					name="password"
					placeholder="Enter your password"
					onChange={handleChange}
				/>
			</div>
			<input type="submit" value="Login" />
		</form>
	);
};

export default SignIn;
