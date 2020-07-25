import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import moment from 'moment'

import React, { useState } from 'react';
// import { withRouter } from 'react-router-dom';

import { useGlobalState } from '../../config/store'
import { deleteMeal } from '../../services/mealServices'
import { Container } from "react-bootstrap";

const ViewMeal = ({ history, match, mealData }) => {
  // handle delete button
  function handleDelete(event) {
    event.preventDefault();
    deleteMeal(meal._id).then(() => {
      console.log("deleted meal")
      const updatedMeals = meals.filter((storedMeal) => storedMeal._id !== meal._id)
      dispatch({
        type: "setMeals",
        data: updatedMeals
      })
      dispatch({
        type: "setInfo",
        data: {
          title: "Deleted",
          msg: "We have deleted the meal for you."
        }
      })
      history.push("/")
    }).catch((err) => {
      const { status, data } = err.response || {}
      const { errorMsg } = data || {}
      if (status === 400)
        setErrorMessage(errorMsg)
      else if (status === 403)
        setErrorMessage("Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings.")
      else
        setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
    });
    history.push(`/meals`);
  }

  // handle edit button
  function handleEdit(event) {
    event.preventDefault();
    history.push(`/meals/edit/${meal._id}`);
  }

  const [errorMessage, setErrorMessage] = useState(null)
  const { store, dispatch, loggedInUser } = useGlobalState()
  const { meals } = store

  const { id } = (match && match.params) || {}
  const meal = mealData || (id && meals && Array.isArray(meals) && meals.find((meal) => meal._id === id))

  const {
    title,
    description,
    mealType,
    deliversOn,
    orderStarts,
    orderEnds,
    maxOrders,
    cost
  } = meal || {};

  const form = (
    <>
      <Form>
        <h1>Meal Details</h1>
        {
          errorMessage &&
          <p className="text-danger mt-3">{errorMessage}</p>
        }
        <Form.Group as={Row}>
          <Form.Label column lg="2"><strong>Title</strong></Form.Label>
          <Col lg="10">
            <Form.Control
              plaintext readOnly defaultValue={title}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column lg="2"><strong>Description</strong></Form.Label>
          <Col lg="12">
            <Form.Control as="textarea"
              plaintext readOnly defaultValue={description}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column lg="2"><strong>Meal Type</strong></Form.Label>
          <Col lg="10">
            <Form.Control
              plaintext readOnly defaultValue={mealType}
              className="text-capitalize"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column lg="2"><strong>Pickup Time</strong></Form.Label>
          <Col lg="10">
            {
              moment(deliversOn).format('MMMM Do YYYY, h:mm a')
            }
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column lg="2"><strong>Accepting order from</strong></Form.Label>
          <Col lg="10">
            {
              moment(orderStarts).format('MMMM Do YYYY, h:mm a')
            }
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column lg="2"><strong>Order ends from</strong></Form.Label>
          <Col lg="10">
            {
              moment(orderEnds).format('MMMM Do YYYY, h:mm a')
            }
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column lg="2"><strong>Max Order Quantity</strong></Form.Label>
          <Col lg="10">

            <Form.Control
              plaintext readOnly defaultValue={maxOrders}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column lg="2"><strong>Cost per meal</strong></Form.Label>
          <Col lg="10">
            <Form.Control
              plaintext readOnly defaultValue={cost}
            />
          </Col>
        </Form.Group>
      </Form>
      {
        loggedInUser && loggedInUser.role === "seller" &&
        (
          <>
            <Button variant="secondary" onClick={handleDelete} className="mr-4">Delete</Button>
            <Button variant="secondary" onClick={handleEdit}>Edit</Button>
          </>
        )
      }
      </>
  )
  const mealNotFound = (
    <p className="text-danger mt-3">Oops! It appears we do not have meal with that id.</p>
  )
  return (
    meal ? form : mealNotFound
  );
};

// export default withRouter(ViewMeal);
export default ViewMeal