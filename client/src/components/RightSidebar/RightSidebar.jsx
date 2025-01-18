import React, { useContext } from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'
import { AuthContext } from '../../Context/AuthContext'

const RightSidebar = () => {
  const {user, logoutUser }  = useContext(AuthContext)
  return (
    <div className='RightSidebar'>
      <div className="rs-profile">
        <img src={assets.profile_img} alt="" />
        <h3>{user?.name}<img className='dot' src={assets.green_dot} alt="" /></h3>
        <p> Hey There i am {user?.name} <br /> using chat app </p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      {
        user && (<>
            
            <button  onClick={() => logoutUser()} className='bt'>Logout</button>
           
        </>)
      }
      
       </div>
      
  )
}

export default RightSidebar
