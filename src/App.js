import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainContainer from './Components/MainContainer';
import Header from './Components/Header';
import FilmContainer from './Components/FilmContainer';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/film/:id' element={<FilmContainer />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
