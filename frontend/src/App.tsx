import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Page from './components/Page';
import { About } from './pages/About';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Navbar/>
      <Page>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='/auth/sign-up' element={<SignUp/>}/>
          <Route path='/auth/sign-in' element={<SignIn/>}/>
        </Routes>
      </Page>
    </div>
  );
}

export default App;
