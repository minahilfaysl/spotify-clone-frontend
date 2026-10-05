import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

import "../../styles/auth/form.scss";
import UploadPhotoField from '../UploadPhotoField';
import { useCreateAlbumMutation, useGetGenreListQuery } from './artistsApiSlice';
import { selectCurrentUser } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import { GoAlertFill } from "react-icons/go";


const CreateAlbumForm = () => {
  const user = useSelector(selectCurrentUser)

  const { data: genreList, isSuccess } = useGetGenreListQuery()
  const [ createAlbum, { isSuccess: isCreateSuccess, isError, error }] = useCreateAlbumMutation()

  const createNewAlbum = async (data) => {
    try {
      const result = await createAlbum({data}).unwrap();
    } catch (err) {
      //
    }
  }

  const year = new Date().getFullYear()

  const CreateAlbumSchema = Yup.object().shape({
    album_name: Yup.string()
      .required('Album name is required to create an album.'),
    album_publish_year: Yup.number()
      .typeError('Please enter a valid number for the year')
      .required('Please enter a valid publish year, between 1950 - now.')
      .min(1950, 'The minimum year is 1950')
      .max(year, `The maximum year can only be ${year}`),
    album_cover_photo: Yup.string()
      .required('Please upload a cover photo for your album.'),
    genre: Yup.string()
      .required('Please select a genre from the list.'),
  });

  useEffect(() => {
    //
  }, [isSuccess])

  return (
    <div className='artistFormContainer'>
        <Formik
          initialValues={{
            album_name: "",
            album_publish_year: "",
            album_cover_photo: "",
            genre: "",
            artist: user.id,
          }}
          validationSchema={CreateAlbumSchema}
          onSubmit={(values, { setSubmitting }) => {
            var data = new FormData();
            for (const [key, value] of Object.entries(values)) {
              data.append(key, value);
            }
            createNewAlbum(data)
            setSubmitting(false)
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <p className="inputLabel">Artist Name (You)</p>
              <input className="input" value={user.profile_name} disabled/>

              <p className="inputLabel">What do you want to call your album?</p>
              <Field className="input" type="text" name="album_name" placeholder="Album Name"/>
              <ErrorMessage className='errorMessage' name="album_name" component="div" />

              <p className="inputLabel">What year was your album published in?</p>
              <Field className="input" type="text" name="album_publish_year" placeholder="Publish Year"/>
              <ErrorMessage className='errorMessage' name="album_publish_year" component="div" />

              <p className="inputLabel">Add Your Cover Photo</p>
              <div className='center'>
              <UploadPhotoField props={{
                name: "album_cover_photo",
                type: "square",
                setFieldValue: setFieldValue,
                defaultPhoto: 'https://pekaro.in/wp-content/uploads/2021/09/no_photo.jpg'
              }} />
              </div>
              <ErrorMessage className='errorMessage' name="album_cover_photo" component="div" />

              <p className="inputLabel">What is the genre of your album?</p>
              {isSuccess && <>
                <Field as="select" name="genre">
                  <option value={null}>Select a genre</option>
                  {genreList.results.map((genre, index) => {
                    return <option value={genre.id}>{genre.genre_name}</option>
                  })}
                </Field>
                <ErrorMessage className='errorMessage' name="genre" component="div" />
              </>}

              <button className='authButton' type="submit">Create This Album</button>

              {isCreateSuccess && 
              <p className={`serverMessage green`}><GoAlertFill />Your album was created successfully.</p>}

              {isError && 
              <p className={`serverMessage red`}><GoAlertFill />
                {error.status == 400
                  ? "An album with this name already exists, please check again."
                  : "An error occurred, please try again later"}
              </p>}
            </Form>
          )}
        </Formik>
    </div>
  )
};

export default CreateAlbumForm;