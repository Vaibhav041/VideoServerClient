import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import img from "../avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { like, updateVideo, dislike } from "../redux/videoSlice";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { format } from "timeago.js";

const Video = () => {
  let { id } = useParams();
  const [channel, setChannel] = useState(null);
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video.currentVideo);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getVideoData = async () => {
      let videoData = await fetch(
        `https://mysterious-fish-jodhpurs.cyclic.app/video/get/${id}`
      );
      videoData = await videoData.json();
      let channleData = await fetch(
        `https://mysterious-fish-jodhpurs.cyclic.app/user/getUser/${videoData.userId}`
      );
      channleData = await channleData.json();
      setChannel(channleData);
      dispatch(updateVideo(videoData));
    };
    getVideoData();
  }, [dispatch, id]);

  const handleLike = async () => {
    let data = await fetch(
      `https://mysterious-fish-jodhpurs.cyclic.app/user/like/${video?._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    data = await data.json();
    dispatch(like(currentUser?._id));
  };
  const handleDislike = async () => {
    let data = await fetch(
      `https://mysterious-fish-jodhpurs.cyclic.app/user/dislike/${video?._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    data = await data.json();
    dispatch(dislike(currentUser?._id));
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ color: "white" }}>
        <div style={{ width: "700px" }}>
          <iframe
            width="100%"
            height="400"
            src={video?.videoUrl}
            title="YouTube video player"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="videoInfo">
            <h4>{video?.title}</h4>
          </div>
          <div className="videoChannelInfo">
            <div className="channelInfo">
              <img
                src={img}
                alt="..."
                style={{ borderRadius: "50%" }}
                height="30"
                width="30"
              />
              <div>
                <h6>{channel?.name}</h6>
                <p>
                  {video?.views} Views • {format(video?.createdAt)}
                </p>
              </div>
            </div>
            <div className="likeDislike">
              <span style={{ marginRight: "5px" }}>
                <button
                  onClick={handleLike}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    marginRight: "4px",
                  }}
                >
                  {video?.likes.includes(currentUser?._id) ? (
                    <ThumbUpAltIcon />
                  ) : (
                    <ThumbUpOffAltIcon />
                  )}
                </button>
                {video?.likes.length}
              </span>{" "}
              <button
                onClick={handleDislike}
                style={{ all: "unset", cursor: "pointer", marginRight: "2px" }}
              >
                {video?.dislikes?.includes(currentUser?._id) ? (
                  <ThumbDownAltIcon />
                ) : (
                  <ThumbDownOffAltIcon />
                )}
              </button>{" "}
              Dislike
            </div>
          </div>
          <div className="description">{video?.desc}</div>
        </div>
      </div>
    </>
  );
};

export default Video;
