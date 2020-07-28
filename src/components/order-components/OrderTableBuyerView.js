import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../config/store';

const OrderTableBuyerView = () => {
	const { store } = useGlobalState();
	const { orders } = store;

	if (!orders) {
		return (
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		);
	}
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Order date</th>
					<th>Pickup date</th>
					<th>Quantity</th>
					<th>Total Amount</th>
				</tr>
			</thead>
			<tbody>
				{orders.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map((meal, index) => {
					const { title, orders: [ order ] } = meal;
					const { pickupAt, totalAmt, updatedAt, quantity, _id } = order;
					return (
						<tr key={_id}>
							<td>{index + 1}</td>
							<td>{title}</td>
							<td>{moment(updatedAt).format('DD/MM/YYYY hh:mm A')}</td>
							<td>{moment(pickupAt).format('DD/MM/YYYY hh:mm A')}</td>
							<td>{quantity}</td>
							<td>{totalAmt}</td>
							<td>
								<Link to={`/orders/${_id}`}>view</Link>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};
export default OrderTableBuyerView;
