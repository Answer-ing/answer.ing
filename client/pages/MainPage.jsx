import React, { Component } from 'react';
import NavbarContainer from '../containers/NavbarContainer.jsx';
import PostQuestion from '../components/PostQuestion.jsx';

function MainPage(props) {
  const questions = [];
  // populate questions with the appropriate API call here.
  // start with just a general query for all questions
  // parse the response
  // populate questions with all the data using a for loop
  // every question also needs an onClick handler that pops open the modal

  // stretch:
  // we need to listen for changes to filters if we implement search
  // this is usually done with query params (?search=""&tag=""&role="", etc.)

  return (
    <div>
      <h1>you have hit the main page. congrats you are a baller!</h1>
      <NavbarContainer />
      <PostQuestion />
      {/* {questions} */}
    </div>
  );
}

export default MainPage;
