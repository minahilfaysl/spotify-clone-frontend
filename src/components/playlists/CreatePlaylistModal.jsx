import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from "react-redux";
import { useAddTrackToPlaylistMutation, useCreatePlaylistMutation, useGetPlaylistsQuery } from './playlistsApiSlice';
import { selectCurrentUser } from "../auth/authSlice";
import { useUpdatePlaylistsLibraryMutation, useUpdateRecentPlaylistsMutation } from '../home/homeApiSlice';
import UploadPhotoField from '../UploadPhotoField';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


const CreatePlaylistModal = ({ open, handleModalClose, item }) => {
  const user = useSelector(selectCurrentUser)
  const [ createPlaylist, { isError, error }] = useCreatePlaylistMutation();
  const [ updateRecentPlaylists, { isSuccess: isUpdateSuccess }] = useUpdateRecentPlaylistsMutation()
  const [ updatePlaylistsLibrary, { isSuccess: isUpdateLibrarySuccess }] = useUpdatePlaylistsLibraryMutation()

  const updateRecentItems = async (playlist) => {
    try {
      let username = user.username
      let data = {"recently_played_playlists": playlist.id}
      await updateRecentPlaylists({username, data}).unwrap()
    } catch (err) {
      console.log(err)
    }
  }

  const updateLibrary = async (playlist) => {
    try {
      let username = user.username
      let data = {"playlist_library": playlist.id}
      await updatePlaylistsLibrary({username, data}).unwrap()
    } catch (err) {
      console.log(err)
    }
  }
  
  const handleSubmit = async (values) => {
    try {
      const response = await createPlaylist(values).unwrap()
      // update recently added items
      if (!isError) {
        updateRecentItems(response)
        updateLibrary(response)
      }
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
          <h3>Create Playlist</h3>
          <Formik
            enableReinitialize
            initialValues={{
              playlist_name: "",
              description: "",
              playlist_cover_photo: null,
              is_private: false,
              user: user.id,
            }}
            onSubmit={(values, { setSubmitting }) => {
              var data = new FormData();
              for (const [key, value] of Object.entries(values)) {
                data.append(key, value);
              }
              handleSubmit(data)
              setSubmitting(false)
            }}
          >
            {({isSubmitting, initialValues, setFieldValue}) => (
              <Form>
                <div className='create'>
                  <UploadPhotoField props={{
                    name: "playlist_cover_photo",
                    type: "square",
                    setFieldValue: setFieldValue,
                    defaultPhoto: 'https://pekaro.in/wp-content/uploads/2021/09/no_photo.jpg',
                  }} />
                  <div className='modalFieldContainer'>
                    <p className="inputLabel">New Playlist Name</p>
                    <Field className="inputField" type="text" name="playlist_name" placeholder="What do you want to call this playlist?"/>
                    <ErrorMessage className='errorMessage' name="playlist_name" component="div" />

                    <p className="inputLabel">Description</p>
                    <Field className="inputField" type="text" name="description" placeholder="Give your playlist a catchy description"/>
                    <ErrorMessage className='errorMessage' name="description" component="div" />
                  </div>
                  <button className='editButton' type="submit">Create</button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
}

export default CreatePlaylistModal;

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