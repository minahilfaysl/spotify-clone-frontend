import React from 'react';
import Switch from "react-switch";

import "../../styles/auth/form.scss";

const ToggleButton = ({ props }) => {

  return (
    <>
        <div className='toggleButtonContainer'>
            <Switch
                height={16}
                width={32}
                handleDiameter={12}
                offHandleColor='#000'
                onHandleColor='#000'
                onColor='#1cd760'
                offColor='#b3b3b3'
                className='toggleButton'
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={() => props.setFieldValue(props.fieldName, !props.value)} 
                checked={props.value} 
            />
            <p>Remember Me</p>
        </div>
    </>
  )
};

export default ToggleButton;