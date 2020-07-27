import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useGlobalState } from '../../config/store'
import Spinner from 'react-bootstrap/Spinner';

export default ({ component: Component, location, redirectMsg, role, ...rest }) => {
  const { loggedInUser, dispatch } = useGlobalState()

  if (loggedInUser === 'not-checked') {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

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
        msg: `As a ${loggedInUser.role}, you can not access that path.`
      }
    })
    return <Redirect to="/" />
  }
  console.log('rendering')
  return (
    <Route {...rest} location={location} render={(props) => <Component {...props} />} />
  )
}
