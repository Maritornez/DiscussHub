import React from 'react';
//import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import Header from './components/Header';
import ThemeList from './components/ThemeList';
import Home from './components/Home';
import ThreadList from './components/ThreadList';

export default function App() {
  

  return (
    <BrowserRouter>
      <Header />
      <ThemeList />
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/theme/:name' element = {<ThreadList />}/>
        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    </BrowserRouter>
  );
}
