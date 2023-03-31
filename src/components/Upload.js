import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: black;
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color:white;
`;
const Title = styled.h1`
  text-align: center;
  color:white;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: white;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: white;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
  color:white;
`;
const Upload = ({ setOpen, type, updateId }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  console.log(type);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e)=>{
    e.preventDefault();
    const data = {...inputs, tags};
    let res = await fetch('https://videostream-y3uo.onrender.com/video/add', {
      method:"post",
      body:JSON.stringify(data),
      credentials: "include",
      headers:{
                'Content-Type':'application/json'
            }

    })
    const response = await res.json();
    setOpen(false)
    console.log(res.status);
    if (res.status === 200) 
      navigate(`/video/${response._id}`)
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {...inputs, tags};
    let res = await fetch(`https://videostream-y3uo.onrender.com/video/update/${updateId}`, {
      method:"put",
      body:JSON.stringify(data),
      credentials: "include",
      headers:{
                'Content-Type':'application/json'
            }
    })
    res = await res.json();
    setOpen(false);
    navigate('/profile');
  } 

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        {type==="update" ? <Title>Update Video</Title> : <Title>Upload a New Video</Title>}
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          <span style={{color:"white"}}>{"Uploading:" + videoPerc + "%"}</span>
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          <span style={{color:"white"}}>{"Uploading:" + imgPerc + "%"}</span>
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        {type==='update' ?<Button onClick={handleUpdate}>Update</Button> :<Button onClick={handleUpload}>Upload</Button>}
      </Wrapper>
    </Container>
  );
};

export default Upload;