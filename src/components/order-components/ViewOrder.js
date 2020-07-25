import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import moment from 'moment'

import { useGlobalState } from '../../config/store'

import { deleteOrder } from '../../services/orderServices'

const ViewOrder = ({ history, match }) => {
  const { store, dispatch, loggedInUser } = useGlobalState()
  const { orders } = store;
  const { id } = match.params || {}
  const meal = id && orders && orders.find(({ orders: [order] }) => order._id === id)
  const [errorMessage, setErrorMessage] = useState(null);
  if (!id || !meal) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }
  const { title, cost, orders: [order] } = meal || {};
  const { quantity, pickupAt, totalAmt, cancelAt } = order;
  const customerId = order.customer._id ? order.customer._id : order.customer
  function handleCancel(event) {
    event.preventDefault();
    // cancelOrder(order._id);
    deleteOrder(order._id)
      .then((order) => {
        const replaced = orders.map((meal) => {
          const [o] = meal.orders
          return o._id === order._id ? order : o
        })
        dispatch({
          type: "setOrders",
          data: replaced
        })
        history.push(`/`);
      })
      .catch((err) => {
        const { status, data } = err.response || {};
        const { errorMsg } = data || {};
        if (status === 400) setErrorMessage(errorMsg);
        else if (status === 403)
          setErrorMessage(
            'Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings.'
          );
        else setErrorMessage('Well, this is embarrassing... There was a problem on the server.');
      });
  }

  function handleEdit(event) {
    event.preventDefault();
    history.push(`/orders/edit/${order._id}`);
  }

  const buttonStyling = {
    margin: '.5em'
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-center flex-wrap">
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
            <Jumbotron>
              <h3>Your Order</h3>
              <h5>Dish: {title}</h5>
              <h5>Cost: {cost}</h5>
              <h5>Quantity ordered: {quantity}</h5>
              <h5>Pickup At: {moment(pickupAt).format('MMMM Do YYYY, h:mm:ss a')}</h5>
              {cancelAt && <h5>Cancelled: {moment(cancelAt).format('MMMM Do YYYY, h:mm:ss a')}</h5>}
              <h5>Total: ${parseInt(totalAmt)}</h5>
              {
                loggedInUser &&
                loggedInUser._id === customerId &&
                !cancelAt &&
                (
                  <>
                    <Button
                      variant="primary"
                      type="submit"
                      className="mt-3"
                      value="Update order"
                      style={buttonStyling}
                      onClick={handleEdit}
                    >
                      Edit Order
              </Button>
                    < Button
                      variant="warning"
                      type="submit"
                      className="mt-3"
                      value="Cancel order"
                      onClick={handleCancel}
                      style={buttonStyling}
                    >
                      Cancel Order
              </Button>
                  </>
                )}
            </Jumbotron>            
          </div>
        </Col>
      </Row>
    </Container >
  );
};

export default ViewOrder;
