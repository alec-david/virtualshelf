import React from 'react';
import { SingleDatePicker } from 'react-dates';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const formLabel = {
  marginBottom: '.3rem',
  color: 'rgba(0,0,0,.87)',
  fontSize: '.92857143em',
  fontWeight: 700,
  textTransform: 'none'
};

const DatePicker = props => {
  const { date, focus, handleDateChange, toggleFocus, disableFutureDays, label } = props;
  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={formLabel}>
        {label}{' '}
        <span style={{ color: 'red', display: 'inline-block', verticalAlign: 'top' }}>*</span>
      </label>
      <br />
      <SingleDatePicker
        date={date}
        onDateChange={handleDateChange}
        onFocusChange={({ focused }) => {
          toggleFocus(focused);
        }}
        isOutsideRange={disableFutureDays}
        focused={focus}
        numberOfMonths={1}
        showDefaultInputIcon
      />
    </div>
  );
};

export default DatePicker;
