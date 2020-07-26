import api from '../config/api'

// Returns a single meal based on the id provided
export function getMealFromId(meals, id) {
  const meal = meals.find((meal) => meal._id === id)
  return meal
}

// Returns all meals from the server
export async function getAllMeals(userRole = "") {
  const uri = userRole === "seller" ? "/meals" : "/meals/openfororders"
  const response = await api.get(uri)
  return response.data
}

// Adds a meal on the server
export async function addMeal(newMeal) {
  const response = await api.post("/meals", newMeal)
  return response.data
}

// Deletes a meal on the server
export async function deleteMeal(id) {
  const response = await api.delete(`/meals/${id}`)
  return response.data
}

export async function updateMeal(meal) {
  const response = await api.put(`/meals/${meal._id}`, meal)
  return response.data
}