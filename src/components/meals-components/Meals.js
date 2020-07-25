import Table from 'react-bootstrap/Table';
import React from 'react';
import ViewMeal from './ViewMeal';
import { useGlobalState } from '../../config/store';

const Meals = () => {
	const { store } = useGlobalState();
	const { meals } = store;
	// for table heading
	const tableHeadings = [
		'Title',
		'Description',
		'Meal Type',
		'Delivers On',
		'Order Starts',
		'Order Ends',
		'Max Orders',
		'Cost'
	];
	// Array for meal details
	const mealHeadings = [
		'title',
		'description',
		'mealType',
		'deliversOn',
		'orderStarts',
		'orderEnds',
		'maxOrders',
		'cost'
	];
	return (
		<div>
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
		</div>
	);
};

export default Meals;
