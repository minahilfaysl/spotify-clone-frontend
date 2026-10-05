import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, selectCurrentToken, setCredentials } from '../auth/authSlice';
import { useUpdateProfileMutation } from './usersApiSlice';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import UploadPhotoField from '../UploadPhotoField';

const EditProfileModal = ({ open, handleModalClose }) => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const updateProfileDetails = async (data) => {
    try {
      let username = user.username
      const response = await updateProfile({username, data}).unwrap()
      // update state
      let updatedUser = {
        ...user,
        profile_name: response.profile_name,
        profile_photo: response.profile_photo,
      }
      dispatch(setCredentials({user: updatedUser, token: token}))
      handleModalClose()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <h3>Profile Details</h3>
          <Formik
            enableReinitialize
            initialValues={{
              profile_name: user.profile_name,
              profile_photo: user.profile_photo,
            }}
            onSubmit={(values, { setSubmitting }) => {
              var data = new FormData();
              for (const [key, value] of Object.entries(values)) {
                if (key == 'profile_photo' && value == user.profile_photo) {
                  // skip adding profile photo to form data since it wasn't changed
                  continue
                }
                data.append(key, value);
              }
              updateProfileDetails(data)
              setSubmitting(false)
            }}
          >
            {({isSubmitting, initialValues, setFieldValue}) => (
              <Form>
                <div className='modalContainer'>
                  <UploadPhotoField props={{
                    name: "profile_photo",
                    type: "round",
                    setFieldValue: setFieldValue,
                    defaultPhoto: user.profile_photo,
                  }} />
                  <div className='inputFieldContainer'>
                    <ErrorMessage className='errorMessage' name="profile_photo" component="div" />
                    <Field className="inputField" type="text" name="profile_name" placeholder="What should we call you?"/>
                    <ErrorMessage className='errorMessage' name="profile_name" component="div" />
                    {/* {serverError != '' &&
                    <p className='errorMessage'>{serverError}</p>} */}
                    <button className='editButton' type="submit">Save</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <p className='editDisclaimer'>By proceeding, you agree to give Spotify Clone access to the image you choose to upload. Please make<br />sure you have the right to upload the image.</p>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditProfileModal;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'max-content',
  bgcolor: '#212121',
  boxShadow: 24,
  px: 3,
  pb: 3,
  borderRadius: '5px',
};