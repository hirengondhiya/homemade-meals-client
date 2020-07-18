import React from 'react';

const ViewMeal = ({ meal }) => {
	if (!meal) return null;

	const { title, description, mealType, deliversOn, orderStarts, orderEnds, maxOrders, cost } = meal;

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
		</div>
	);
};

export default ViewMeal;
