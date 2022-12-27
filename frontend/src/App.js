import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import Main from './containers/Main';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Post from './containers/Post';
import Manage from './containers/Manage';
import Create from './containers/Create';
import Edit from './containers/Edit';
import Account from './containers/account';
import Modal from './components/AccountModal';
import NotFound from './containers/NotFound.js'

function App() {
  return (
    <Router>
      <Header />
      <div style={{paddingTop: '100px'}}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/Modal" element={<Modal />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
