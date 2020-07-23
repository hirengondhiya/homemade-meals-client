import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const EditMeal = ({ history, updateMeal, meal }) => {
  console.log('meal', meal);
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
    const updatedMeal = {
      _id: meal._id,
      title: formState.title,
      description: formState.description,
      mealType: formState.mealType,
      deliversOn: formState.deliversOn.toISOString(),
      orderStarts: formState.orderStarts.toISOString(),
      orderEnds: formState.orderEnds.toISOString(),
      maxOrders: parseInt(formState.maxOrders),
      cost: parseInt(formState.cost)
    };
    updateMeal(updatedMeal);
    history.push(`/meals/${updatedMeal._id}`);
  }

  // set initial Form value
  const initialFormState = {
    title: '',
    description: '',
    mealType: '',
    deliversOn: '',
    orderStarts: '',
    orderEnds: '',
    maxOrders: '',
    cost: ''
  };

  const [formState, setFormState] = useState(initialFormState);

  useEffect(
    () => {
      let {
        deliversOn,
        orderStarts,
        orderEnds
      } = meal
      deliversOn = new Date(deliversOn)
      orderStarts = new Date(orderStarts)
      orderEnds = new Date(orderEnds)

      // Set the formState to the fields in the post after mount and when post changes
      meal &&
        setFormState({
          ...meal,
          deliversOn,
          orderStarts,
          orderEnds
        });
    },
    [meal]
  );

  const deliversOnMin = moment().add(12, 'hours')
  const maxDate = moment().add(7, 'days').toDate()

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <h1>What are we Cooking?</h1>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={formState.title}
                placeholder="Enter title"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea"
                rows="5"
                Form="newMealForm"
                required
                name="description"
                value={formState.description}
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
              {
                // <select required name="mealType" value={formState.mealType} onChange={handleChange}>
                //   <option value="lunch">Lunch</option>
                //   <option value="dinner">Dinner</option>
                // </select>
              }
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
                value={formState.maxOrders}
                min="1"
                max="50"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Cost per meal </Form.Label>
              <Form.Control
                required
                type="number"
                value={formState.cost}
                min="1"
                step="any"
                name="cost"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Update Meal</Button>
          </Form>
        </Col>
      </Row>
    </Container >
  );
};

export default withRouter(EditMeal);
