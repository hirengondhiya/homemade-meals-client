import api from "../config/api";

export async function loginUser(userInfo) {
  // call to server to login user
  // return user info if successful and error if not
  const response = await api.post("/login", userInfo);
  console.log("got user back from server", response);
  return response.data;
}

export async function logoutUser() {
  // call to server to logout user
  return api.get("/logout");
}

export async function registerUser(userInfo) {
  // call to server to register user
  const response = await api.post("/register", userInfo);
  console.log("got user back from server", response);
  return response.data;
}

export async function userAuthenticated() {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.log("an error occurred checking for authenticated user");
    throw error;
  }
}
