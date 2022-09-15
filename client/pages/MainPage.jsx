import React, { Component, useState, useEffect } from 'react';
import NavbarContainer from '../containers/NavbarContainer.jsx';
import PostQuestion from '../components/PostQuestion.jsx';
import QuestionBox from '../components/QuestionBox.jsx';

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
  const QuestionBoxes = [];
  questions.forEach(el => {
    QuestionBoxes.push(
      <QuestionBox
        companyName={el.companyName}
        companyCount={el.companyCount}
        username={el.username}
        latestQuestionTimestamp={el.latestQuestionTimestamp}
        questionText={el.questionText}
        responseCount={el.responseCount}
        latestResponseTimestamp={el.latestResponseTimestamp}
        key={`question${el.id}`}
        id={el.id}
      />,
    );
  });

  // stretch:
  // we need to listen for changes to filters if we implement search
  // this is usually done with query params (?search=""&tag=""&role="", etc.)

  return (
    <div className="MainPage">
      <span className="MainText">Answer.ing<br /></span>
      <NavbarContainer />
      <PostQuestion />
      {/* {QuestionBoxes} */}
    </div>
  );
}

export default MainPage;
