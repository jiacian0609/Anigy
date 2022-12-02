import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './containers/Main';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Post from './containers/Post';
import Manage from './containers/Manage';
import Create from './containers/Create';
import Edit from './containers/Edit';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
