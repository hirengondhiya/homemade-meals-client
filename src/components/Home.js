import Spinner from "react-bootstrap/Spinner";

import React from "react";
import MealCustomerView from "./meals-components/HomeCustomer";
import MealSellerView from "./meals-components/HomeSeller";

import { useGlobalState } from "../config/store";

export default function Home() {
  const { loggedInUser, store } = useGlobalState();
  const { meals } = store;

  let mealsData = [];

  // when meals data is not loaded
  if (!meals) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  let MealComponent;
  let msg = "";
  // when logged in user is seller
  // home page shows meals due to be delivered in ascending order
  if (loggedInUser && loggedInUser.role === "seller") {
    MealComponent = MealSellerView;
    mealsData = meals
      .filter((meal) => meal.dueSoon)
      .sort((a, b) => new Date(a.deliversOn) - new Date(b.deliversOn));
    if (mealsData.length === 0) {
      msg = "You don't have any meals to deliver";
    }
  } else {
    MealComponent = MealCustomerView;
    // otherwise show meals in based on orders closing
    mealsData = meals.sort(
      (a, b) => new Date(a.orderEnds) - new Date(b.orderEnds)
    );
    if (mealsData.length === 0) {
      msg =
        "We do not have any meals that can be ordered now. Please visit later.";
    }
  }

  return msg ? (
    <h2>{msg}</h2>
  ) : (
    mealsData.map((mealData) => (
      <MealComponent key={mealData._id} mealData={mealData} />
    ))
  );
}
