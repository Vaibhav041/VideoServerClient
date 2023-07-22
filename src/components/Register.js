import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../redux/userSlice";

const Register = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    console.log(user);
    let data = await fetch("https://videostream-y3uo.onrender.com/register", {
      method: "post",
      body: JSON.stringify(user),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await data.json();
    if (data.error) {
      alert(data.error);
    } else {
      navigate("/login");
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginPage">
      <form className="loginForm">
        <h1 style={{ color: "orange", textAlign: "center" }}>Register</h1>
        <input
          type="text"
          placeholder="Username"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button className="btn btn-danger" type="button" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
