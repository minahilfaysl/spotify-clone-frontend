import React, { useState, useEffect } from 'react';
import HomeHeader from '../../components/home/header';

import "../../styles/home/body.scss";
import Sidebar from '../../components/home/Sidebar';

const Home = () => {

  return (
    <>
			<div className='homeContainer'>
				<Sidebar />

				<div className='mainContent'>
					<HomeHeader />
					<h2>Good afternoon</h2>
				</div>
			</div>
    </>
  )
};

export default Home;