import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'

import React from 'react'
import { useGlobalState } from '../config/store'

function ShowAlert() {
  const { store, dispatch } = useGlobalState()
  const { error, info } = store
  function handleClose(type) {
    dispatch({
      type,
      data: null
    })
  }
  return (
    <Container className="my-3">
      {
        error && <Alert variant="danger" onClose={() => handleClose("setError")} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            {error}
          </p>
        </Alert>
      }
      {

        info && <Alert variant="success" onClose={() => handleClose("setInfo")} dismissible>
          <Alert.Heading>Hurray!</Alert.Heading>
          <p>
            {info}
          </p>
        </Alert>
      }
    </Container>
  );
}

export default ShowAlert