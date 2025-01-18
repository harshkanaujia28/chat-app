import React, { useContext, useState} from 'react'
import {AuthContext} from '../../Context/AuthContext';
import { Link } from 'react-router-dom'

const Register = () => {
  const {registerInfo, updateRegisterInfo, registerUser, registerError,  isRegisterLoading} = useContext(AuthContext)
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

          <h2>Register</h2>
          <form onSubmit={registerUser}>
            <input type="text" placeholder="Name"  onChange={(e) => updateRegisterInfo({...registerInfo, name: e.target.value})}/>
            <input type="email" placeholder="Email"  onChange={(e) => updateRegisterInfo({...registerInfo, email: e.target.value})}/>
            <input type="password" placeholder="Password"  onChange={(e) => updateRegisterInfo({...registerInfo, password: e.target.value})} />
            <button type='submit' className='btn'>{isRegisterLoading ?"Creating Your account..." : "Register"}</button>
            {/* {registerError?.error && (
             
                <p>{registerError?.message} </p>
              
             )} */}
            <div className="term">
              <input type="checkbox" name="" id="check" />
              <p>Agree to the terms & privacy policy</p>
            </div>
            <div className="login-forget">
               <p className='login-toggle' >Already have an account   <Link to="/login" style={{ textDecoration: 'none' , color: 'rgb(31, 95, 246)'}}>Login Now</Link> </p>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default Register
