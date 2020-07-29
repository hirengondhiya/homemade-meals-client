import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'


import moment from 'moment';
import React from 'react';
import {Link} from 'react-router-dom'
import { useGlobalState } from '../../config/store';
import { deleteMeal } from '../../services/mealServices'


const Meals = () => {
	const { store, dispatch } = useGlobalState();
	const { meals } = store;
	if (!meals) {
		return (
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		);
	}

	const linkStyles = {
		margin: '.5em'
	}

	const linkPadding = {
		padding : '.5em',
		margin: '.5em'
	}

	function handleDelete(meal) {
		deleteMeal(meal._id).then(() => {
		  console.log("deleted meal")
		  const updatedMeals = meals.filter((storedMeal) => storedMeal._id !== meal._id)
		  dispatch({
			type: "setMeals",
			data: updatedMeals
		  })
		  dispatch({
			type: "setInfo",
			data: {
			  title: "Deleted",
			  msg: "We have deleted the meal for you."
			}
		  })
		})
	}

	const headings = {
		title: { heading: 'Title' },
		mealType: { heading: 'Meal Type' },
		cost: { heading: 'Cost' },
		deliversOn: { heading: 'Delivers On', type: 'date' },
		orderStarts: { heading: 'Order Starts', type: 'date' },
		orderEnds: { heading: 'Order Ends', type: 'date' },
		maxOrders: { heading: 'Max Orders' },
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<h3>Meals History</h3>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							{Object.values(headings).map(({ heading }) => <th key={heading}>{heading}</th>)}
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{meals.sort((a, b) => new Date(b.deliversOn) - new Date(a.deliversOn)).map((meal, index) => (
							<tr key={meal._id}>
								<td>{index + 1}</td>
								{Object.keys(headings).map((heading) => (
									<td key={`${meal._id}${index}${heading}`}>
										{headings[heading].type === 'date' ? (
											moment(meal[heading]).format('DD/MM/YYYY hh:mm A')
										) : (
											meal[heading]
										)}
									</td>
								))}
								<td>
									{moment(meal.orderStarts).isAfter(moment()) ? (
										<>
										<Link style={linkStyles} className="btn btn-primary" to={`/meals/${meal._id}`}>View</Link>
										<Link style={linkStyles} className="btn btn-warning" to={`/meals/edit/${meal._id}`}>Edit</Link>
										<Button style={linkPadding} variant="danger" className="btn btn-danger" size='sm' onClick={
										(event) => {
											event.preventDefault()
											handleDelete(meal)	
										}
									}>Delete</Button>
										
										</>
									) : (
										<Link style={linkStyles} size="sm" className="btn btn-primary" to={`/meals/${meal._id}`}>View</Link>
									)}
								</td>
								
							</tr>
						))}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default Meals;
