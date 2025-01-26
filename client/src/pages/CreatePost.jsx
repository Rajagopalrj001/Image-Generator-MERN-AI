import React,{useState} from 'react'
import styled from 'styled-components'
import GeneratorImageForm from '../components/GeneratorImageForm' ;
import GeneratedImageCard from '../components/GeneratedImageCard'
import { Photo } from '@mui/icons-material';

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
    padding: 6px 10px;
  }
`; 

const Wrapper = styled.div`
  width: 100%;
  height:fit-content;
  max-width: 1200px;
  gap: 8px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post,setPost] = useState({
    name : "",
    prompt : "",
    photo : "",
  });
  return (
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
  )
}

export default CreatePost