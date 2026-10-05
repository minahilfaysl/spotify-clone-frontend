import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from "react-redux";
import { useAddTrackToPlaylistMutation, useGetPlaylistsQuery } from './playlistsApiSlice';
import { selectCurrentUser } from "../auth/authSlice";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CreatePlaylistModal from './CreatePlaylistModal';


const AddToPlaylistModal = ({ open, handleModalClose, item }) => {
  const user = useSelector(selectCurrentUser)
  const { data: playlists, isSuccess } = useGetPlaylistsQuery(user.username)
  const [addTrackToPlaylist, { isLoading }] = useAddTrackToPlaylistMutation();

  const handleSubmit = async (values) => {
    try {
      const response = await addTrackToPlaylist(values).unwrap()
      handleModalClose()
    } catch (err) {
      console.log(err)
    }
  }

  // for create modal
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleCreateModalOpen = () => setOpenCreateModal(true);
  const handleCreateModalClose = () => setOpenCreateModal(false);

  return (<>
    <Modal
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <h3>Add To Playlist</h3>
          <Formik
            enableReinitialize
            initialValues={{
              playlist: null,
              song: item.id,
          }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values)
              setSubmitting(false)
            }}
          >
            {({isSubmitting, initialValues, setFieldValue}) => (
              <Form>
                <div className=''>
                  <div className='modalFieldContainer playlist'>
                    {isSuccess && <>
                      <Field as="select" name="playlist" className='playlistSelect'>
                        <option value={""}>Select a playlist</option>
                        {playlists.results.map((playlist, index) => {
                          return <option value={playlist.id}>{playlist.playlist_name}</option>
                        })}
                      </Field>
                      <ErrorMessage className='errorMessage' name="playlist" component="div" />
                    </>}
                    <button type="button" className='create-link' onClick={handleCreateModalOpen}><p>Create new playlist</p></button>
                    <button className='editButton' type="submit">Add</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
    
    <CreatePlaylistModal
      open={openCreateModal}
      handleModalClose={handleCreateModalClose}
      item={item} />
    </>
  );
}

export default AddToPlaylistModal;

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