import React, { Component } from 'react';
// import NavbarContainer from '../containers/NavbarContainer.jsx';
import AppNavBar from '../components/NavBar.jsx';
import AppModal from '../components/Modal.jsx';
import PostQuestion from '../components/PostQuestion.jsx';
import QuestionBox from '../components/QuestionBox.jsx';
import { useEffect, useState } from 'react';
import './MainPage.scss';

function MainPage(props) {

  const [questions, setQuestions] = useState([]);

  // populate questions with the appropriate API call here.
  // start with just a general query for all questions
  // parse the response
  // If we want to implement search, we probably want a "search criteria" state here that we set
  // from the search bar component and use to add a query param to the questions API call
  const getQuestions = () => {
    fetch('http://localhost:8080/questions', {
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then((questions) => {
        console.log(questions);
        setQuestions(questions);
      });
  };

  // if we implement search, add search state to the empty array below to subscribe to changes
  useEffect(() => {
    getQuestions();
  }, []);

  // populate question boxes with all the data using a for loop
  // every question also needs an onClick handler that pops open the modal
  let QuestionBoxes = [];
  questions.forEach(el => {
    console.log(el);
  });

  // stretch:
  // we need to listen for changes to filters if we implement search
  // this is usually done with query params (?search=""&tag=""&role="", etc.)

  return (
    // <div className="MainPage">
    //   <span className="MainText">Answer.ing<br /></span>
    //   {/* <NavbarContainer /> */}
    //   <PostQuestion />
    //   {/* {questions} */}
    // </div>
    <main>
        <h1><strong>{'<'}</strong> Answer.ing <strong>{'/>'}</strong></h1>
        <PostQuestion/>
        {/* <form action="/api" method="POST">
            <textarea type="text" name="post" spellcheck="false" placeholder='// console.log("hello world!");' required></textarea>
            <button>Submit</button>
        </form> */}
        <hr/>
        <div class="container"/>
    </main>
  );
}

export default MainPage;