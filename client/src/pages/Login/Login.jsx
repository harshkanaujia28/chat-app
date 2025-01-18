import React, { useContext, useState} from 'react'
import {AuthContext} from '../../Context/AuthContext'
import {toast} from "react-toastify"
import './Login.css'
import { Link } from 'react-router-dom'



const Login = () => {
    const {loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading} = useContext(AuthContext)
   

  return (
  <>
    <div className="image_name">
    <div className="img"></div>
    <div className="name">Chat App</div>
   </div>
    <div className='login'>
   
      <div className="left">
     
        {/* <h1>Trustworthy and secure chat app for reliable communication. Enjoy encrypted <span>  </span>in one place.</h1> */}
      </div>
      <div className="right">
       
        <h2>Login</h2>
        <form onSubmit={loginUser}>
    
   
            <input type="email" placeholder='Email'  onChange={(e) => updateLoginInfo({...loginInfo, email: e.target.value})}/>
            <input type="Password" placeholder='Password' onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})} />
           
            <button type='submit' className='btn'>{isLoginLoading ?"Getting You in..." : "Login"}</button>
            
            <div className="term">
                <input type="checkbox" name="" id="check"  /> 
                <p>Agree to the terms & privacy policy</p>
            </div>
            <div className="login-forget">
            <p className='login-toggle' >If you haven't an account   <Link to="/register" style={{ textDecoration: 'none' , color: 'rgb(31, 95, 246)'}}>Register Now</Link> </p>
               
               
            </div> 
            
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
