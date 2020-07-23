import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const AddNewMeal = ({ history, addMeal }) => {
  // check if user is logged in otherwise route to login screen
  // provide return url
  // if (!loggedInUser) {
  //   history.push("/login")
  // }

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
    const newMeal = {
      _id: '5f123edeb40acb71b7aaf7f1',
      title: formState.title,
      description: formState.description,
      mealType: formState.mealType || 'lunch',
      deliversOn: formState.deliversOn.toISOString(),
      orderStarts: formState.orderStarts.toISOString(),
      orderEnds: formState.orderEnds.toISOString(),
      maxOrders: parseInt(formState.maxOrders),
      cost: parseInt(formState.cost)
    };
    addMeal(newMeal);
    history.push(`/meals/${newMeal._id}`);
  }

  const initialFormState = {
    title: '',
    description: '',
    mealType: 'lunch',
    deliversOn: moment().add(1, 'days').toDate(),
    orderStarts: moment().toDate(),
    orderEnds: moment().add(4, 'hours').toDate(),
    maxOrders: '',
    cost: ''
  };

  const [formState, setFormState] = useState(initialFormState);

  const deliversOnMin = initialFormState.deliversOn
  const maxDate = moment().add(7, 'days').toDate()

  // check if logged in user is seller otherwise show message you can not create a meal
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <h1>What are we Cooking?</h1>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control required type="text" name="title" placeholder="Enter title" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea"
                rows="5"
                form="newMealForm"
                required
                name="description"
                placeholder="Enter your meal"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Meal Type</Form.Label>
              <br />
              <Form.Label className="ml-3">
                <Form.Check type="radio" name="mealType" value="lunch" inline checked={formState.mealType === "lunch"} onClick={handleChange} />
              Lunch
              </Form.Label>
              <br />
              <Form.Label className="ml-3">
                <Form.Check type="radio" name="mealType" value="dinner" inline checked={formState.mealType === "dinner"} onClick={handleChange} />
              Dinner
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="deliversOn">Pickup Time (date and time):</Form.Label>
              <br />
              <DatePicker
                name="deliversOn"
                selected={formState.deliversOn}
                onChange={(selecteDate) => handleChange({ target: { name: "deliversOn", value: selecteDate } })}
                minDate={deliversOnMin}
                maxDate={maxDate}
                timeIntervals={15}
                showTimeSelect
                placeholderText="Select a date after today"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="orderStarts"> Accepting order from (date and time):</Form.Label>
              <br />
              <DatePicker
                name="orderStarts"
                selected={formState.orderStarts}
                onChange={(selecteDate) => handleChange({ target: { name: "orderStarts", value: selecteDate } })}
                maxDate={moment(formState.deliversOn).add(-1, 'day')}
                timeIntervals={15}
                showTimeSelect
                placeholderText="Select when order opens"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="orderEnds"> Order ends from (date and time):</Form.Label>
              <br />
              <DatePicker
                name="orderEnds"
                selected={formState.orderEnds}
                onChange={(selecteDate) => handleChange({ target: { name: "orderEnds", value: selecteDate } })}
                maxDate={moment(formState.deliversOn).add(-12, 'hours')}
                timeIntervals={15}
                showTimeSelect
                placeholderText="Select when order closes"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="maxOrders"> Max Order Quantity (between 1 and 50):</Form.Label>
              <Form.Control
                required
                type="number"
                id="maxOrders"
                name="maxOrders"
                min="1"
                max="50"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Cost per meal </Form.Label>
              <Form.Control required type="number" min="1" step="any" name="cost" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Add Meal</Button>
          </Form>
        </Col>
      </Row>
    </Container >
  );
};

export default withRouter(AddNewMeal);
