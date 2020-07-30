import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import moment from "moment";
import React from "react";

const OrdersTable = ({ orders }) => {
  if (!orders) {
    return null;
  }
  function generateTable(orders, showCancelAt) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Quantity</th>
            <th>Email</th>
            <th>Pickup Time</th>
            {showCancelAt && <th>Cancelled At</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const {
              quantity,
              pickupAt,
              customer: { username, email },
              cancelAt,
            } = order;
            return (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{quantity}</td>
                <td>{moment(pickupAt).format("hh:mm A")}</td>
                {showCancelAt && (
                  <td>{moment(cancelAt).format("DD/MM/YYYY hh:mm A")}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
  const active = orders
    .filter((order) => !order.cancelAt)
    .sort((a, b) => new Date(a.pickupAt) - new Date(b.pickupAt));

  const cancelled = orders.filter((order) => !!order.cancelAt);
  return (
    <Container>
      <div className="d-flex flex-wrap justify-content-center">
        {active.length > 0 && (
          <>
            <h2>Active Orders</h2>
            {generateTable(active)}
          </>
        )}
        {cancelled.length > 0 && (
          <>
            <h2>Cancelled Orders</h2>
            {generateTable(cancelled, true)}
          </>
        )}
      </div>
    </Container>
  );
};

export default OrdersTable;
