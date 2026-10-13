import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";

import "../../styles/auth/form.scss";
import AuthHeader from '../../components/auth/Header';
// TODO(remember-me): re-enable with the "Remember Me" switch below
// import ToggleButton from '../../components/auth/ToggleButton';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import { describeServerError } from '../../app/serverErrors';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const [serverError, setServerError] = useState('')

  const loginUser = async (values) => {
    try {
      let username = values.username;
      let password = values.password;
      setServerError('')
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({...userData}))
      navigate('/')
    } catch (err) {
      if (err.status == 401) {
        setServerError("The email/username or password entered is incorrect. Please try again with the correct credentials.")
      } else {
        setServerError(describeServerError(err, "Unable to log in right now. Please try again."))
      }
    }
  }

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required('Your email or username is required to log in to Spotify.')
      // let the user enter a username and validate if they enter an email
      .test('is-email', 'Invalid email', (value) => {
        if (value) {
          return value.includes('@') ? Yup.string().email().isValidSync(value) : true
        }
        return true
      }),
    password: Yup.string()
      .required('Please enter your password.')
  });

  return (
    <div className='bodyContainer'>
      <AuthHeader />
      <div className='formContainer'>
        <h1>Log in to Spotify</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            loginUser(values);
            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className='auth'>
              <p className="inputLabel">Email or username</p>
              <Field className="input" type="username" name="username" placeholder="Email or username"/>
              <ErrorMessage className='errorMessage' name="username" component="div" />
              <p className="inputLabel">Password</p>
              <Field className="input" type="password" name="password" placeholder="Password"/>
              <ErrorMessage className='errorMessage' name="password" component="div" />
              {/* TODO(remember-me): the switch isn't wired up yet (every login is
                  currently remembered). Plan: keep the login in localStorage when
                  on, sessionStorage when off. See "Future improvements" in README.
              <ToggleButton props = {{
                setFieldValue: setFieldValue,
                fieldName: 'rememberMe',
                value: values.rememberMe,
              }}/>
              */}
              {serverError != '' && 
              <p className='errorMessage'>{serverError}</p>}
              <button className='authButton' type="submit">Log In</button>
            </Form>
          )}
        </Formik>

        {/* TODO(password-reset): needs reset endpoints + an email service in the
            backend and a reset page here. See "Future improvements" in README.
        <Link to=".." className="link">Forgot your password?</Link>
        */}
        <div className='divider'/>
        <p className='signupText'>Don't have an account? <Link to="/auth/signup" className="link">Sign up for Spotify</Link></p>
      </div>
    </div>
  )
};

export default Login;