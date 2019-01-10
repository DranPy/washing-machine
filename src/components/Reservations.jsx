import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, Form } from 'redux-form';
import { Button, Container, Row, Col } from 'reactstrap';
import _map from 'lodash/map';
import _cloneDeep from 'lodash/cloneDeep';

import ReactJson from 'react-json-view';
import moment from 'moment';

import { WEEK_DAYS } from '../common/constants';
import {
  clearReservations,
  saveReservations,
} from '../actions/machine';
import SingleDayReservations from './SingleDayReservations';
import './Reservations.scss';

const RENDER_TYPE = {
  line: 0,
  filed: 1
};

const isEmptyFields = ({ start, end, user }) => {
  const message = 'Can not be empty';
  const validator = {
    isValid: true,
    renderType: RENDER_TYPE.filed,
    error: {}
  };

  if (start == null) {
    validator.isValid = false;
    validator.error.start = message;
  }
  if (end == null) {
    validator.isValid = false;
    validator.error.end = message;
  }
  if (user == null) {
    validator.isValid = false;
    validator.error.user = message;
  }

  return validator;
}


const isEndAfterStartDate = ({ start, end }) => {
  const validator = {
    isValid: true,
    renderType: RENDER_TYPE.filed,
    error: {
      end: 'End time should be after start time'
    }
  };

  const startTime = moment(start).seconds(0).milliseconds(0);
  const endTime = moment(end).seconds(0).milliseconds(0);

  if (endTime.isBefore(startTime)) {
    validator.isValid = false;
  }

  return validator;
}

const isMaxDuration = ({ start, end }) => {
  const MAX_DURATION = 160;
  const validator = {
    isValid: true,
    renderType: RENDER_TYPE.filed,
    error: {
      end: 'Reservation too long'
    }
  };

  const startTime = moment(start);
  const endTime = moment(end);
  const duration = endTime.diff(startTime, 'minutes');

  if (duration > MAX_DURATION) {
    validator.isValid = false;
  }

  return validator;
};

const isDateOverlap = (reservations, errorMessage, breakMinutes = 0) => {
  const list = _cloneDeep(reservations)
  const validator = {
    isValid: true,
    renderType: RENDER_TYPE.line,
    error: errorMessage || 'Conflict between two reservations'
  };

  list.sort((previous, current) => {
    const previousDate = moment(previous.start);
    const currentDate = moment(current.start);
    const previousTime = previousDate.valueOf();
    const currentTime = currentDate.valueOf();

    return previousTime - currentTime;
  });

  for (let i = 1; i < list.length; i++) {
    const prevOrder = list[i - 1];
    const nextOrder = list[i];

    const isOverlap = moment(nextOrder.start).seconds(0).milliseconds(0)
      .isBetween(
        moment(prevOrder.start).seconds(0).milliseconds(0),
        moment(prevOrder.end).add(breakMinutes, 'minutes').seconds(0).milliseconds(0),
        'minutes',
        '[]'
      );

    if (isOverlap) {
      validator.isValid = false;
      break;
    }
  }

  return validator;
}

const isToClose = reservations => isDateOverlap(reservations, 'Two reservations too close to each other', 15)

const validate = (values, form) => {
  const errors = {};

  const addError = ({ isValid, renderType, error }, day) => {
    if (!isValid) {
      errors[day] = renderType === RENDER_TYPE.filed
        ? [...errors[day], error]
        : { _error: error }
    } else {
      errors[day].push({});
    };
  }

  _map(values, (reservations, day) => {
    let validator;
    errors[day] = [];

    if (reservations.length) {
      _map(reservations, reservation => {
        validator = isEmptyFields(reservation);

        if (validator.isValid)
          validator = isEndAfterStartDate(reservation);

        if (validator.isValid)
          validator = isMaxDuration(reservation);

        addError(validator, day);
      })

      if (validator.isValid)
        validator = isDateOverlap(reservations);

      if (validator.isValid)
        validator = isToClose(reservations);

      addError(validator, day)
    }
  });

  return errors;
};

const Reservations = ({
  users,
  clearReservations,
  handleSubmit,
  machine,
  saveReservations,
}) => (
    <Container className="reservations">
      <Form onSubmit={handleSubmit(saveReservations)}>
        <Row>
          <Col xs={8}>
            <h2>Reservations</h2>
            {_map(WEEK_DAYS, day => (
              <FieldArray
                key={`single-${day}`}
                component={SingleDayReservations}
                name={day}
                users={users}
              />
            ))}
            <Button color="primary" type="submit">
              Save data
            </Button>
          </Col>
          <Col xs={4}>
            <ReactJson src={machine} name="machineStoreState" />
            <Button
              onClick={clearReservations}
              color="warning"
              className="reservations__clear-btn"
            >
              Reset Data
          </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );


const getUserForSelect = users => {
  return users.map(({ firstName, lastName, id }) => ({ label: `${firstName} ${lastName}`, value: id }));
};

const mapStateToProps = state => ({
  users: getUserForSelect(state.users),
  machine: state.machine,
  initialValues: state.machine,
});

const mapDispatchToProps = {
  clearReservations,
  saveReservations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'reservations',
    validate,
    enableReinitialize: true,
  })(Reservations),
);
