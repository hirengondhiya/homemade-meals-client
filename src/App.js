import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddNewMeal from './components/meals-components/AddNewMeal';
import ViewMeal from './components/meals-components/ViewMeal';
import EditMeal from './components/meals-components/EditMeal';
import Register from './components/auth-components/Register';

const App = () => {
	const [ meals, setMeals ] = useState([]);
	const [ loggedInUser, setLoggedInUser ] = useState(null);

	// returns the meal of the id provided
	function getMealFromID(id) {
		let meal = meals.find((meal) => meal._id === id);
		return meal;
	}

	// Add a new meal
	function addMeal(newMeal) {
		setMeals([ ...meals, newMeal ]);
	}

	// delete blog post that matched id
	function deleteMeal(id) {
		const updatedMeal = meals.find((meal) => meal._id !== id);
		return updatedMeal;
	}

	// update meal that match id
	function updateMeal(updatedMeal) {
		const otherMeal = meals.filter((meal) => meal._id !== updatedMeal._id);
		setMeals([ ...otherMeal, updatedMeal ]);
	}

	return (
		<div>
			<BrowserRouter>
				<h1>Homemade Meals</h1>
				<Switch>
					<Route exact path="/meals/new" render={(props) => <AddNewMeal {...props} addMeal={addMeal} />} />
					<Route
						exact
						path="/meals/:id"
						render={(props) => (
							<ViewMeal
								{...props}
								meal={getMealFromID(props.match.params.id)}
								showControls
								deleteMeal={deleteMeal}
							/>
						)}
					/>
					<Route
						exact
						path="/meals/edit/:id"
						render={(props) => (
							<EditMeal {...props} updateMeal={updateMeal} meal={getMealFromID(props.match.params.id)} />
						)}
					/>
					<Route exact path="/auth/register" render={(props) => <Register {...props} />} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
