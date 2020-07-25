import './scss/custom-theme.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import React, { useReducer, useEffect, useState } from 'react';
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

import ShowAlert from './components/ShowAlert';
import AuthenticatedRoute from './components/auth-components/AuthenticatedRoute';

import { StateContext } from './config/store';
import stateReducer from './config/stateReducer';

import { getAllMeals } from './services/mealServices';
import { userAuthenticated } from './services/authServices';
import { getAllOrders } from './services/orderServices';

const App = () => {
  function fetchMealData() {
    const { role } = loggedInUser || {}
    getAllMeals(role)
      .then((meals) => {
        dispatch({
          type: 'setMeals',
          data: meals
        });
      })
      .catch((error) => {
        console.log('An error occurred fetching meals from the server:', error);
      });
  }
  const initialState = {
    meals: [],
    orders: [],
    error: null,
    info: null
  };
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState('loading')

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    fetchMealData()
    userAuthenticated()
      .then((user) => {
        setLoggedInUser(user);
      })
      .catch((error) => {
        console.log('got an error trying to check authenticated user:', error);
        setLoggedInUser(null);
      })
      .finally(() => {
        setLoadingStatus('session-checked')
      });
    // return a function that specifies any actions on component unmount
    return () => { };
  }, []);

  useEffect(
    () => {
      console.log('fetching meals data')
      fetchMealData()
      if (loggedInUser && loggedInUser.role === "buyer") {
        getAllOrders()
          .then((orders) => {
            dispatch({
              type: 'setOrders',
              data: orders
            });
          })
          .catch((err) => {
            dispatch({
              type: 'setOrders',
              data: []
            });
          })
      }
      // return a function that specifies any actions on component unmount
      return () => { };
    },
    [loggedInUser]
  );


  const [orders, setOrders] = useState([]);

  // returns the order from the id
  function getOrderFromId(id) {
    let order = orders.find((order) => order._id === id);
    return order;
  }

  // function add an order
  function addOrder(newOrder) {
    setOrders([...orders, newOrder]);
  }

  // cancel order with the specified id
  function cancelOrder(id) {
    const updatedOrder = orders.find((order) => order._id !== id);
    return updatedOrder;
  }

  // update Order
  function updateOrder(orderUpdate) {
    const otherOrder = orders.filter((order) => order._id !== orderUpdate._id);
    setOrders([...otherOrder, orderUpdate]);
  }

  return (
    <div>
      <StateContext.Provider value={{ store, dispatch, loggedInUser, setLoggedInUser }}>
        <BrowserRouter>
          <Nav />
          <ShowAlert />
          <Container>
            <Row>
              <Col className="mb-3">
                {
                  loadingStatus === 'loading' ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner> :
                    <Switch>
                      <Route exact path="/" render={(props) => <Meals {...props} />} />
                      <AuthenticatedRoute exact path="/meals/new" redirectMsg="Please login to create new meal" component={AddNewMeal} />
                      <Route exact path="/meals/:id" component={ViewMeal} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                      <AuthenticatedRoute exact path="/meals/edit/:id" redirectMsg="Please login to edit meal" component={EditMeal} />
                      <Route exact path="/meals/:id/order" component={OrderMeal} />
                      <Route exact path="/orders/:id" component={ViewOrder} />
                      <Route exact path="/orders/edit/:id" component={EditOrder} />
                    </Switch>
                }
              </Col>
            </Row>
          </Container>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
};

export default App;
