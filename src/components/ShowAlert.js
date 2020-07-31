import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import React from "react";
import { useGlobalState } from "../config/store";

function ShowAlert() {
  const { store, dispatch } = useGlobalState();
  const { error, info } = store;
  function handleClose(type) {
    dispatch({
      type,
      data: null,
    });
  }
  return (
    <Container className="my-3">
      {error && (
        <Alert
          variant="danger"
          onClose={() => handleClose("setError")}
          dismissible
        >
          <Alert.Heading>
            {error.title || "Oh snap! You got an error!"}
          </Alert.Heading>
          <p>{error.msg}</p>
        </Alert>
      )}
      {info && (
        <Alert
          data-cy="alert-success"
          variant="success"
          onClose={() => handleClose("setInfo")}
          dismissible
        >
          <Alert.Heading>{info.title || "Hurray!"}</Alert.Heading>
          <p data-cy="alert-msg">{info.msg}</p>
        </Alert>
      )}
    </Container>
  );
}

export default ShowAlert;
