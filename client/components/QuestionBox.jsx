import React, { Component } from 'react';

// possible layout for this based on the excalidraw.
// flexbox for Company and the (+num) circle + the user & timestamp
// then a textbox with the question in it
// then on the bottom, another flexbox with
// the number of comments and name and timestamp with the latest comment

function QuestionBox(props) {
  const {
    companyName,
    companyCount,
    username,
    latestQuestionTimestamp,
    questionText,
    answerCount,
    latestResponseTimestamp,
  } = props;

  return (
    <div className="questionBox" onClick={() => console.log('make the modal pop up here')}>
      {/* this top bit needs to be a flexbox I think with maximum space between child elements */}
      <div className="questionBoxHeaderFooter">
        <div>
          <p>{companyName}</p>
          <i className="numberIcon">
            {`+${companyCount - 1}`}
          </i>
        </div>
        <div>
          <span>{`${username} ${latestQuestionTimestamp}`}</span>
        </div>
      </div>
      <p className="questionText">{questionText}</p>
      <div className="questionBoxHeaderFooter">
        <div>
          <p>{`${answerCount} responses`}</p>
        </div>
        <div>
          <p>{`Latest: ${latestResponseTimestamp}`}</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionBox;
