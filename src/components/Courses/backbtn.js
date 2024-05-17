import React from 'react'
import { Link } from 'react-router-dom'
import './VideoPlaylist.css';
export const Backbtn = () => {
  return (
    <React.Fragment>
      <Link to='/courses'>
        <button className='back-btn'>
           &laquo;   Back
        </button>
      </Link>
    </React.Fragment>
  )
}
