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

        <hr/>
        <div className="container">
          <div className="confession">
            <div className="postHeader">
              <strong>Google</strong>
              <span><strong> Tyler Wilson </strong> &nbsp; <b> 9/29/22 </b> &nbsp; 8:06 PM </span>
            </div>
            <p><em>"What is concurrency?"</em></p>
            {/* <p><em class="tags">JavaScript</em><em class="tags">FAANG</em></p> */}
          </div>

            {/* <div className="comment">
              <div className="postHeader">
                <span><strong> Luke Roberts </strong> &nbsp; <b> 9/29/22 </b> &nbsp; 8:06 PM </span>
              </div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores blanditiis quae doloremque vero cupiditate nesciunt esse accusamus inventore ut dignissimos. Earum vel, beatae ea labore molestias magnam nesciunt dolorem praesentium!
            </div> */}

          <div className="confession">
            <div className="postHeader">
              <strong>Amazon</strong>
              <span><strong> Emily Bae </strong> &nbsp; <b> 9/29/22 </b> &nbsp; 1:24 PM </span>
            </div>
            <p><em>"Can you explain event bubbling?"</em></p>
          </div>

          <div className="confession">
            <div className="postHeader">
              <strong>Spotify</strong>
              <span><strong> Andrew Jung </strong> &nbsp; <b> 9/28/22 </b> &nbsp; 11:39 AM </span>
            </div>
            <p><em>"What was a time when something you worked on made an impact?"</em></p>
          </div>

          <div className="confession">
            <div className="postHeader">
              <strong>Crunchyroll</strong>
              <span><strong> Jeff Wentworth </strong> &nbsp; <b> 9/28/22 </b> &nbsp; 5:23 PM </span>
            </div>
            <p><em>"What are the three golden rules of React state?"</em></p>
          </div>

          <div className="confession">
            <div className="postHeader">
              <strong>Microsoft</strong>
              <span><strong> Mimi Le </strong> &nbsp; <b> 9/26/22 </b> &nbsp; 6:28 PM </span>
            </div>
            <p><em>"Can you explain minification and uglification?"</em></p>
          </div>

          <div className="confession">
            <div className="postHeader">
              <strong>AirBnB</strong>
              <span><strong> Nick Krug </strong> &nbsp; <b> 9/28/22 </b> &nbsp; 4:07 PM </span>
            </div>
            <p><em>"How would you go about designing a web cache?"</em></p>
          </div>

          <div className="confession">
            <div className="postHeader">
              <strong>TikTok</strong>
              <span><strong> Hui Mu </strong> &nbsp; <b> 9/27/22 </b> &nbsp; 11:44 AM </span>
            </div>
            <p><em>"How is React routing different from conventional routing?"</em></p>
          </div>

          

        </div>
    </main>
  );
}

export default MainPage;