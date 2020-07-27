import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-datepicker';
import Spinner from 'react-bootstrap/Spinner';

import moment from 'moment';

import React, { useState, useEffect } from 'react';
// import { withRouter, Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

import { useGlobalState } from '../../config/store';
import { updateMeal } from '../../services/mealServices';

const EditMeal = ({ history, location, match }) => {
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
		const updates = {
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
		updateMeal(updates)
			.then((updatedMeal) => {
				const otherMeals = meals.filter((meal) => meal._id !== updatedMeal._id);
				dispatch({
					type: 'setMeals',
					data: [ updatedMeal, ...otherMeals ]
				});
				dispatch({
					type: 'setInfo',
					data: {
						title: 'Success!',
						msg: 'We have created a meal with provided information.'
					}
				});
				history.push(`/meals/${updatedMeal._id}`);
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
	const [ formState, setFormState ] = useState(initialFormState);
	const [ errorMessage, setErrorMessage ] = useState(null);

  const { store, dispatch, loggedInUser } = useGlobalState();
	const { meals } = store;

  const { id } = (match && match.params) || {};

  const meal = id && meals && meals.find((storedMeal) => storedMeal._id === id);

	const deliversOnMin = moment().add(12, 'hours');
	const maxDate = moment().add(7, 'days').toDate();

	useEffect(
		() => {
			if (meal) {
				let { deliversOn, orderStarts, orderEnds } = meal;
				deliversOn = new Date(deliversOn);
				orderStarts = new Date(orderStarts);
				orderEnds = new Date(orderEnds);
				// Set the formState to the fields in the meal after mount and when meal changes
				setFormState({
					...meal,
					deliversOn,
					orderStarts,
					orderEnds
				});
			}
		},
		[ meal ]
  );
  
  if (meals === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }
	const form = (
		<Form onSubmit={handleSubmit}>
			<h2>What are we Cooking?</h2>
			{errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
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
				<Form.Control
					as="textarea"
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
			<Button variant="primary" type="submit">
				Update Meal
			</Button>
		</Form>
	);
	const unauthorized = (
		<p className="text-danger">
			Oops! It appears you are not an authorised seller with us. Make sure you have registered as a seller with
			us.
		</p>
	);
	const mealNotFound = <p className="text-danger mt-3">Oops! It appears we do not have meal with that id.</p>;
	return (
		<Container>
			<Row>
				<Col>
					{loggedInUser.role === 'seller' ? form : unauthorized}
					{!meal && mealNotFound}
				</Col>
			</Row>
		</Container>
	);
};

// export default withRouter(EditMeal);
export default EditMeal;
