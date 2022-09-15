import React, { Component } from 'react';

// const CLIENT_ID = '78jexcndblghpj';
// const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A8080%2Flogin';
// const SCOPE = 'r_liteprofile r_emailaddress';

export const LandingPage = (props) => {

  //Redirect user to LinkedIn OAuth then if successful set authenticated to true
  async function logIn() {
    // INSERT GOOGLE OAUTH REQUEST HERE.
    //parent.open(`https://www.linkedin.com/oauth/v2/authorization/?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state="A9Sd.udf8-d1"&scope=${SCOPE}`)

    //result.isInSystem === true => 
    props.changeAuthenticated(true);
  }

  return (
    <div className="LandingPage">
      <img id='codesmithImg' src="https://miro.medium.com/max/1200/1*aqCqaO8ALzYczUHe_3g3Gw.jpeg" alt="Codesmith Logo"></img>
      <span className="LandingText">Welcome to <br /> Codesmith's Answering Service<br /></span>
      <button className="LogInButton" onClick={() => logIn()}></button>
    </div>
  );
};
