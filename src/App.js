import './scss/custom-theme.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddNewMeal from './components/meals-components/AddNewMeal';
import ViewMeal from './components/meals-components/ViewMeal';
import EditMeal from './components/meals-components/EditMeal';
import Register from './components/auth-components/Register';
import Meals from './components/meals-components/Meals';
import Login from './components/auth-components/Login';
import Nav from './components/Nav';
import ShowAlert from './components/ShowAlert';
import AuthenticatedRoute from './components/auth-components/AuthenticatedRoute'

import { StateContext } from './config/store'
import { getAllMeals } from './services/mealServices'

import stateReducer from './config/stateReducer'
import {
  userAuthenticated,
} from "./services/authServices"
const App = () => {
  const initialState = {
    meals: [],
    error: null,
    info: null
  }
  const [loggedInUser, setLoggedInUser] = useState(null)

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer, initialState)

  useEffect(() => {
    userAuthenticated().then((user) => {
      dispatch({
        type: "setLoggedInUser",
        data: user
      })
      setLoggedInUser(user)
    }).catch((error) => {
      console.log("got an error trying to check authenticated user:", error)
      setLoggedInUser(null)
      dispatch({
        type: "setLoggedInUser",
        data: null
      })
    })
    // return a function that specifies any actions on component unmount
    return () => { }
  }, [])

  useEffect(() => {
    if (loggedInUser) {
      console.log('fetching meals data.')
      getAllMeals().then((meals) => {
        dispatch({
          type: "setMeals",
          data: meals
        })
      }).catch((error) => {
        // dispatch({
        //   type: "setError",
        //   data: true
        // })
        console.log("An error occurred fetching meals from the server:", error)
      })
    } else {
      dispatch({
        type: "setMeals",
        data: []
      })
    }
    // return a function that specifies any actions on component unmount
    return () => { }
  }, [loggedInUser])

  return (
    <div>
      <StateContext.Provider value={{ store, dispatch, loggedInUser, setLoggedInUser }}>
        <BrowserRouter>
          <Nav />
          <ShowAlert />
          <Container>
            <Row>              
              <Col className="mb-3">
                <Switch>
                  <Route exact path="/" render={(props) => <Meals {...props} />} />
                  <AuthenticatedRoute exact path="/meals/new" redirectMsg="Please login to create new meal" component={AddNewMeal} />
                  <Route exact path="/meals/:id" component={ViewMeal} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <AuthenticatedRoute exact path="/meals/edit/:id" redirectMsg="Please login to edit meal" component={EditMeal} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
};

export default App;
