import Table from 'react-bootstrap/Table';
import React from 'react';
import ViewMeal from './ViewMeal';
import { useGlobalState } from '../../config/store';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Meals = () => {
	const { store } = useGlobalState();
	const { meals } = store;
	// for table heading
	const tableHeadings = [
		'Title',
		'Description',
		'Meal Type',
		'Cost',
		'Delivers On',
		'Order Starts',
		'Order Ends',
		'Max Orders'
	];
	// Array for meal details
	const mealHeadings = [
		'title',
		'description',
		'mealType',
		'cost',
		'deliversOn',
		'orderStarts',
		'orderEnds',
		'maxOrders'
	];
	return (
		<Container>
			<Row className="justify-content-center">
				<h3>Welcome to the Homemade Meals</h3>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							{tableHeadings.map((heading) => <th key={heading}>{heading}</th>)}
						</tr>
					</thead>
					<tbody>
						{meals.sort((a, b) => new Date(b.deliversOn) - new Date(a.deliversOn)).map((meal, index) => (
							<tr key={meal._id}>
								<td>{index + 1}</td>
								{mealHeadings.map((heading) => <td>{meal[heading]}</td>)}
							</tr>
						))}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default Meals;
