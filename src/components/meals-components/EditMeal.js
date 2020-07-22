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
			deliversOn: formState.deliversOn,
			orderStarts: formState.orderStarts,
			orderEnds: formState.orderEnds,
			maxOrders: parseInt(formState.maxOrders),
			cost: parseInt(formState.cost)
		};
		updateMeal(updatedMeal);
		history.push(`/meals/${updatedMeal._id}`);
	}

	// set initial form value
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

	useEffect(
		() => {
			// Set the formState to the fields in the post after mount and when post changes
			console.log('this runs');
			meal &&
				setFormState({
					...meal
				});
		},
		[ meal ]
	);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>What are we Cooking?</h1>
				<div>
					<label>Title</label>
					<input
						required
						type="text"
						name="title"
						value={formState.title}
						placeholder="Enter title"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Description</label>
					<textarea
						form="newMealForm"
						required
						name="description"
						value={formState.description}
						placeholder="Enter your meal"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Meal Type</label>
					<select required name="mealType" value={formState.mealType} onChange={handleChange}>
						<option value="lunch">Lunch</option>
						<option value="dinner">Dinner</option>
					</select>
				</div>
				<div>
					<label htmlFor="deliversOn">Pickup Time (date and time):</label>
					<input
						required
						type="datetime-local"
						id="deliversOn"
						name="deliversOn"
						value={formState.deliversOn}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="orderStarts"> Accepting order from (date and time):</label>
					<input
						required
						type="datetime-local"
						id="orderStarts"
						name="orderStarts"
						value={formState.orderStarts}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="orderEnds"> Order ends from (date and time):</label>
					<input
						required
						type="datetime-local"
						id="orderEnds"
						name="orderEnds"
						value={formState.orderEnds}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="maxOrders"> Max Order Quantity (between 1 and 50):</label>
					<input
						required
						type="number"
						id="maxOrders"
						name="maxOrders"
						value={formState.maxOrders}
						min="1"
						max="50"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label> Cost per meal </label>
					<input
						required
						type="number"
						value={formState.cost}
						min="1"
						step="any"
						name="cost"
						onChange={handleChange}
					/>
				</div>
				<input type="submit" value="Update Meal" />
			</form>
		</div>
	);
};

export default withRouter(EditMeal);
