import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import React, { useState } from 'react';

import { useGlobalState } from '../../config/store';
import { addMeal } from '../../services/mealServices';

const AddNewMeal = ({ history, location }) => {
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
    const {
      title,
      description,
      mealType = 'lunch',
      deliversOn,
      orderStarts,
      orderEnds,
      maxOrders,
      cost
    } = formState;
    const newMeal = {
      title,
      description,
      mealType,
      deliversOn: deliversOn.toISOString(),
      orderStarts: orderStarts.toISOString(),
      orderEnds: orderEnds.toISOString(),
      maxOrders: parseInt(maxOrders),
      cost: parseInt(cost)
    };
    addMeal(newMeal)
      .then((newMeal) => {
        dispatch({
          type: 'setMeals',
          data: [newMeal, ...meals]
        });
        dispatch({
          type: 'setInfo',
          data: {
            title: 'Hurray!',
            msg: 'We have created a meal with provided information.'
          }
        });
        history.push(`/meals/${newMeal._id}`);
      })
      .catch((err) => {
        const { status, data } = err.response || {};
        const { errorMsg } = data || {};
        if (status === 400) setErrorMessage(errorMsg);
        else if (status === 403)
          setErrorMessage(
            'Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings.'
          );
        else setErrorMessage('Well, this is embarrassing... There was a problem on the server.');
      });
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

  const { store, dispatch, loggedInUser } = useGlobalState();
	const { meals } = store;
	const [ errorMessage, setErrorMessage ] = useState(null);

  const [formState, setFormState] = useState(initialFormState);

  const deliversOnMin = initialFormState.deliversOn;
  const maxDate = moment().add(7, 'days').toDate();

  const form = (
    <Form onSubmit={handleSubmit}>
      <h2>What are we Cooking?</h2>
      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control required type="text" name="title" placeholder="Enter title" onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
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
          <Form.Check
            type="radio"
            name="mealType"
            value="lunch"
            inline
            checked={formState.mealType === 'lunch'}
            onClick={handleChange}
          />
					Lunch
				</Form.Label>
        <br />
        <Form.Label className="ml-3">
          <Form.Check
            type="radio"
            name="mealType"
            value="dinner"
            inline
            checked={formState.mealType === 'dinner'}
            onClick={handleChange}
          />
					Dinner
				</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="deliversOn">Pickup Time (date and time):</Form.Label>
        <br />
        <DatePicker
          name="deliversOn"
          selected={formState.deliversOn}
          onChange={(selecteDate) => handleChange({ target: { name: 'deliversOn', value: selecteDate } })}
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
          onChange={(selecteDate) => handleChange({ target: { name: 'orderStarts', value: selecteDate } })}
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
          onChange={(selecteDate) => handleChange({ target: { name: 'orderEnds', value: selecteDate } })}
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
      <Button variant="primary" type="submit">
        Add Meal
			</Button>
    </Form>
  );
  const unauthorized = (
    <p className="text-danger">
      Oops! It appears you are not an authorised seller with us. Make sure you have registered as a seller with
      us.
    </p>
  );
  // check if logged in user is seller otherwise show message you can not create a meal
  return (
    <Container>
      <Row>
        <Col>{loggedInUser.role === 'seller' ? form : unauthorized}</Col>
      </Row>
    </Container>
  );
};

// export default withRouter(AddNewMeal);
export default AddNewMeal;
