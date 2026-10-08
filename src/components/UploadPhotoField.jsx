import React, { useState, useEffect } from 'react';
import photoOverlay from '../assets/photo_overlay.png';
import { uploadSizeError } from '../app/uploadLimits';

/*
  props = {
    name: "<field name>",
    setFieldValue: <set field value function>,
    defaultPhoto: <url for default to display when no photo is selected>
  }
*/

const UploadPhotoField = ({ props }) => {
  // for file upload
  const defaultPhoto = props.defaultPhoto
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState(defaultPhoto)
  const [sizeError, setSizeError] = useState(null)

  useEffect(() => {
    // create a preview as a side effect, whenever selected file is changed
    if (!selectedFile) {
      setPreview(defaultPhoto)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  return (
    <div className='uploadPictureButtonContainer'>
      <img className={`uploadPicture ${props.type}`} src={preview}/>
      <img className={`uploadOption ${props.type}`} src={photoOverlay}/>
      <input 
        id='imageUploadButton'
        type="file"
        name={props.name}
        accept="image/*"
        onChange={(event) => {
          const error = uploadSizeError(event.currentTarget.files[0], 'This photo')
          setSizeError(error)
          if (error) {
            // keep the previous photo (initial value or last valid pick)
            event.currentTarget.value = ''
            return
          }
          props.setFieldValue(props.name, event.currentTarget.files[0]);
          if (!event.currentTarget.files || event.currentTarget.files.length === 0) {
            setSelectedFile(undefined)
            return
          }
          setSelectedFile(event.currentTarget.files[0])
        }}
      />
      {sizeError && <div className='errorMessage'>{sizeError}</div>}
    </div>
  )
};

export default UploadPhotoField;
