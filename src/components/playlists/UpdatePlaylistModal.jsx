import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useUpdatePlaylistMutation } from './playlistsApiSlice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import UploadPhotoField from '../UploadPhotoField';


const UpdatePlaylistModal = ({ open, handleModalClose, item }) => {
  const navigate = useNavigate();
  const [updatePlaylist, { isLoading }] = useUpdatePlaylistMutation();

  const updatePlaylistDetails = async (data) => {
    try {
      let playlistID = item.id
      await updatePlaylist({playlistID, data}).unwrap()
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
          <h3>Playlist Details</h3>
          <Formik
            enableReinitialize
            initialValues={{
              playlist_name: item.playlist_name,
              description: item.description,
              playlist_cover_photo: item.playlist_cover_photo,
              is_private: item.is_private,
            }}
            onSubmit={(values, { setSubmitting }) => {
              var data = new FormData();
              for (const [key, value] of Object.entries(values)) {
                if (key == 'playlist_cover_photo' && value == item.playlist_cover_photo) {
                  // skip adding profile photo to form data since it wasn't changed
                  continue
                }
                data.append(key, value);
              }
              data.append("id", item.id);
              data.append("user", item.user);
              updatePlaylistDetails(data)
              setSubmitting(false)
            }}
          >
            {({isSubmitting, initialValues, setFieldValue}) => (
              <Form>
                <div className='modalContainer' style={{gap: 10}}>
                  <UploadPhotoField props={{
                    name: "playlist_cover_photo",
                    type: "square",
                    setFieldValue: setFieldValue,
                    defaultPhoto: item.playlist_cover_photo,
                  }} />
                  <div className='inputFieldContainer'>
                    <div className='modalFieldContainer'>
                      <ErrorMessage className='errorMessage' name="playlist_cover_photo" component="div" />

                      <p className="inputLabel">Song Name</p>
                      <Field className="inputField" type="text" name="playlist_name" placeholder="What do you want to call this playlist?"/>
                      <ErrorMessage className='errorMessage' name="playlist_name" component="div" />

                      <p className="inputLabel">Description</p>
                      <Field className="inputField" type="text" name="description" placeholder="Give your playlist a fun description"/>
                      <ErrorMessage className='errorMessage' name="description" component="div" />

                      <div className='playlist-checkbox'>
                        <Field className='box' type="checkbox" name="is_private" />
                        <p className="inputLabel">Private</p>
                      </div>
                      
                    </div>
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

export default UpdatePlaylistModal;

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