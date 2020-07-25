import React from 'react';
import ViewMeal from './ViewMeal';
import { useGlobalState } from '../../config/store';

const Meals = () => {
	const { store } = useGlobalState();
	const { meals } = store;
	return (
		<div>
			<h3>Welcome to the Homemade Meals</h3>
		</div>
	);
};

export default Meals;
