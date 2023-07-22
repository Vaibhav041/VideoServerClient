import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/userSlice";

const Settings = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleClick = async () => {
    let res = await fetch(
      `https://mysterious-fish-jodhpurs.cyclic.app/user/update/${currentUser._id}`,
      {
        method: "put",
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res = await res.json();
    dispatch(update(res));
  };
  const handleDelete = async () => {
    let res = await fetch(
      `https://mysterious-fish-jodhpurs.cyclic.app/user/delete/${currentUser._id}`,
      {
        method: "delete",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(update(null));
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
      <div className="loginPage1">
        <form className="loginForm">
          <h1 style={{ color: "orange", textAlign: "center" }}>
            Update Details
          </h1>
          <label>New Username</label>
          <input
            type="text"
            placeholder="Username"
            name="name"
            onChange={handleChange}
          />
          <label>New Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <label>New Password</label>
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClick}
          >
            Update
          </button>
          <p className="seperator">_______________OR_______________</p>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Account
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
