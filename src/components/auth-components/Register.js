import React, { useState } from 'react';

const Register = ({ history, registerUser }) => {
	const initialFormstate = {
		username: '',
		email: '',
		role: '',
		password: ''
	};

	const [ userInfo, setUserInfo ] = useState(initialFormstate);

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setUserInfo({
			...userInfo,
			[name]: value
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		registerUser(userInfo);
		if (userInfo.role === 'seller') {
			history.push('/meals/new');
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Username</label>
				<input required type="text" name="username" placeholder="Enter a username" onChange={handleChange} />
			</div>
			<div>
				<label>Email</label>
				<input required type="email" name="email" placeholder="Enter an email" onChange={handleChange} />
			</div>
			<div>
				<label>Role: </label>
				<select required name="role" onChange={handleChange}>
					<option value="buyer">Buyer</option>
					<option value="seller">Seller</option>
				</select>
			</div>

			<div>
				<label>Password</label>
				<input
					required
					type="password"
					name="password"
					placeholder="Enter a password"
					onChange={handleChange}
				/>
			</div>
			<input type="submit" value="Register" />
		</form>
	);
};

export default Register;
