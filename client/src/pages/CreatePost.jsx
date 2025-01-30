import React,{useState} from 'react'
import styled from 'styled-components'
import GeneratorImageForm from '../components/GeneratorImageForm' ;
import GeneratedImageCard from '../components/GeneratedImageCard'
import Button from "../components/button"
import {ExploreRounded} from '@mui/icons-material';
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
    margin-top: 240px;
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
        top: "10px",
        left: "15px",
        padding: "6px 8px",
        textAlign:"center",
        borderRadius:"100px",
        border : "none",
        fontSize:"14px"
      }}
      onClick={() => navigate('/')}
    > &larr;
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
