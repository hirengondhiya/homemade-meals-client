import React, { useState } from 'react';

const Register = () => {
	const initialFormstate = {
		username: '',
		email: '',
		role: '',
		password: ''
	};

	const [ userInfo, setUserInfo ] = useState(initialFormstate);

	return (
		<form>
			<div>
				<label>Username</label>
				<input required type="text" name="username" placeholder="Enter a username" />
			</div>
			<div>
				<label>Email</label>
				<input required type="email" name="email" placeholder="Enter an email" />
			</div>
			<div>
				<label>Role: </label>
				<select required name="role">
					<option value="buyer">Buyer</option>
					<option value="seller">Seller</option>
				</select>
			</div>

			<div>
				<label>Password</label>
				<input required type="password" name="password" placeholder="Enter a password" />
			</div>
			<input type="submit" value="Register" />
		</form>
	);
};

export default Register;
