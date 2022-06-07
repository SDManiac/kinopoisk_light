import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainContainer from './Components/MainContainer';
import Header from './Components/Header';
import FilmContainer from './Components/FilmContainer';

function App() {
const [search, setSearch] = useState('');

const handleSearchChange = (search) => {
    setSearch(search);
}

const removeSearch = () => {
    setSearch('')
}

  return (
    <BrowserRouter>
        <Header onChange={handleSearchChange}/>
        <Routes>
            <Route path='/' element={<MainContainer searchValue={search} removeSearch={removeSearch}/>} />
            <Route path='/film/:id' element={<FilmContainer searchValue={search}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
