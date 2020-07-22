import React from 'react';
import { Link } from 'react-router-dom';

// ternary operator: if user is logged in, will show logout link, else will show Guest, register and login link
const Nav = ({ loggedInUser, logoutUser }) => {
	return (
		<div>
			{loggedInUser ? (
				<div>
					<Link to="/">{loggedInUser}</Link>
					<Link to="/" onClick={logoutUser}>
						Logout
					</Link>
				</div>
			) : (
				<div>
					<Link to="/">Guest</Link>
					<Link to="/register">Register</Link>
					<Link to="/login">Login</Link>
				</div>
			)}

			<div>
				<Link to="/">Home</Link>
			</div>
		</div>
	);
};

export default Nav;
