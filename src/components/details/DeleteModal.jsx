import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import '../../styles/home/modals.scss'
import { useDeleteSongMutation } from '../artists/artistsApiSlice';

const DeleteModal = ({ open, handleModalClose, item }) => {

  const [ deleteSong, { isLoading }] = useDeleteSongMutation()

  const deleteItem = async () => {
    try {
      await deleteSong(item.id).unwrap();
      handleModalClose()
      location.reload();
    } catch (err) {
      // handle error
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
          <h3>Delete Song</h3>
            <div className='inputFieldContainer'>
              <div>
                <p>Are you sure you want to delete this song?</p>
                <p className='details'>{item.song_name} - {item.album_details.album_name}</p>
              </div>
              <button className='deleteButton' onClick={deleteItem}>Delete</button>
            </div>
            
        </Box>
      </Fade>
    </Modal>
  );
}

export default DeleteModal;

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