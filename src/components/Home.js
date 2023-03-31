import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Navbar from './Navbar';
import Card from './Card';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {
    const [videos, setVideos] = useState();

    useEffect(() => {
      const getVideos = async () => {
        let data = await fetch('https://videostream-y3uo.onrender.com/video/get');
        data = await data.json();
        setVideos(data);
      }
      getVideos();
    }, [])
    
  return (
    <>
      <Navbar/>
      <div className='container'>
        <Container>
          {videos?.map((ele) => {
            return <Card key={ele._id} video={ele}/>
          })}
        </Container>
      </div>
    </>
  )
}

export default Home