import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

const ViewOrder = ({ order }) => {
	if (!order) return null;

	const { title, quantity, pickupAt, totalAmt } = order;
	return (
		<Container>
			<Row className="justify-content-center">
				<p>Thank you for ordering with Homemade Meals. Your order details are: </p>
				<Jumbotron>
					<h3>Your Order</h3>
					<h5>Dish: {title}</h5>
					<h5>Quantity ordered: {quantity}</h5>
					<h5>Pickup time: {pickupAt}</h5>
					<h5>Total: ${parseInt(totalAmt)}</h5>
				</Jumbotron>
			</Row>
		</Container>
	);
};

export default ViewOrder;
