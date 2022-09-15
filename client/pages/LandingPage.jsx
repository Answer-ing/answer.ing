import React, { Component } from 'react';

// const CLIENT_ID = '78jexcndblghpj';
// const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A8080%2Flogin';
// const SCOPE = 'r_liteprofile r_emailaddress';

export const LandingPage = (props) => {

  //Redirect user to LinkedIn OAuth then if successful set authenticated to true
  async function logIn() {
    const CLIENT_ID = 'Iv1.17f49f5c8005c3c4';
    // INSERT GOOGLE OAUTH REQUEST HERE.
    //parent.open(`https://www.linkedin.com/oauth/v2/authorization/?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state="A9Sd.udf8-d1"&scope=${SCOPE}`)
    parent.open(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`)
    //result.isInSystem === true => 
    props.changeAuthenticated(true);
  }

  return (
    <div className="LandingPage">
      <img id='codesmithImg' src="https://miro.medium.com/max/1200/1*aqCqaO8ALzYczUHe_3g3Gw.jpeg" alt="Codesmith Logo"></img>
      <span className="LandingText">Welcome to <br /> Codesmith's Answering Service<br /></span>
      <button className="LogInButton" onClick={() => logIn()}>Sign in with GitHub</button>
      {/* <h1>Answer-ing</h1> */}
      {/* <button className='consent' onClick={() => logIn()}>Register with GitHub</button> */}
      {/* <button className='consent' onClick={() => parent.open(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`)}>Register with GitHub</button> */}
    </div>
  );
};
