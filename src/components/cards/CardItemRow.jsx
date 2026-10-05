import React, { useState, useEffect } from 'react';

import '../../styles/home/cards.scss';

import ItemPreviewCards from './ItemPreviewCards';

const CardItemRow = ({id, title, items, isPrivate=false}) => {

  return (
    <div className='itemsContainer'>
      <h3>{title}</h3>
      {isPrivate &&
      <p className='itemsSubtitle'>Only visible to you</p>}
      <div className='itemsRow'>
        {items.length > 0 ? items.map((item, index) => (
          <ItemPreviewCards key={index} id={index} item={item} type={id}/>
        ))
        : <p>No {id} available.</p>}
      </div>
    </div>
  )
};

export default CardItemRow;