import Spinner from 'react-bootstrap/Spinner';

import React from 'react'
import ViewMeal from './meals-components/ViewMeal'

import { useGlobalState } from '../config/store'

export default function Home() {
  const { loggedInUser, store } = useGlobalState()
  const { meals } = store

  let mealsData = [];

  // when meals data is not checked
  if (!meals) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )    
  }

  // when logged in user is seller
  // home page shows meals due to be delivered in ascending order
  if (loggedInUser && loggedInUser.role === "seller") {
    mealsData = meals.filter((meal) => meal.dueSoon).sort((a, b) => new Date(a.deliversOn) - new Date(b.deliversOn))
  } else {
    // otherwise show meals in based on orders closing
    mealsData = meals.sort((a, b) => new Date(a.orderEnds) - new Date(b.orderEnds))
  }

  return (
    mealsData.map((mealData) => <ViewMeal mealData={mealData} />)
  )
}
