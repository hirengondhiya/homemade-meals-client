import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DatePicker from "react-datepicker";

import { useGlobalState } from "../../config/store";
import { addOrder } from "../../services/orderServices";

const OrderMeal = ({ history, match }) => {
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newOrder = {
      mealId: meal._id,
      pickupAt: new Date(formState.pickupAt).toISOString(),
      quantity: parseInt(formState.quantity),
      totalAmt: parseInt(meal.cost) * parseInt(formState.quantity),
    };
    addOrder(newOrder)
      .then((mealOrder) => {
        dispatch({
          type: "setOrders",
          data: [mealOrder, ...store.orders],
        });
        dispatch({
          type: "setInfo",
          data: {
            msg: "Your order is confirmed!",
          },
        });
        const {
          orders: [order],
        } = mealOrder;
        history.push(`/orders/${order._id}`);
      })
      .catch((err) => {
        const { status, data } = err.response || {};
        const { errorMsg } = data || {};
        if (status === 400) setErrorMessage(errorMsg);
        else if (status === 403)
          setErrorMessage(
            "Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings."
          );
        else
          setErrorMessage(
            "Well, this is embarrassing... There was a problem on the server."
          );
      });
  }
  const initialFormState = {
    pickupAt: "",
    quantity: "",
    pickupAtMin: new Date(),
    pickupAtMax: new Date(),
  };
  const [formState, setFormState] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState(null);
  const { store, dispatch } = useGlobalState();
  const { id } = (match && match.params) || {};
  const meal = id && store.meals && store.meals.find((meal) => meal._id === id);

  useEffect(() => {
    if (meal) {
      setFormState({
        pickupAt: new Date(meal.deliversOn),
        quantity: parseInt(1),
        pickupAtMin: new Date(meal.deliversOn),
        pickupAtMax: new Date(meal.deliversOn),
      });
    }
  }, [meal]);

  if (!id || !meal) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Form onSubmit={handleSubmit}>
            <h2>Order Meal</h2>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
            <Form.Group>
              <Form.Label>Dish:</Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                value={meal.title}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cost:</Form.Label>
              <Form.Control
                type="text"
                id="cost"
                name="cost"
                value={meal.cost}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="pickupAt" className="mr-4">
                Pickup Time (date and time):
              </Form.Label>
              <DatePicker
                name="pickupAt"
                selected={formState.pickupAt}
                onChange={(selectedDate) =>
                  handleChange({
                    target: { name: "pickupAt", value: selectedDate },
                  })
                }
                minDate={formState.pickupAtMin}
                maxDate={formState.pickupAtMax}
                timeIntervals={15}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="quantity">
                {" "}
                Max Order Quantity (between 1 and 50):
              </Form.Label>
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
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              value="Confirm Order"
            >
              Confirm Order
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderMeal;
