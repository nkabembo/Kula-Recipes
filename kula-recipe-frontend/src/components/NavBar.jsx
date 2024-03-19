import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Kulalogo.png'
import { AuthContext } from '../context/authContext'
const NavBar = () => {
  const {currentUser, logout} = useContext(AuthContext) 
  //console.log("CurrentUser  " + JSON.parse(JSON.stringify(currentUser)))
  //console.log("Current  " + JSON.stringify(currentUser.data))
  return (
    <div>
      <nav>
        <Link className='logo-link'><img src={logo} alt="" className="logo" to='/' /></Link>
        <div>
          <Link to='/CreateRecipe'>Create Recipe</Link>
          <Link to='/About' className='about-btn'>About</Link>
          
        </div>
        <div>
            {currentUser? <Link className='logout-btn' onClick={logout}>Logout</Link>:
            <Link to='/Login' className='login-btn'>Login</Link> }
            {currentUser?"": <Link to='/Signup' className='signup-btn'>Sign Up</Link>}
            <Link to='/UserProfile'>{currentUser?.['_doc'].username}</Link>
        </div>
      </nav>
    </div>
  )
}

export default NavBar