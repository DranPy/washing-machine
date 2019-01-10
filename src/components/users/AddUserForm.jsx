import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from "reactstrap";

import { addUser } from '../../actions/users/actions'; 


class AddUserForm extends Component {

  render() {
    const { handleSubmit, pristine, addUser } = this.props;

    return (
      <div>
        <h2>Add user</h2>
        <hr/>
        <Form onSubmit={handleSubmit(addUser)}>
          <div className="row form-group">
            <div className="col-4">
              <label>First name</label>
            </div>
            <div className="col-8">
              <Field className="form-control" name="firstName" component="input" type="text" />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-4">
              <label>Last name</label>
            </div>
            <div className="col-8">
              <Field className="form-control" name="lastName" component="input" type="text" />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-4">
              <label>Room number</label>
            </div>
            <div className="col-8">
              <Field className="form-control" name="roomNumber" component="input" type="number" />
            </div>
          </div>

          <div className="commands">
            <Button
              color="warning"
              disabled={pristine}
            >
              Add
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'users',
  })(AddUserForm),
);