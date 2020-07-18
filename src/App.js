import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AddNewMeal from './components/meals-components/AddNewMeal';

const App = () => {
	const [ meals, setMeals ] = useState([]);

	function addMeal(newMeal) {
		setMeals([ ...meals, newMeal ]);
	}

	return (
		<div>
			<BrowserRouter>
				<h1>Homemade Meals</h1>
				<Route exact path="/meals/new" render={(props) => <AddNewMeal {...props} addMeal={addMeal} />} />
			</BrowserRouter>
		</div>
	);
};

export default App;
