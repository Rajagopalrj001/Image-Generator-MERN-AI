import styled,{ThemeProvider} from 'styled-components';
import {darkTheme} from './utils/Theme';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex:3;
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}> 
      <Container>
        <Wrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={ 
                <> 
                  <Navbar />
                  <Home /> 
                </>
              } />
              <Route path="/post" element={<CreatePost />} />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </Container> 
    </ThemeProvider>
  );
}

export default App;
