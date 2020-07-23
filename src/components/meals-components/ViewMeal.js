import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import React from 'react';

const ViewMeal = ({ history, meal, showControls, deleteMeal }) => {
  if (!meal) return null;

  const { title, description, mealType, deliversOn, orderStarts, orderEnds, maxOrders, cost } = meal;

  // handle delete button
  function handleDelete(event) {
    event.preventDefault();
    deleteMeal(meal._id);
    history.push(`/meals/new`);
  }

  // handle edit button
  function handleEdit(event) {
    event.preventDefault();
    history.push(`/meals/edit/${meal._id}`);
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <h1>Meal Details</h1>
            <Form.Group as={Row}>
              <Form.Label column lg="2"><strong>Title</strong></Form.Label>
              <Col lg="10">
                <Form.Control
                  plaintext readOnly defaultValue={title}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column lg="2"><strong>Description</strong></Form.Label>
              <Col lg="12">
                <Form.Control as="textarea"
                  plaintext readOnly defaultValue={description}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column lg="2"><strong>Meal Type</strong></Form.Label>
              <Col lg="10">
                <Form.Control
                  plaintext readOnly defaultValue={mealType}
                  className="text-capitalize"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column lg="2"><strong>Pickup Time</strong></Form.Label>
              <Col lg="10">
                <Form.Control
                  plaintext readOnly defaultValue={new Date(deliversOn).toLocaleString()}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column lg="2"><strong>Accepting order from</strong></Form.Label>
              <Col lg="10">
                <Form.Control
                  plaintext readOnly defaultValue={new Date(orderStarts).toLocaleString()}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column lg="2"><strong>Order ends from</strong></Form.Label>
              <Col lg="10">

                <Form.Control
                  plaintext readOnly defaultValue={new Date(orderEnds).toLocaleString()}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column lg="2"><strong>Max Order Quantity</strong></Form.Label>
              <Col lg="10">

                <Form.Control
                  plaintext readOnly defaultValue={maxOrders}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column lg="2"><strong>Cost per meal</strong></Form.Label>
              <Col lg="10">
                <Form.Control
                  plaintext readOnly defaultValue={cost}
                />
              </Col>
            </Form.Group>
          </Form>
          {showControls && (
            <>
              <Button variant="secondary" onClick={handleDelete} className="mr-4">Delete</Button>
              <Button variant="secondary" onClick={handleEdit}>Edit</Button>
            </>
          )}
        </Col>
      </Row>
    </Container >
  );
  // return (
  // 	<div>
  // 		<h1>Meal Details</h1>
  // 		<h2>Title: {title}</h2>
  // 		<h3>Description: {description}</h3>
  // 		<h3>Meal Type: {mealType}</h3>
  // 		<h3>Pickup Time: {deliversOn}</h3>
  // 		<h3>Accepting order: {orderStarts}</h3>
  // 		<h3>Order ends: {orderEnds}</h3>
  // 		<h3>Max Order: {maxOrders}</h3>
  // 		<h3>Cost per meal: {cost}</h3>
  // 		{showControls && (
  // 			<div>
  // 				<button onClick={handleDelete}>Delete</button>
  // 				<button onClick={handleEdit}>Edit</button>
  // 			</div>
  // 		)}
  // 	</div>
  // );
};

export default ViewMeal;
