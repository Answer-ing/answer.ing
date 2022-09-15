import React, { Component } from 'react';
import SearchBar from '../components/SearchBar.jsx';

function NavbarContainer(props) {
  return (
    <div className="navbar">
      <a className="logo" onClick={() => clickFunction('Home')}>Home</a>
      <SearchBar setSearch={props.setSearch} />
      <a className="usericon" onClick={() => clickFunction('UserProfile')}>User Profile</a>
    </div>
  );
}

export default NavbarContainer;
