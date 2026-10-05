import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import "../../styles/home/sidebar.scss";
import { getSidebarState } from './homeSlice';


const SidebarOption = ({ title, Icon, link }) => {

  const isCollapsed = useSelector(getSidebarState)
	
  return (
    <div className="sidebarOption">
      <Link to={link}>
        <div className='sidebarOptionContent'>
          <Icon className='sidebarIcon'/>
          {!isCollapsed && <p>{title}</p>}
        </div>
      </Link>
		</div>
  )
};

export default SidebarOption;