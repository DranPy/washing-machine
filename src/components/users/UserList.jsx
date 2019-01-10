import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types'

import { removeUser, removeAllUsers } from '../../actions/users/actions'; 

import './UserList.scss';

const UserListRow = ({ user, onRemoveUser }) => {
  const { firstName, lastName, roomNumber } = user;

  const handleRemove = () => {
    onRemoveUser(user)
  }

  return (
    <Row className="user-list__item">
      <Col>{firstName}</Col>
      <Col>{lastName}</Col>
      <Col>{roomNumber}</Col>
      <Col>
        <Button onClick={handleRemove} size="sm" color="danger">Remove</Button>
      </Col>
    </Row>
  )
}

class UserList extends Component {
  static propsType = {
    removeUser: PropTypes.func,
    removeAllUsers: PropTypes.func,
    users: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { removeUser, removeAllUsers, users } = this.props;

    return (
      <Fragment>
        <h2>User list</h2>
        <hr/>
        <div className="users-list">
          {users && users.map((user, key) => 
            <UserListRow 
              key={key}
              user={user} 
              onRemoveUser={removeUser} />
          )}
          <hr/>
          <Button onClick={removeAllUsers} color="danger">Clear list</Button>
        </div>
      </Fragment>
    );
  }
}


const mapDispatchToProps = {
  removeUser,
  removeAllUsers,
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);