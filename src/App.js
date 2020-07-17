import React, { useReducer, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import mealData from '../src/data/meal_data';
import stateReducer from './config/stateReducer';

const App = () => {
	const initialState = {
		meals: []
	};

	const [ store, dispatch ] = useReducer(stateReducer, initialState);
	const { meals } = store;

	useEffect(() => {
		dispatch({
			type: 'setMeals',
			data: mealData
		});
	}, []);

	return (
		<div>
			<BrowserRouter>
				<h1>Homemade Meals</h1>
			</BrowserRouter>
		</div>
	);
};

export default App;
