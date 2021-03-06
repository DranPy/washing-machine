import React from 'react';
import DatePicker from 'react-datepicker';

const TimePickerWrapper = ({
  input: { onChange, value },
  meta: { error },
  ...rest
}) => {
  // console.log(error);
  return (
    <React.Fragment>
      <DatePicker
        selected={value}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat="h:mm aa"
        timeCaption="Time"
        {...rest}
      />
      <span className="reservations__error">{error}</span>
    </React.Fragment>
  );
};
export default TimePickerWrapper;
