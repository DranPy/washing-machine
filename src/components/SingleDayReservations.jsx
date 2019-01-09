import React, { Fragment } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Field } from 'redux-form';
import _capitalize from 'lodash/capitalize';
import Select from 'react-select';

import TimePickerWrapper from './TimePickerWrapper';

const SingleDayReservations = ({ fields, meta: { error }, users }) => {

  return [
    <Row key="header">
      <Col>
        <h5>{_capitalize(fields.name)}</h5>
        <span className="reservations__error">{error}</span>
      </Col>
    </Row>,
    <Row key="entry">
      {fields.map((name, index) => (
        <Row
          key={`${name}-${index}`}
          className="reservations__single-entry"
        >
          <Col xs={{ size: 3 }}>
            <Field
              className="form-control"
              name={`${name}.start`}
              component={TimePickerWrapper}
            />
          </Col>
          <Col xs={{ size: 3 }}>
            <Field
              className="form-control"
              name={`${name}.end`}
              component={TimePickerWrapper}
            />
          </Col>
          <Col xs={{ size: 3 }}>
            <Field
              name={`${name}.user`}
              component={({ input: { value, onChange, onBlur }, meta: { error } }) => (
                <Fragment>
                  <Select
                    value={value || ''}
                    onChange={selectedValue => onChange(selectedValue)}
                    onBlur={() => onBlur(value)}
                    options={users}
                    placeholder="Select"
                  />
                  <span className="reservations__error">{error}</span>
                </Fragment>
              )}
            />
          </Col>

          <Col xs={{ size: 2, offset: 1 }}>
            <Button
              onClick={() => {
                fields.remove(index);
              }}
              color="danger"
              className="reservations__remove-btn"
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
    </Row>,
    <Row key="footer">
      <Col xs={{ size: 3, offset: 6 }}>
        <Button
          onClick={() => {
            fields.push({ start: null, end: null });
          }}
          color="warning"
          className="reservations__clear-btn"
        >
          + Add Entry
        </Button>
      </Col>
    </Row>,
  ];
};

export default SingleDayReservations;
