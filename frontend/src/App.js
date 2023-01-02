import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from './components/Header';

import Main from './containers/Main';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Post from './containers/Post';
import Manage from './containers/Manage';
import Create from './containers/Create';
import Edit from './containers/Edit';
import Account from './containers/Account';
import Modal from './containers/AccountModal';
import NotFound from './containers/NotFound.js'

function App() {
  const [jwt, setJwt] = useState('');

  useEffect(() => setJwt(localStorage.getItem('JWT')), []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryHover: '#365A33',
          colorPrimaryTextActive: '#365A33',
          colorPrimary: '#748D72',
        },
      }}
    >
      <Router>
        <Header jwt={jwt} />
        <div style={{paddingTop: '100px'}}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signIn" element={<SignIn setJwt={setJwt} />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/account" element={<Account setJwt={setJwt} />} />
            <Route path="/account/Modal" element={<Modal />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <ToastContainer position='bottom-right'/>
      </Router>
    </ConfigProvider>
  );
}

export default App;
