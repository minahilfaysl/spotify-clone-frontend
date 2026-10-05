import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";

import "../../styles/auth/form.scss";
import { setCredentials } from './authSlice';
import { useSignupMutation } from './authApiSlice';
import AuthHeader from '../../components/auth/Header';
import AuthDatePicker from '../../components/auth/AuthDatePicker';
import AuthGenderPicker from '../../components/auth/AuthGenderPicker';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [signup, { isLoading }] = useSignupMutation()
  const [serverError, setServerError] = useState('')

  const signupUser = async (values) => {
    try {
      console.log("signing up user with values:", values);
      let request = {
        email: values.email,
        password: values.password,
        password2: values.password,
        profile_name: values.profile_name,
        date_of_birth: new Date(values.year, values.month, values.day).toISOString().slice(0,10),
        gender: values.gender,
      }
      console.log("request is", request);
      const userData = await signup(request).unwrap();
      dispatch(setCredentials({...userData}))
      navigate('/')
    } catch (err) {
      if (err.status == 401) {
        setServerError("Unable to process this request at this time.")
      }
    }
  }

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email.')
      .required('Your email or username is required to log in to Spotify.'),
    password: Yup.string()
      .required('Please enter your password.'),
    profile_name: Yup.string()
      .required('Please enter your name so tha it can be displayed on your profile.'),
    gender: Yup.string()
      .required('Please select an option.'),
    day: Yup.number()
      .typeError("Please enter a valid date")
      .required("Your date of birth is required.")
      .min(1, "Date should be between 1 - 31")
      .max(31, "Date should be between 0 - 31"),
    month: Yup.number()
      .required("Please select the month you were born."),
    year: Yup.number()
    .typeError("Please enter a valid year")
      .required("Please enter a valid year of birth")
      .min(1950, "The year should be between 1950 - 2010")
      .max(2010, "The year should be between 1950 - 2010"),
  });

  return (
    <div className='bodyContainer'>
      <AuthHeader />
      <div className='formContainer'>
        <h1>Sign up for Spotify</h1>
        <Formik
          initialValues={{ 
            email: '',
            password: '',
            profile_name: '',
            month: '',
            day: '',
            year: '',
            gender: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            signupUser(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <p className="inputLabel">What is your email?</p>
              <Field className="input" type="email" name="email" placeholder="Enter your email"/>
              <ErrorMessage className='errorMessage' name="email" component="div" />
              
              <p className="inputLabel">Create a password</p>
              <Field className="input" type="password" name="password" placeholder="Enter your password"/>
              <ErrorMessage className='errorMessage' name="password" component="div" />
              
              <p className="inputLabel">What should we call you?</p>
              <Field className="input" type="profile_name" name="profile_name" placeholder="Enter a profile name"/>
              <ErrorMessage className='errorMessage' name="profile_name" component="div" />

              <p className="inputLabel">What's your date of birth?</p>
              <AuthDatePicker />

              <p className="inputLabel">What's your gender?</p>
              <AuthGenderPicker />

              {serverError != '' && 
              <p className='errorMessage'>{serverError}</p>}

              <button className='authButton' type="submit">Sign Up</button>
            </Form>
          )}
        </Formik>
        <div className='divider'/>
        <p className='signupText'>Have an account? <Link to="/auth/login" className="link">Log in</Link>.</p>
      </div>
    </div>
  )
};

export default Signup;