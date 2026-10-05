import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "../../styles/home/sidebar.scss";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { LuLibrary } from "react-icons/lu";
import SidebarOption from './SidebarOption';
import SidebarContentCards from './SidebarContentCards';
import { setSidebarState, getSidebarState } from './homeSlice';
import { useGetUserLibraryItemsQuery } from './homeApiSlice';
import { selectCurrentUser } from '../auth/authSlice';


const Sidebar = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectCurrentUser)

	const isCollapsed = useSelector(getSidebarState);
	const handleCollapse = () => {
		dispatch(setSidebarState());
	}

	const { data: userLibraryItems, isSuccess } = useGetUserLibraryItemsQuery(user.username)
  
	return (
    <>
			<div className={`sidebarContainer ${isCollapsed}`}>
				<div className='topContainer'>
					<SidebarOption title="Home" Icon={GoHome} link='/home' />
					<SidebarOption title="Search" Icon={IoIosSearch} link='/search'/>
				</div>
				<div className='bottomContainer'>
					<button onClick={handleCollapse}>
						<div className="sidebarOption">
							<div className='sidebarOptionContent'>
								<LuLibrary className='sidebarIcon'/>
								{!isCollapsed && <p>Your Library</p>}
							</div>
						</div>
					</button>
					{!isCollapsed && <div className='sidebarDivider' />}
					<div className='scroll'>
						<SidebarContentCards key={'liked_songs'} item={{liked_playlist: true}}/>
						{isSuccess && 
						userLibraryItems.library_items.map((item, index) => (
							<SidebarContentCards key={index} item={item}/>
						))}
					</div>
				</div>
			</div>
    </>
  )
};

export default Sidebar;