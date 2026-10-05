import React, { useState, useEffect } from 'react';
import HomeHeader from './header';

import "../../styles/home/body.scss";
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import HomePlayer from '../player/HomePlayer';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { getBodyColor } from './homeSlice';

const Home = () => {

	const navigate = useNavigate();
	const color = useSelector(getBodyColor)

	useEffect(() => {
		navigate('/home')
	}, [])

  return (
    <>
			<div className='homeContainer'>
				<Sidebar />

				<div className='mainContent' 
					style={{
						backgroundImage: `linear-gradient(${color}, rgba(39,43,55, 0.5), #121212)`
					}}>
					<div className='cover'>
					<HomeHeader />
					<div className='spaceBetween'>
						<Outlet />
						<Footer />
					</div>
					</div>
				</div>

				<HomePlayer />
			</div>
    </>
  )
};

export default Home;