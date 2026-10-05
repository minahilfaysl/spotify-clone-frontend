import React from 'react';
import { Field, ErrorMessage } from 'formik';
import "../../styles/auth/form.scss";

const AuthDatePicker = ({props}) => {

  const MONTHS = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

  return (
    <>
      <div className='datePicker'>
        <div className='dateCategory'>
          <p className="label">Month</p>
          <Field className="dateCategoryField" as="select" name="month">
          {MONTHS.map((month, index) => (
              <option key={index} value={index}>{ month }</option>
          ))}
          </Field>
          
          <ErrorMessage className='errorMessage' name="month" component="div" />
        </div>

        <div className='dateCategory'>
          <p className="label">Day</p>
          <Field className="dateCategoryField" type="text" name="day" placeholder="DD"/>
          <ErrorMessage className='errorMessage' name="day" component="div" />
        </div>

        <div className='dateCategory'>
          <p className="label">Year</p>
          <Field className="dateCategoryField" type="text" name="year" placeholder="YYYY"/>
          <ErrorMessage className='errorMessage' name="year" component="div" />
        </div>
      </div>
    </>
  )
};

export default AuthDatePicker;