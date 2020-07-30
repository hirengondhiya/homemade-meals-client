import api from "../config/api";

// Returns a single order based on the id provided
export function getOrderFromId(orders, id) {
  const order = orders.find((order) => order._id === id);
  return order;
}

// Returns all orders from the server
export async function getAllOrders() {
  const response = await api.get("/orders");
  return response.data;
}

// Adds an order on the server
export async function addOrder(newOrder) {
  const response = await api.post("/orders", newOrder);
  return response.data;
}

// Cancels an order on the server
export async function deleteOrder(id) {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
}

export async function updateOrder(order) {
  const response = await api.put(`/orders/${order._id}`, order);
  return response.data;
}
