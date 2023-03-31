import React, { useRef, useState } from 'react'
import {useSelector} from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { deepOrange} from '@mui/material/colors';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import Upload from './Upload';

const Navbar = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [showProfile, setShowProfile] = useState(false);
  const [open, setOpen] = useState(false);

  const ref = useRef();
  const handleProfile = () => {
    if (showProfile === false)
    setShowProfile(true);
    else
    setShowProfile(false);
  }
  window.addEventListener("click", (e) => {
    if (e.target !== ref.current) {
      setShowProfile(false);
    }
  })
  return (
    <>
      <div className='header sticky-top'>
        <div><Link style={{textDecoration:"none", color:"white"}} to='/'>Video<span style={{color:'orange'}}>Stream</span></Link></div>
        {currentUser ? <div style={{display:"flex"}}><button style={{all:"unset", cursor:"pointer", marginRight:"25px"}}><VideoCallOutlinedIcon onClick = {() => setOpen(true)} sx={{fontSize:40}}/></button><Avatar ref={ref} sx={{bgcolor:deepOrange[500]}} onClick={handleProfile} style={{cursor:"pointer", marginBottom:"10px"}}>{currentUser.name[0]}</Avatar></div>
        : <div>
          <Link to='/register' className='btn btn-danger'>Register</Link>
          <span style={{margin:"0 5px 0 5px"}}>Or</span>
          <Link to='/login' className='btn btn-danger'>Login</Link> 
        </div>}
      </div>
      {showProfile && <DropDown/>}
      {open && <Upload setOpen={setOpen} type="upload" updateId={null}/>}

    </>
  )
}

export default Navbar