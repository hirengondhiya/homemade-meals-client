import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/';
import Spinner from 'react-bootstrap/Spinner';

import moment from 'moment'

import React from 'react'
import { Link } from 'react-router-dom'

export default function Meal({ mealData }) {
  if (!mealData) {
    return null
  }

  const { title, description, cost, mealType, deliversOn, available, maxOrders, orderEnds } = mealData
  return (
    <div>
      <Container>
        <Jumbotron>
          <h2>{title}</h2>
          <h4>{description}</h4>
          <h5>Taking {mealType} orders for {moment(deliversOn).format("dddd, DD/MM/YYYY HH:mm A")}</h5>
          <Row>
            <Col lg={4}><h5>Cooking: {maxOrders}</h5></Col>
            <Col lg={4}><h5>Available: {available} meals</h5></Col>
            <Col lg={4}><h5>Cost: ${cost}</h5></Col>
          </Row>
          <h5>Place your orders by {moment(orderEnds).format("dddd, DD/MM/YYYY HH:mm A")}</h5>
          <div className="d-flex justify-content-center">
            <Link to={`/meals/${mealData._id}/order`} className="btn btn-primary btn-lg" role="button">Order Now</Link>
          </div>
        </Jumbotron>
      </Container >
    </div>
  )
}
