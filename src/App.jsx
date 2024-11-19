import React from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;