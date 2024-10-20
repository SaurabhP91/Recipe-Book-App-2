import React from 'react'
import './homepage.css';
import Header from './../../components/header/Header';
import Search from './../../components/searchsection/Search';
import Popular from '../../components/popularsection/Popular';
const Homepage = () => {
  return (
    <div id='homepage-container'>
      <Header/>
      <Search/>
      <Popular/>
    </div>
  )
}

export default Homepage
