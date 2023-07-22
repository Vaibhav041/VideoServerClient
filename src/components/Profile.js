import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Navbar from "./Navbar";
import Upload from "./Upload";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState();
  const getVideoData = async () => {
    let channelVideos = await fetch(
      `https://mysterious-fish-jodhpurs.cyclic.app/video/getAll/${currentUser._id}`
    );
    channelVideos = await channelVideos.json();
    setVideos(channelVideos);
    let like = 0;
    channelVideos.map((ele) => {
      like += ele.likes.length;
    });
    setLikes(like);
    let view = 0;
    channelVideos.map((ele) => {
      view += ele.views;
    });
    setViews(view);
  };
  useEffect(() => {
    getVideoData();
  }, []);
  const handleDelete = async (id) => {
    await fetch(`https://videostream-y3uo.onrender.com/video/delete/${id}`, {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getVideoData();
  };
  const handleUpdate = (id) => {
    setId(id);
    setOpen(true);
  };
  useEffect(() => {
    getVideoData();
  }, [open]);
  return (
    <>
      <Navbar />
      <div className="container">
        <h3 style={{ textAlign: "center", color: "white" }}>
          Hi, {currentUser.name}
        </h3>
        <div style={{ color: "white", margin: "20px 0 20px 0" }}>
          <h6>Your total Views: {views}</h6>
          <h6>Your total Likes: {likes}</h6>
        </div>
        <h4 style={{ color: "white" }}>Your Videos</h4>
        {videos.map((ele) => {
          return (
            <div key={ele._id} style={{ display: "flex" }}>
              <Card video={ele} />
              <div className="buttons">
                <button
                  className="btn btn-secondary"
                  style={{ marginRight: "5px" }}
                  onClick={() => handleUpdate(ele._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(ele._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {open && <Upload setOpen={setOpen} type="update" updateId={Id} />}
    </>
  );
};

export default Profile;
