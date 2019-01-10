import React from 'react';
import { Row, Col, Container } from "reactstrap";

import AddUserForm from './../components/users/AddUserForm'
import UserList from './../components/users/UserList'

const Users = () => {
  return (
    <Container>
      <br />
      <Row>
        <Col>
          <AddUserForm />
        </Col>
        <Col>
          <UserList />
        </Col>
      </Row>
    </Container>
  );
};

export default Users;