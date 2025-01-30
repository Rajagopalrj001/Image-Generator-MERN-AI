import React, { useState,useEffect } from 'react'
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import { CircularProgress } from '@mui/material';
import {GetPosts} from '../api';


const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding : 120px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 120px 10px;

  }
`; 

const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({theme}) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Span = styled.div`
  font-size: 25px;
  font-weight: 800;
  color: ${({theme}) => theme.orange};
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0;
  display: flex;
  justify-content: center;

`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 639px){
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Footer = styled.div`
  font-size:14px;
  width: 100%;
  padding: 0;
  color:lightGray;
  text-align:center;
`;


const Home = () => {
  const [posts,setPosts] =useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [search,setSearch] = useState("");
  const [filteredPosts,setFilteredPosts] = useState([]);


  console.log(posts);

  const getPosts = async ()=>{
    setLoading(true);
    await GetPosts().then((res)=>{
      setLoading(false);
      setPosts(res?.data?.data);
      setFilteredPosts(res?.data?.data);
    }).catch((error)=>{
      setError(error?.response?.data?.message);
      console.log(error);
    })
  }

  useEffect(()=>{
    getPosts();
  },[]);

  //filter features
  useEffect(()=>{
    if(!search){
      setFilteredPosts(posts);
    }

    const searchFilteredPosts = posts.filter((post)=>{
      const promptMatch = post?.prompt?.toLowerCase().includes(search.toString().toLowerCase());
      const authorMatch = post?.name?.toLowerCase().includes(search.toString().toLowerCase());

      return promptMatch || authorMatch;
    })

    if(search){
      setFilteredPosts(searchFilteredPosts);
    }

  },[posts,search]);


  return (
    <Container>
      <Headline>
        Your Imagination is the Only Limit
        <Span>⁌ Generated with FLUX AI ⁍</Span>
      </Headline> 
      <SearchBar search={search} setSearch={setSearch}/>
      <Wrapper>
        {error && <div style={{color:"red"}}> {error} </div> }
        {loading ? (
          <CircularProgress/>
        ) : (
        <CardWrapper>
          {filteredPosts.length > 0 ? 
            <>{filteredPosts
              .slice()
              .reverse()
              .map((item, index) => {
                return <ImageCard key={index} item={item} />; // Make sure to return the JSX element
              })}            
            </>
            : <>No Posts Found ! </> 
          }
        </CardWrapper>
        )}
      </Wrapper>

      <Footer> © 2024 rajagopalrj001. All rights reserved. </Footer>
    </Container>
  );
}

export default Home;
