import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../auth/authSlice';

import "../../styles/auth/form.scss";
import { useGetUsersAlbumListQuery, useUploadSongMutation } from './artistsApiSlice';
import Player from '../player/Player';
import { GoAlertFill } from "react-icons/go";


const UploadSongForm = () => {
  const user = useSelector(selectCurrentUser)

  const { data: albumList, isSuccess } = useGetUsersAlbumListQuery(user.username)
  const [ uploadSong, { isSuccess: isUploadSuccess, isError, error }] = useUploadSongMutation()
  const defaultPhoto = 'https://pekaro.in/wp-content/uploads/2021/09/no_photo.jpg';

  // for file upload
  const [preview, setPreview] = useState(defaultPhoto);
  const [selectedFile, setSelectedFile] = useState();

  const setFileValues = (event, setFieldValue) => {
    // set audio file values and duration
    let audioFile = event.currentTarget.files[0]
    setFieldValue('audio_file', audioFile);
    if (!event.currentTarget.files || event.currentTarget.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(audioFile)

    // get the duration of the audio file
    const objectUrl = URL.createObjectURL(audioFile)
    const audio = document.createElement("audio")
    audio.src = objectUrl

    audio.addEventListener("loadedmetadata", () => {
      let formattedDuration = new Date(audio.duration * 1000).toISOString().slice(11, 19);
      setFieldValue('duration', formattedDuration);
    })
    
  }

  const uploadNewSong = async (data) => {
    try {
      const res = await uploadSong({data}).unwrap();
    } catch (err) {
      // handle error
    }
  }

  const year = new Date().getFullYear()

  const UploadSongSchema = Yup.object().shape({
    song_name: Yup.string()
      .required('SOng name is required to upload your song.'),
    audio_file: Yup.string()
      .required('Please upload an audio file for your song.'),
    track_number: Yup.string()
      .required('Please enter a track number for your song.'),
    album: Yup.string()
      .required('Please select an album to upload this song to.'),
  });

  useEffect(() => {
  }, [selectedFile, isSuccess, preview])

  return (
    <div className='artistFormContainer'>
        <Formik
          initialValues={{
            song_name: "",
            audio_file: "",
            duration: "", // automatically calculated
            track_number: "",
            is_explicit: false,
            album: "", // album id selected from list
          }}
          // validationSchema={UploadSongSchema}
          onSubmit={(values, { setSubmitting }) => {
            var data = new FormData();
            for (const [key, value] of Object.entries(values)) {
              data.append(key, value);
            }
            uploadNewSong(data)
            setSubmitting(false)
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <p className="inputLabel">Artist Name (You)</p>
              <input className="input" value={user.profile_name} disabled/>

              <p className="inputLabel">What album are you adding this song to?</p>

              <div className='center'>
                <div className='uploadPictureButtonContainer'>
                  <img className={`uploadPicture square`} src={preview}/>
                </div>
              </div>
              {isSuccess && <>
                <select name="album"
                  onChange={(event) => {
                    let index = event.target.value;
                    let album = albumList.results[index];
                    if (!album) {
                      setPreview(defaultPhoto);
                      return;
                    }
                    setFieldValue('album', album.id);
                    setPreview(album.album_cover_photo);
                  }}>
                  <option value={null}>Select your album</option>
                  {albumList.results.map((album, index) => {
                    return <option key={album.id} value={index}>{album.album_name}</option>
                  })}
                </select>
                <ErrorMessage className='errorMessage' name="album" component="div" />
              </>}

              <p className="inputLabel">What do you want to call your song?</p>
              <Field className="input" type="text" name="song_name" placeholder="Song Name"/>
              <ErrorMessage className='errorMessage' name="song_name" component="div" />

              <p className="inputLabel">What is the track number for this song?</p>
              <Field className="input" type="text" name="track_number" placeholder="Track Number"/>
              <ErrorMessage className='errorMessage' name="track_number" component="div" />

              <p className="inputLabel">Upload your masterpiece</p>
              <input 
                id='audioUploadButton'
                type="file"
                name='audio_file'
                onChange={(event) => setFileValues(event, setFieldValue)}
              />
              <ErrorMessage className='errorMessage' name="audio_file" component="div" />
              {selectedFile && <Player source={URL.createObjectURL(selectedFile)}/>}
              
              <div className='checkbox'>
                <Field className='box' type="checkbox" name="is_explicit" />
                <p className="inputLabel">Explicit</p>
              </div>
              <ErrorMessage className='errorMessage' name="is_explicit" component="div" />
              
              <button className='authButton' type="submit">Upload This Song</button>

              {isUploadSuccess && 
              <p className={`serverMessage green`}><GoAlertFill />Your song was successfully uploaded.</p>}

              {isError && 
              <p className={`serverMessage red`}><GoAlertFill />
                {error.status == 400
                  ? "A song with this name already exists, please check again."
                  : "An error occurred, please try again later"}
              </p>}
            </Form>
          )}
        </Formik>
    </div>
  )
};

export default UploadSongForm;