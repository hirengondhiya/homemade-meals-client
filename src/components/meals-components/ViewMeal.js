import React from 'react';

const ViewMeal = ({ meal }) => {
	if (!meal) return null;

	const { title, description, mealType, deliversOn, orderStarts, orderEnds, maxOrders, cost } = meal;

	return (
		<div>
			<h1>{title}</h1>
			<p>{description}</p>
			<p>{mealType}</p>
			<p>{deliversOn}</p>
			<p>{orderStarts}</p>
			<p>{orderEnds}</p>
			<p>{maxOrders}</p>
			<p>{cost}</p>
		</div>
	);
};

export default ViewMeal;
