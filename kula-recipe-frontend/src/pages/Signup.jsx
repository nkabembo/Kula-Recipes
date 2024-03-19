import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";;
const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email:"",
    username:"",
    password:"",
    profileUrl: "",
  });
  const handlePhoto = e =>{
    setInputs(prev =>({...prev, profileUrl: e.target.files[0]}))
    console.log(inputs.profileUrl);
  }
  const handleChange = e =>{
    setInputs(prev =>({...prev, [e.target.name]: e.target.value}))
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
    const formData = new FormData();
    formData.append("email", inputs.email)
    formData.append('username', inputs.username)
    formData.append("password", inputs.password)
    formData.append("profileUrl", inputs.profileUrl)
    try{
      const res = await axios.post("api/auth/Signup", formData, { withCredentials: true })
      const {message, success} = res.data;
      if(success){
        handleResponse(success, message)
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
  console.log(inputs);
  return (
    <div className="sign-up">
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <fieldset>
            <legend>Sign Up </legend>
            <label htmlFor="avatar">Avatar:</label>
            <input type="file" id="avatar" name="profileUrl" accept="image/png, image/jpeg" required onChange={handlePhoto}/>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required onChange={handleChange}/>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required onChange={handleChange}/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" minLength="8" required onChange={handleChange}/>
            <span>Have an account <Link to='/Login'>Login</Link> Here</span>
            <button type="submit">Sign up</button>
          </fieldset>
          <ToastContainer />
        </form>
    </div>
  )
}

export default Signup