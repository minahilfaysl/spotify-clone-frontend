import React from 'react';
import { Field, ErrorMessage } from 'formik';
import "../../styles/auth/form.scss";

const AuthGenderPicker = ({props}) => {

  return (
    <>
      <div className='radioOptions'>
        <p className='label'>
          <Field className="radioButton" type="radio" name="gender" value="M"/>
          Male</p>
        <p className='label'>
          <Field className="radioButton" type="radio" name="gender" value="F"/>
          Female</p>
        <p className='label'>
          <Field className="radioButton" type="radio" name="gender" value="NB"/>
          Non-Binary</p>
        <p className='label'>
          <Field className="radioButton" type="radio" name="gender" value="O"/>
          Other</p>
        <p className='label'>
          <Field className="radioButton" type="radio" name="gender" value="-"/>
          Prefer Not To Say</p>
      </div>
      <ErrorMessage className='errorMessage' name="gender" component="div" />
    </>
  )
};

export default AuthGenderPicker;