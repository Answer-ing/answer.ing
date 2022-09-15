import React, { Component } from 'react';

// do we actually need a separate Post Question component? This seems reasonable but could just be defined in the MainPage
function PostQuestion() {
  function submitQuestion(question) {
    fetch('http://localhost:8080/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(question),
    })
      .then(res => {
        if (res.status === 200) {
          console.log('Question posted successfully');

        }

      }
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
