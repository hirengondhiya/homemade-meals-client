import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useGlobalState } from '../../config/store'

const OrderMeal = ({ history, match, addOrder }) => {
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newOrder = {
      mealId: meal._id,
      pickupAt: new Date(formState.pickupAt).toISOString(),
      quantity: parseInt(formState.quantity),
      totalAmt: parseInt(meal.cost) * parseInt(formState.quantity)
    };
    // addOrder(newOrder);
    dispatch({
      type: 'setOrders',
      data: [newOrder, ...store.orders]
    })
    history.push(`/order/${newOrder._id}`);
  }
  const { store, dispatch } = useGlobalState()
  const { id } = (match && match.params) || {}

  const meal = store.meals.find((meal) => meal._id === id)

  const initialFormState = {
    pickupAt: new Date(meal.deliversOn),
    quantity: parseInt(1)
  };
  const [formState, setFormState] = useState(initialFormState);

  if (!id || !meal) {
    return (
      <p className="text-danger mt-3">Can not find meal!</p>
    )
  }
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4}>
          <Form onSubmit={handleSubmit}>
            <h2>Order Meal</h2>
            <Form.Group>
              <Form.Label>Dish:</Form.Label>
              <Form.Control type="text" id="title" name="title" value={meal.title} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cost:</Form.Label>
              <Form.Control type="text" id="cost" name="cost" value={meal.cost} readOnly />
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
                value={meal.cost * formState.quantity}
                readOnly
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" value="Confirm Order">
              Confirm Order
						</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderMeal;
