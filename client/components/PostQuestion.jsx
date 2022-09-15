import React, { Component } from 'react';

// do we actually need a separate Search bar component
function PostQuestion() {
  return (
    <div>
      <textarea id="story" name="story" rows="4" cols="60">
        Post your interview question!
      </textarea>
      <br />
      <button>Post</button>
    </div>
  );
}

export default PostQuestion;
