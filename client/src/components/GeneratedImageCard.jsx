import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress';


const Container = styled.div`
  margin-top: 20px;
  flex: 1;
  min-height:200px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px dashed ${({theme})=> theme.yellow};
  color: ${({theme})=> theme.arrow + 80};
  border-radius : 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
  background : ${({theme})=> theme.black + 50};
`;


 
 const GeneratedImageCard = ({src,loading}) => {
   return (
     <Container>
      {
        loading ? 
        <>
          <CircularProgress style={{color:"inherit", width:"24px",height:"24px"}}/>
          Generating your image. . .
        </> 
        : (
          <>
            {src ?  <Image src={src}/> : <p style={{textAlign:"center"}}>Generated image will be displayed here !</p>}
          </>
        )
      }
      
     </Container>
   )
 }
 
 export default GeneratedImageCard
 