import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from "./button"
import {AddRounded, ExploreRounded} from '@mui/icons-material';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 30px;
  left: 0;
  right :0;
  z-index: 1000;
`;
const Wrapper = styled.div`
  // flex: 1;
  // background: ${({ theme }) => theme.navbar};
  // color: ${({ theme }) => theme.text_primary};
  // font-weight: bold;
  // font-size : 22px;
  // padding: 14px 50px;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // box-shadow: 0 0 10px rgba(0,0,0,0.15);
  // @media only screen and (max-width: 600px) {
  //   padding: 10px 12px;
  // }

  width: 70%;
  background: rgba(255, 255, 255, 0.1); 
  backdrop-filter: blur(20px) saturate(200%);
  -webkit-backdrop-filter: blur(20px) saturate(200%);
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  font-size: 22px;
  padding: 14px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 50px;

  
  @media only screen and (max-width: 600px) {
    padding: 10px 40px;
  }
`;

const Span = styled.div`
  display : inline;
  font-weight: 800;
  color: ${({theme}) => theme.orange};
`;

const Navbar = () => {
  const navigate = useNavigate();
  return (
    
    <Container>
      <Wrapper>
        <div style={{fontWeight:"800"}}>Pic<Span>Aura</Span></div>
          <Button 
          text="Generate" 
          rightIcon={
            <AddRounded
              style={{fontSize:"15px"}}
            />
          } 
          onClick={() => navigate('/post')}
        />
      </Wrapper>
    </Container>
  )
}

export default Navbar
