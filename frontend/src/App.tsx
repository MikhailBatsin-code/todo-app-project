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
import { CreateList } from './pages/lists/CreateList';
import { DeleteList } from './pages/lists/DeleteList';
import { UpdateList } from './pages/lists/UpdateList';
import { List } from './pages/lists/List';
import { CreateItem } from './pages/items/CreateItem';
import { DeleteItem } from './pages/items/DeleteItem';
import { PageNotFound } from './pages/404';
import { UpdateItem } from './pages/items/UpdateItem';

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
          <Route 
            path='/lists/create' 
            element={
              <ProtectedRoute>
                <CreateList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/lists/delete/:id'
            element={
              <ProtectedRoute>
                <DeleteList/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/lists/update/:id'
            element={
              <ProtectedRoute>
                <UpdateList/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/lists/:id'
            element={
              <ProtectedRoute>
                <List/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/lists/:id/item/create'
            element={
              <ProtectedRoute>
                <CreateItem/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/items/delete/:id'
            element={
              <ProtectedRoute>
                <DeleteItem/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/items/update/:id'
            element={
              <ProtectedRoute>
                <UpdateItem/>
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </Page>
    </div>
  );
}

export default App;
