import React from 'react';
import ViewMeal from './ViewMeal';
import { useGlobalState } from '../../config/store';

const Meals = () => {
	const { store } = useGlobalState();
	const { meals } = store;
	return (
		<div>
			<h3>Welcome to the Homemade Meals</h3>
			{meals
				.sort((a, b) => new Date(b.deliversOn) - new Date(a.deliversOn))
				.map((meal) => <ViewMeal key={meal._id} mealData={meal} />)}
		</div>
	);
};

export default Meals;
