import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const AddNewMeal = ({ history, addMeal }) => {
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
			deliversOn: formState.deliversOn,
			orderStarts: formState.orderStarts,
			orderEnds: formState.orderEnds,
			maxOrders: parseInt(formState.maxOrders),
			cost: parseInt(formState.cost)
		};
		addMeal(newMeal);
		history.push(`/meals/${newMeal._id}`);
	}

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

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>What are we Cooking?</h1>
				<div>
					<label>Title</label>
					<input required type="text" name="title" placeholder="Enter title" onChange={handleChange} />
				</div>
				<div>
					<label>Description</label>
					<textarea
						form="newMealForm"
						required
						name="description"
						placeholder="Enter your meal"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Meal Type</label>
					<select required name="mealType" onChange={handleChange}>
						<option value="lunch">Lunch</option>
						<option value="dinner">Dinner</option>
					</select>
				</div>
				<div>
					<label htmlFor="deliversOn">Pickup Time (date and time):</label>
					<input required type="datetime-local" id="deliversOn" name="deliversOn" onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="orderStarts"> Accepting order from (date and time):</label>
					<input required type="datetime-local" id="orderStarts" name="orderStarts" onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="orderEnds"> Order ends from (date and time):</label>
					<input required type="datetime-local" id="orderEnds" name="orderEnds" onChange={handleChange} />
				</div>

				<div>
					<label htmlFor="maxOrders"> Max Order Quantity (between 1 and 50):</label>
					<input
						required
						type="number"
						id="maxOrders"
						name="maxOrders"
						min="1"
						max="50"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label> Cost per meal </label>
					<input required type="number" min="1" step="any" name="cost" onChange={handleChange} />
				</div>
				<input type="submit" value="Add Meal" />
			</form>
		</div>
	);
};

export default withRouter(AddNewMeal);
