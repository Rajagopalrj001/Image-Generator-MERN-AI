import React,{useState} from 'react'
import styled from 'styled-components'
import GeneratorImageForm from '../components/GeneratorImageForm' ;
import GeneratedImageCard from '../components/GeneratedImageCard'
import Button from "../components/button"
import {ExploreRounded, WineBarRounded} from '@mui/icons-material';
import { useNavigate,useLocation } from 'react-router-dom';


const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding : 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 10px 10px;
  }

`; 

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  gap: 8px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 340px;
    margin-bottom: 120px;
  }
  @media (max-width: 600px) {
    margin-top: 400px;
    margin-bottom: 140px;
  }

   @media (max-width: 469px) {
    margin-top: 450px;
    margin-bottom: 160px;
  }

`;


const CreatePost = () => {
  const navigate = useNavigate();
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post,setPost] = useState({
    name : "",
    prompt : "",
    photo : "",
  });
  return (
    <>
    <button 
      style={{
        position: "absolute",
        top: "8px",
        left: "10px",
        padding: "4px 8px",
        textAlign:"center",
        background: "rgba(255, 255, 255, 0.10)",
        color: "white",
        cursor: "pointer",
        border : "0.5px solid rgb(255, 94, 0)",
        fontSize:"16px",
        fontFamily:"arial",  
        borderRadius: "6px",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
      }}
      onClick={() => navigate('/')}
    > &#8617;
    </button>
    <Container>
      <Wrapper>
        <GeneratorImageForm 
          post ={post} 
          setPost={setPost} 
          createPostLoading = {createPostLoading} 
          setGenerateImageLoading = {setGenerateImageLoading}
          generateImageLoading = {generateImageLoading} 
          setCreatePostLoading = {setCreatePostLoading}
        />
        <GeneratedImageCard 
          src={post?.photo} 
          loading={generateImageLoading}
        />
      </Wrapper>
    </Container>
    </>
  )
}

export default CreatePost
