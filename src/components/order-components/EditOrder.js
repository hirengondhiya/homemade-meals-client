import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../../config/store'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const EditOrder = ({ history, match, updateOrder }) => {
  // handling the change in the form field
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  // handling after user submits
  function handleSubmit(event) {
    event.preventDefault();
    const updatedOrder = {
      _id: order._id,
      title: formState.title,
      cost: parseInt(formState.cost),
      pickupAt: formState.pickupAt,
      quantity: parseInt(formState.quantity),
      totalAmt: parseInt(order.cost) * parseInt(formState.quantity)
    };
    updateOrder(updatedOrder);
    history.push(`/order/${updatedOrder._id}`);
  }
  const { store, dispatch } = useGlobalState()
  const { orders } = store;
  const { id } = match.params || {}
  const meal = orders.find((meal) => meal.orders[0]._id === id)
  const { title, cost, orders: [order] } = meal;
  // initalformState from the order
  const initialFormState = {
    pickupAt: order.pickupAt,
    quantity: parseInt(order.quantity)
  };
  const [formState, setFormState] = useState(initialFormState);

  useEffect(
    () => {
      // Set the formState to the fields in the post after mount and when post changes
      order &&
        setFormState({
          ...order
        });
    },
    [order]
  );
  if (!meal) return null;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4}>
          <Form onSubmit={handleSubmit}>
            <h2>Order Meal</h2>
            <Form.Group>
              <Form.Label>Dish:</Form.Label>
              <Form.Control type="text" id="title" name="title" value={title} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cost:</Form.Label>
              <Form.Control type="text" id="cost" name="cost" value={cost} readOnly />
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
                value={cost * formState.quantity}
                readOnly
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" value="Update Order">
              Update Order
						</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOrder;
