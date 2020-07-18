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
		<div>
			<h1>Meal Details</h1>
			<h2>Title: {title}</h2>
			<h3>Description: {description}</h3>
			<h3>Meal Type: {mealType}</h3>
			<h3>Pickup Time: {deliversOn}</h3>
			<h3>Accepting order: {orderStarts}</h3>
			<h3>Order ends: {orderEnds}</h3>
			<h3>Max Order: {maxOrders}</h3>
			<h3>Cost per meal: {cost}</h3>
			{showControls && (
				<div>
					<button onClick={handleDelete}>Delete</button>
					<button onClick={handleEdit}>Edit</button>
				</div>
			)}
		</div>
	);
};

export default ViewMeal;
