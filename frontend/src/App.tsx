import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Page from './components/Page';
import ProtectedRoute from './components/ProtectedRoute';
import { About } from './pages/About';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import AllLists from './pages/lists/AllLists';

function App() {
  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <Page>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='/auth/sign-up' element={<SignUp/>}/>
          <Route path='/auth/sign-in' element={<SignIn/>}/>
          <Route 
            path='/lists' 
            element={
              <ProtectedRoute>
                <AllLists/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Page>
    </div>
  );
}

export default App;
