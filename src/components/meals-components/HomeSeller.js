import Container from 'react-bootstrap/Container';

import moment from 'moment'

import React from 'react'

import OrdersTable from '../order-components/OrdersTableSellerView'

export default function Meal({ mealData }) {
  if (!mealData) {
    return <p>{JSON.stringify(mealData)}</p>
  }

  const { title, deliversOn, maxOrders, orderCount, orders } = mealData
  return (
    <div>
      <Container className="bg-light-purple my-4 p-3">
        <h2>Order details for {moment(deliversOn).format("dddd, DD/MM/YYYY hh:mm A")}</h2>
        <h4>{title}</h4>
        <h4>{`Total orders recieved: ${orderCount}`}</h4>
        <h4>{`Maximum orders: ${maxOrders}`}</h4>
        {
          orders.length > 0 &&
          <OrdersTable orders={orders} />
        }
      </Container >
    </div>
  )
}
