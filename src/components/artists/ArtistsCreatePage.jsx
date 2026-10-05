import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import "../../styles/home/artist.scss";
import CreateAlbumForm from "./CreateAlbumForm";
import UploadSongForm from "./UploadSongForm";
import { useDispatch } from "react-redux";
import { setBodyColor } from "../home/homeSlice";


const ArtistsCreatePage = () => {
  const dispatch = useDispatch();

  const [albumForm, setAlbumForm] = useState(false)
  const [songForm, setSongForm] = useState(false)

  let showAlbumForm = () => {setAlbumForm(!albumForm)}
  let showSongForm = () => {setSongForm(!songForm)}
  let openOtherForm = () => {showSongForm(); showAlbumForm()}
  
  useEffect(() => {
    dispatch(setBodyColor("#272b37"));
  }, [])

  return (
    <div>
      <h1>Add To The Music</h1>
      <button className="headingButton" onClick={showAlbumForm}>
        <MdKeyboardArrowDown className="downArrowIcon"/>
        <h3 className="button h3">Create An Album</h3>
      </button>

      {albumForm &&
      <div>
        <p>Create an album first to upload a song to.</p>
        <CreateAlbumForm />
        <p className='signupText'>Already created an album?&nbsp;
          <button className="link" 
            onClick={openOtherForm}>
            Pick one for your song.
          </button>
        </p>
      </div>}

      <button className="headingButton" onClick={showSongForm}>
        <MdKeyboardArrowDown className="downArrowIcon"/>
        <h3 className="button h3">Upload A Song</h3>
      </button>

      {songForm &&
      <div key='songForm'>
        <p>Upload a song to your album.</p>
        <UploadSongForm />
        <p className='signupText'>Can't see the relevant album?&nbsp;
          <button className="link" onClick={openOtherForm}>
            Create one for your song.
          </button>
        </p>
      </div>}
      
    </div>
  )
}

export default ArtistsCreatePage;