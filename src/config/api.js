import axios from 'axios'

// Create an axios instance
export default axios.create({
  // for netlify take value from environment variable
  baseURL: process.env.REACT_APP_MEALS_API || 'http://localhost:3010',
  timeout: 5000,
  withCredentials: true
})