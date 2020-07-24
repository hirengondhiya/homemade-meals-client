import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useReducer, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddNewMeal from './components/meals-components/AddNewMeal';
import ViewMeal from './components/meals-components/ViewMeal';
import EditMeal from './components/meals-components/EditMeal';
import Register from './components/auth-components/Register';
import Meals from './components/meals-components/Meals';
import Login from './components/auth-components/Login';
import Nav from './components/Nav';

import { StateContext } from './config/store'
import stateReducer from './config/stateReducer'
import {
  userAuthenticated,
} from "./services/authServices"
const App = () => {
  const initialState = {
    loggedInUser: null
  }

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer, initialState)

  useEffect(() => {
    // fetchBlogPosts()
    userAuthenticated().then((user) => {
      dispatch({
        type: "setLoggedInUser",
        data: user
      })
    }).catch((error) => {
      console.log("got an error trying to check authenticated user:", error)
      // setLoggedInUser(null)
      dispatch({
        type: "setLoggedInUser",
        data: null
      })
    })
    // return a function that specifies any actions on component unmount
    return () => { }
  }, [])

  const [meals, setMeals] = useState([]);
  // const [ loggedInUser, setLoggedInUser ] = useState(null);

  // returns the meal of the id provided
  function getMealFromID(id) {
    let meal = meals.find((meal) => meal._id === id);
    return meal;
  }

  // Add a new meal
  function addMeal(newMeal) {
    setMeals([...meals, newMeal]);
  }

  // delete blog post that matched id
  function deleteMeal(id) {
    const updatedMeal = meals.find((meal) => meal._id !== id);
    return updatedMeal;
  }

  // update meal that match id
  function updateMeal(updatedMeal) {
    const otherMeal = meals.filter((meal) => meal._id !== updatedMeal._id);
    setMeals([...otherMeal, updatedMeal]);
  }
  // function to register user
  // function registerUser(user) {
  //   setLoggedInUser(user.username);
  // }

  return (
    <div>
      <StateContext.Provider value={{ store, dispatch }}>
        <BrowserRouter>
          <Nav />
          <h1>Homemade Meals</h1>
          <Switch>
            <Route exact path="/" render={(props) => <Meals {...props} />} />
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
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
};

export default App;
