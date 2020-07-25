import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OrderMeal = ({ history, meal, addOrder }) => {
	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setFormState({
			...formState,
			[name]: value
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		const newOrder = {
			_id: '5f123edeb40acb71b7aaf7f3',
			title: formState.title,
			cost: parseInt(formState.cost),
			pickupAt: formState.pickupAt,
			quantity: parseInt(formState.quantity),
			totalAmt: parseInt(meal.cost) * parseInt(formState.quantity)
		};
		addOrder(newOrder);
		history.push(`/order/${newOrder._id}`);
	}

	const initialFormState = {
		title: meal.title,
		cost: parseInt(meal.cost),
		pickupAt: '2020-07-20T22:08:11.000',
		quantity: parseInt(1)
	};

	const [ formState, setFormState ] = useState(initialFormState);

	return (
		<Container>
			<Row className="justify-content-center">
				<Col lg={4}>
					<Form onSubmit={handleSubmit}>
						<h2>Order Meal</h2>
						<Form.Group>
							<Form.Label>Dish:</Form.Label>
							<Form.Control type="text" id="title" name="title" value={formState.title} readOnly />
						</Form.Group>
						<Form.Group>
							<Form.Label>Cost:</Form.Label>
							<Form.Control type="text" id="cost" name="cost" value={formState.cost} readOnly />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="pickupAt">Pickup Time (date and time):</Form.Label>
							<Form.Control
								required
								type="datetime-local"
								id="pickupAt"
								name="pickupAt"
								value={formState.pickupAt}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="quantity"> Max Order Quantity (between 1 and 50):</Form.Label>
							<Form.Control
								required
								type="number"
								id="quantity"
								name="quantity"
								min="1"
								max="50"
								value={formState.quantity}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Total:</Form.Label>
							<Form.Control
								type="number"
								id="totalAmt"
								name="totalAmt"
								value={meal.cost * formState.quantity}
								readOnly
								// defaultValue={meal.cost}
								// onChange={handleChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit" className="mt-3" value="Confirm Order">
							Confirm Order
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default OrderMeal;
