import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import {useGlobalState} from '../../config/store'

const ViewOrder = ({ history, match, cancelOrder, showControls }) => {
  const { store, dispatch } = useGlobalState()
  const { orders } = store;
  const { id } = match.params || {}
  const meal = orders.find((meal) => meal.orders[0]._id === id)
  if (!meal) return null;
  const { title, cost, orders: [order] } = meal;
  const { quantity, pickupAt, totalAmt } = order;

  function handleCancel(event) {
    event.preventDefault();
    // cancelOrder(order._id);
    history.push(`/`);
  }

  function handleEdit(event) {
    event.preventDefault();
    history.push(`/order/edit/${order._id}`);
  }

  const buttonStyling = {
    margin: '.5em'
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <p>Thank you for ordering with Homemade Meals. Your order details are: </p>
        <Jumbotron>
          <h3>Your Order</h3>
          <h5>Dish: {title}</h5>
          <h5>Cost: {cost}</h5>
          <h5>Quantity ordered: {quantity}</h5>
          <h5>Pickup time: {pickupAt}</h5>
          <h5>Total: ${parseInt(totalAmt)}</h5>
          {showControls && (
            <div>
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                value="Update order"
                style={buttonStyling}
                onClick={handleEdit}
              >
                Edit Order
							</Button>
              <Button
                variant="warning"
                type="submit"
                className="mt-3"
                value="Cancel order"
                onClick={handleCancel}
                style={buttonStyling}
              >
                Cancel Order
							</Button>
            </div>
          )}
        </Jumbotron>
      </Row>
    </Container>
  );
};

export default ViewOrder;
