import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useUpdateSongMutation } from '../artists/artistsApiSlice';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const UpdateSongModal = ({ open, handleModalClose, item }) => {

  const [updateSong, { isLoading }] = useUpdateSongMutation();

  const updateSongDetails = async (values) => {
    try {
      let songID = item.id
      let data = {
        album: item.album,
        track_number: item.track_number,
        song_name: values.song_name,
      }
      const response = await updateSong({songID, data}).unwrap()
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
          <h3>Song Details</h3>
          <Formik
            enableReinitialize
            initialValues={{
              song_name: item.song_name,
            }}
            onSubmit={(values, { setSubmitting }) => {
              updateSongDetails(values)
              setSubmitting(false)
            }}
          >
            {({isSubmitting, initialValues, setFieldValue}) => (
              <Form>
                <div className=''>
                  <div className='modalFieldContainer'>
                    <p className="inputLabel">Song Name</p>
                    <Field className="inputField" type="text" name="song_name" placeholder="What do you want to call this song?"/>
                    <ErrorMessage className='errorMessage' name="song_name" component="div" />
                    {/* {serverError != '' &&
                    <p className='errorMessage'>{serverError}</p>} */}
                    <button className='editButton' type="submit">Save</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
}

export default UpdateSongModal;

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