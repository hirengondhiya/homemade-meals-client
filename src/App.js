import './scss/custom-theme.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, { useState, useReducer, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddNewMeal from './components/meals-components/AddNewMeal';
import ViewMeal from './components/meals-components/ViewMeal';
import EditMeal from './components/meals-components/EditMeal';
import Register from './components/auth-components/Register';
import Meals from './components/meals-components/Meals';
import Login from './components/auth-components/Login';
import Nav from './components/Nav';
import OrderMeal from './components/order-components/OrderMeal';
import ViewOrder from './components/order-components/ViewOrder';
import EditOrder from './components/order-components/EditOrder';

import { StateContext } from './config/store';
import stateReducer from './config/stateReducer';
import { userAuthenticated } from './services/authServices';
const App = () => {
	const initialState = {
		loggedInUser: null
	};

	// Create state reducer store and dispatcher
	const [ store, dispatch ] = useReducer(stateReducer, initialState);

	useEffect(() => {
		// fetchBlogPosts()
		userAuthenticated()
			.then((user) => {
				dispatch({
					type: 'setLoggedInUser',
					data: user
				});
			})
			.catch((error) => {
				console.log('got an error trying to check authenticated user:', error);
				// setLoggedInUser(null)
				dispatch({
					type: 'setLoggedInUser',
					data: null
				});
			});
		// return a function that specifies any actions on component unmount
		return () => {};
	}, []);

	const [ meals, setMeals ] = useState([
		{
			mealType: 'lunch',
			_id: '5f196a73f3092d05dc0707c5',
			title: 'Pizza',
			description: 'Home made',
			deliversOn: '2020-07-20T22:08:11.000Z',
			orderStarts: '2020-07-18T00:08:11.000Z',
			orderEnds: '2020-07-20T06:08:11.000Z',
			maxOrders: 20,
			cost: 20,
			soldBy: {
				_id: '5f196a61f3092d05dc0707c4',
				username: 'hungry5',
				email: 'hungry@email.com',
				role: 'seller',
				createdAt: '2020-07-23T10:45:53.882Z',
				updatedAt: '2020-07-23T10:45:53.882Z',
				__v: 0
			},
			orders: [],
			createdAt: '2020-07-23T10:46:11.647Z',
			updatedAt: '2020-07-23T10:46:11.647Z',
			__v: 0
		}
	]);
	// const [ loggedInUser, setLoggedInUser ] = useState(null);

	const [ orders, setOrders ] = useState([]);

	// returns the meal of the id provided
	function getMealFromID(id) {
		let meal = meals.find((meal) => meal._id === id);
		return meal;
	}

	// returns the order from the id
	function getOrderFromId(id) {
		let order = orders.find((order) => order._id === id);
		return order;
	}

	// Add a new meal
	function addMeal(newMeal) {
		setMeals([ ...meals, newMeal ]);
	}

	// function add an order
	function addOrder(newOrder) {
		setOrders([ ...orders, newOrder ]);
	}

	// delete blog post that matched id
	function deleteMeal(id) {
		const updatedMeal = meals.find((meal) => meal._id !== id);
		return updatedMeal;
	}

	// cancel order with the specified id
	function cancelOrder(id) {
		const updatedOrder = orders.find((order) => order._id !== id);
		return updatedOrder;
	}

	// update meal that match id
	function updateMeal(updatedMeal) {
		const otherMeal = meals.filter((meal) => meal._id !== updatedMeal._id);
		setMeals([ ...otherMeal, updatedMeal ]);
	}

	// update Order
	function updateOrder(orderUpdate) {
		const otherOrder = orders.filter((order) => order._id !== orderUpdate._id);
		setOrders([ ...otherOrder, orderUpdate ]);
	}

	return (
		<div>
			<StateContext.Provider value={{ store, dispatch }}>
				<BrowserRouter>
					<Nav />
					<Container>
						<Row className="justify-content-center">
							<h1>Homemade Meals</h1>
							<Switch>
								<Route exact path="/" render={(props) => <Meals {...props} />} />
								<Route
									exact
									path="/meals/new"
									render={(props) => <AddNewMeal {...props} addMeal={addMeal} />}
								/>
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
										<EditMeal
											{...props}
											updateMeal={updateMeal}
											meal={getMealFromID(props.match.params.id)}
										/>
									)}
								/>
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								<Route
									exact
									path="/meals/:id/order"
									render={(props) => (
										<OrderMeal
											{...props}
											meal={getMealFromID(props.match.params.id)}
											addOrder={addOrder}
										/>
									)}
								/>
								<Route
									exact
									path="/order/:id"
									render={(props) => (
										<ViewOrder
											{...props}
											order={getOrderFromId(props.match.params.id)}
											showControls
											cancelOrder={cancelOrder}
										/>
									)}
								/>
								<Route
									exact
									path="/order/edit/:id"
									render={(props) => (
										<EditOrder
											{...props}
											order={getOrderFromId(props.match.params.id)}
											updateOrder={updateOrder}
										/>
									)}
								/>
							</Switch>
						</Row>
					</Container>
				</BrowserRouter>
			</StateContext.Provider>
		</div>
	);
};

export default App;
