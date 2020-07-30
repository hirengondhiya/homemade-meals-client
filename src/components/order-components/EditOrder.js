import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../config/store";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import DatePicker from "react-datepicker";

import { updateOrder } from "../../services/orderServices";

const EditOrder = ({ history, match }) => {
  // handling the change in the form field
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  // handling after user submits
  function handleSubmit(e) {
    e.preventDefault();
    const updates = {
      _id: formState.orderId,
      pickupAt: formState.pickupAt.toISOString(),
      quantity: parseInt(formState.quantity),
      totalAmt: parseInt(meal.cost) * parseInt(formState.quantity),
    };
    updateOrder(updates)
      .then((updatedOrder) => {
        const {
          orders: [order],
        } = updatedOrder;
        const others = orders.filter((m) => m.orders[0]._id !== order._id);
        dispatch({
          type: "setOrders",
          data: [updatedOrder, ...others],
        });
        dispatch({
          type: "setInfo",
          data: {
            title: "Success!",
            msg: "We have updated your order.",
          },
        });
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
  // initalformState from the order
  const initialFormState = {
    pickupAt: "",
    quantity: "",
    pickupAtMin: new Date(),
    pickupAtMax: new Date(),
    customerId: "",
    cancelAt: "",
    orderId: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  const { store, dispatch } = useGlobalState();
  const { orders } = store;
  const { id } = match.params || {};

  let meal =
    id &&
    Array.isArray(orders) &&
    orders.find(({ orders: [order] }) => order._id === id);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (meal) {
      const {
        deliversOn,
        orders: [order],
      } = meal || {};
      const { _id, quantity, pickupAt, cancelAt } = order;
      const customerId = order.customer._id
        ? order.customer._id
        : order.customer;
      // Set the formState to the fields in the post after mount and when post changes
      order &&
        setFormState({
          pickupAt: new Date(pickupAt),
          quantity,
          pickupAtMin: new Date(deliversOn),
          pickupAtMax: new Date(deliversOn),
          customerId,
          cancelAt,
          orderId: _id,
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
  if (formState.cancelAt) {
    dispatch({
      type: "setError",
      data: {
        title: "Not allowed",
        msg: "Cannot edit cancelled meal. Please create new order.",
      },
    });
    history.push("/");
  }
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4}>
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
              <Form.Label htmlFor="pickupAt">
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
            <Button variant="primary" type="submit" className="mt-3">
              Update Order
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOrder;
