import React, { Component } from 'react';

// do we actually need a separate Post Question component? This seems reasonable but could just be defined in the MainPage
function PostQuestion() {
  function submitQuestion(question, company) {
    fetch('http://localhost:8080/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, company }),
    })
      .then(res => {
        if (res.status === 200) {
          console.log('Question posted successfully');
        }
      });
    // need to clear out hte question and company boxes now. dunno if those should be in state
    // also need to tie this to an on click even on the post button
    // also, we need a "company" field here.
  }

  return (
    <div>
      <textarea id="postQuestion" name="story" rows="4" cols="60">
        Post your interview question!
      </textarea>
      <br />
      <button>Post</button>
    </div>
  );
}

export default PostQuestion;
