import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GenreCard = ({ item }) => {
  
  return (
    <Link to={`/genre/${item.id}`}>
      <div className='genreCard' style={{backgroundColor: item.color}}>
        <h3>{item.genre_name}</h3>
      </div>
      </Link>
  )
}

export default GenreCard;