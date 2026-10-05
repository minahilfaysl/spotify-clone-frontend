import React, { useState, useEffect } from 'react';

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
      <img className={`uploadOption ${props.type}`} src={'/src/assets/photo_overlay.png'}/>
      <input 
        id='imageUploadButton'
        type="file"
        name={props.name}
        onChange={(event) => {
          props.setFieldValue(props.name, event.currentTarget.files[0]);
          if (!event.currentTarget.files || event.currentTarget.files.length === 0) {
            setSelectedFile(undefined)
            return
          }
          setSelectedFile(event.currentTarget.files[0])
        }}
      />
    </div>
  )
};

export default UploadPhotoField;
