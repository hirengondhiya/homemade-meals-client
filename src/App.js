import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AddNewMeal from './components/meals-components/AddNewMeal';
import ViewMeal from './components/meals-components/ViewMeal';

const App = () => {
	const [ meals, setMeals ] = useState([]);

	// returns the meal of the id provided
	function getMealFromID(id) {
		const meal = meals.find((meal) => meal.id === id);
	}

	// Add a new meal
	function addMeal(newMeal) {
		setMeals([ ...meals, newMeal ]);
	}

	return (
		<div>
			<BrowserRouter>
				<h1>Homemade Meals</h1>
				<Route exact path="/meals/new" render={(props) => <AddNewMeal {...props} addMeal={addMeal} />} />
				<Route
					exact
					path="/meals/:id"
					render={(props) => <ViewMeal {...props} meal={getMealFromID(props.match.params.id)} />}
				/>
			</BrowserRouter>
		</div>
	);
};

export default App;
