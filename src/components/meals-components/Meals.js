import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import moment from 'moment';
import React from 'react';
import { useGlobalState } from '../../config/store';

const Meals = () => {
	const { store } = useGlobalState();
  const { meals } = store;
  
  if (!meals) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }
	const headings = {
		title: { heading: 'Title' },
		description: { heading: 'Description' },
		mealType: { heading: 'Meal Type' },
		cost: { heading: 'Cost' },
		deliversOn: { heading: 'Delivers On', type: 'date' },
		orderStarts: { heading: 'Order Starts', type: 'date' },
		orderEnds: { heading: 'Order Ends', type: 'date' },
		maxOrders: { heading: 'Max Orders' }
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
						</tr>
					</thead>
					<tbody>
						{meals.sort((a, b) => new Date(b.deliversOn) - new Date(a.deliversOn)).map((meal, index) => (
							<tr key={meal._id}>
								<td>{index + 1}</td>
								{Object.keys(headings).map((heading) => (
									<td>
										{headings[heading].type === 'date' ? (
											moment(meal[heading]).format('MMMM Do YYYY, h:mm a')
										) : (
											meal[heading]
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default Meals;
