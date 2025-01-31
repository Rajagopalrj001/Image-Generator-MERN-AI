import React,{useState} from 'react'
import styled from 'styled-components'
import Button from './button';
import TextInput from './TextInput' ;
import CreateRounded from '@mui/icons-material/CreateRounded';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import {CreatePost,GenerateAIImage} from '../api/';
import { useNavigate } from 'react-router-dom'



const Form = styled.div`
  margin-top: 50px;
  flex:1;
  padding:16px 20px;
  display:flex;
  flex-direction:column;
  gap:9%;
  justify-content:center;
  padding-bottom: 50px;

`;
const Top = styled.div`
  display:flex;
  flex-direction:column;
  gap:6px;

`;

const Title = styled.div`
  font-size:28px;
  font-weight:500;
  color:${({theme})=> theme.text_primary}
  @media (max-width: 600px) {
    font-size:18px;
  }
`;

const Desc = styled.div`
  font-size:17px;
  font-weight:400;
  color:${({theme})=> theme.text_secondary}
  @media (max-width: 600px) {
    font-size:12px;
  }
`;

const Body = styled.div`
  display:flex;
  flex-direction:column;
  gap:18px;
  font-size:12px;
  font-weight:400;
  color:${({theme})=> theme.text_secondary}
`;
const Actions = styled.div`
  flex:1;
  display:flex;
  gap:8px
`;



const GeneratorImageForm = (
  { post ,
  setPost ,
  createPostLoading ,
  setGenerateImageLoading ,
  generateImageLoading ,
  setCreatePostLoading,}
) => {
  const navigation = useNavigate();
  const [error,setError] = useState("");

  const generateImageFun = async () =>{
    setGenerateImageLoading(true);
    await GenerateAIImage({prompt: post.prompt}).then((res)=>{
      const imageBase64 = res.data.photo.trim();

      setPost({...post, photo: imageBase64});
      setGenerateImageLoading(false);

    }).catch((error)=>{
      setError(error?.response?.data?.message);
      console.log(error);
    })
  };


  const createPostFun = async () =>{
    setCreatePostLoading(true);
    await CreatePost(post).then((res)=>{
      setCreatePostLoading(false);
      navigation("/")
    }).catch((error)=>{
      setError(error?.response?.data?.message);
      console.log(error);
    })
  }

  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>Write your prompt according to image you want</Desc>
      </Top>
      <Body>
        <TextInput 
          label="Author" 
          placeholder="Enter your name. . ." 
          name = "name"
          value={post.name}
          handelChange = {(e) => setPost({...post,name:e.target.value})}
        />
        <TextInput 
          label="Image Prompt" 
          placeholder="Write a detailed prompt about the image . . ." 
          name = "name"
          rows="8"
          textArea
          value={post.prompt}
          handelChange = {(e) => setPost({...post,prompt:e.target.value})}
        />
        {error && <div style={{color:"red"}}> {error} </div> }

      </Body>
      <Actions>
        <Button 
          text="Generate" 
          flex 
          leftIcon={<AutoAwesome/>}
          isLoading = {generateImageLoading}
          isDisabled={post.prompt === ""} 
          onClick={()=>generateImageFun()}
        />
        <Button 
          text="Post" 
          flex 
          type="secondary" 
          leftIcon={<CreateRounded/>} 
          isLoading = {createPostLoading}
          isDisabled={post.name === "" || post.prompt ==="" || post.photo === ""}
          onClick={()=> createPostFun()}
        />
      </Actions>
    </Form>
  )
}

export default GeneratorImageForm
