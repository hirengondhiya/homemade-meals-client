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
		</Table>
	);
};
export default OrderTableBuyerView;
