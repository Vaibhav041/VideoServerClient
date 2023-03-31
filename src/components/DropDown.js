import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {update} from '../redux/userSlice';

const DropDown = () => {
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(update(null));
    }
  return (
    <div className='ddown shadow' style={{display:"flex", flexDirection:"column"}}>
        <ul className='downlist' style={{display:"flex", flexDirection:"column", gap:4, listStyle:"none", marginLeft: "-1em" }}>
            <Link to='/profile' style={{textDecoration:"none", color:"black"}}><li>Profile</li></Link>
            <Link to='/settings' style={{textDecoration:"none", color:"black"}}><li>Settings</li></Link>
            <Link onClick={logOut} style={{textDecoration:"none", color:"black"}}><li>LogOut</li></Link>
        </ul>
    </div>
  )
}

export default DropDown