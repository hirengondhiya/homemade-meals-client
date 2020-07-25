import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useGlobalState } from '../../config/store'
// import {getLoggedInUser} from '../../services/authServices'

export default ({ component: Component, location, redirectMsg, ...rest }) => {
  const { loggedInUser } = useGlobalState()

  return (
    loggedInUser ?
      <Route {...rest} location render={(props) => <Component {...props} />} /> :
      <Redirect to={
        {
          pathname: '/login',
          state: {
            referrer: location.pathname,
            msg: redirectMsg
          }
        }
      } />
  )
}
