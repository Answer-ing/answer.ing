import React, { useState, useEffect } from 'react';
import { LandingPage } from './LandingPage.jsx';
import MainPage from './MainPage.jsx';


// Approach:
// check if authenticated on load using a hook as the first thing
// Display lightweight static landing page that goes away when authed
// If not authenticated, leave the landing page up
// If authenticated, unmount the landing page component and mount 2 things
//   the nav bar
//   the questions container, which fetches the questions

// Easily separable tasks, especially once we can display questions < first priority!!!
//   Displaying comments for a question with the modal/lightbox
//   User profile page

function App() {
  const [isAuthenticated, changeAuthenticated] = useState(false);

  // code adapted from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
  // ?. explained here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const getCookie = (cookie) => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(cookie + '='))
      ?.split('=')[1];
  };

  // on page load, check authentication status. the [] at the end signals we will never re-check this session.
  // i.e. we're not subscribing this useEffect hook to any other changes in state.
  useEffect(() => {
    if (getCookie('sessionID')) {
    console.log('found a session cookie. validating...')
    fetch('http://localhost:3000/verifyuser', {
      credentials: 'same-origin',
    })
    .then(res => {
      if (res.status === 200) changeAuthenticated(true);
      else document.cookie = 'SessionID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure'
    });
    }
  }, []);

  return (
    <>
      {
        isAuthenticated
          ? <MainPage changeAuthenticated={changeAuthenticated}/>
          : <LandingPage changeAuthenticated={changeAuthenticated}/>
      }
    </>
  );
}

export default App;
