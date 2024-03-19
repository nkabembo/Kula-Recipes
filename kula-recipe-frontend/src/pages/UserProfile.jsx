import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import profile from '../assets/annie-spratt-5GsbwkrCfuM-unsplash.jpg';

function UserProfile() {
  return (
    <div className='user-profile'>
      <img src={profile} alt="" className='profile-photo' />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />
      <button><FontAwesomeIcon icon={faPenToSquare} style={{color: "#AC2371",}} /> Edit </button>
    </div>
  )
}

export default UserProfile