import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { update } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const handleClick = async () => {
        let data = await fetch('https://videostream-y3uo.onrender.com/login', {
            method:'post',
            body:JSON.stringify(user),
            credentials: "include",
            withCredentials: true,
            headers:{
                'Content-Type':'application/json'
            }
        })
        data = await data.json();
        if (data.error) {
            alert(data.error);
        }
        else {
            dispatch(update(data));
            navigate('/');
        }
    }
    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }
  return (
    <div className='loginPage'>
        <form className='loginForm'>
            <h1 style={{color:"orange", textAlign:"center"}}>LogIn</h1>
            <input type="text" placeholder='Username' name='name' onChange={handleChange}/>
            <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
            <button className='btn btn-danger' type='button' onClick={handleClick}>Submit</button>
        </form>
    </div>
  )
}

export default Login