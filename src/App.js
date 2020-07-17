import React, { useReducer, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import mealData from '../src/data/meal_data';
import stateReducer from './config/stateReducer';
import { StateContext } from './config/store';

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
			<StateContext.Provider value={{ store, dispatch }}>
				<BrowserRouter>
					<h1>Homemade Meals</h1>
					<Route exact path="/" component={Meals} />
				</BrowserRouter>
			</StateContext.Provider>
		</div>
	);
};

export default App;
