import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { AuthContext } from '../context/authContext.jsx';
const Login = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const {login} = useContext(AuthContext)
  //console.log(currentUser)
  const handleChange = e =>{
    setInputValues(prev =>({...prev, [e.target.name]: e.target.value}))
  }
  const handleResponse = (success, msg) =>{
    if(success){
      toast.success(msg, {
        position: "top-right",
      });
    }else{
      toast.error(msg, {
        position: "top-right",
      });
    } 
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const res = await login(inputValues)
      //console.log("Res " + JSON.stringify(res))
      //const res = await axios.post("api/auth/Login", inputValues, { withCredentials: true })
      const {message, success} = res;
      console.log("Message " + message + "Success " + success)
      if(success === undefined){
        handleResponse(true, "User has successfully logged in")
        e.target.reset()
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }else{
        handleResponse(success, message)
        e.target.reset()
      }
    }catch(error){
      console.error(error);
    }
  }
  return (
    <div className='login' >
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Login </legend>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" onChange={handleChange} required/>
            <button type="submit">Login</button>
            <span>Do not have an account <Link to='/Signup'>Sign up</Link> Here</span>
          </fieldset>
          <ToastContainer />
        </form>
        
    </div>
  )
}

export default Login