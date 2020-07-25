import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useGlobalState } from '../../config/store'

export default ({ component: Component, location, redirectMsg, role, ...rest }) => {
  const { loggedInUser, dispatch } = useGlobalState()

  if (!loggedInUser) {
    return <Redirect to={
      {
        pathname: '/login',
        state: {
          referrer: location.pathname,
          msg: redirectMsg
        }
      }
    } />
  }

  if (typeof (role) !== "undefined" && loggedInUser.role !== role) {
    dispatch({
      type: "setError",
      data: {
        title: "Sorry that action is not allowed.",
        msg: `As a ${loggedInUser.role }, you can not access that path.`
      }
    })
  }

  return (
      <Route {...rest} location={location} render={(props) => <Component {...props} />} />      
  )
}
