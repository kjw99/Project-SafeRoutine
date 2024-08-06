import React from "react";
const NaverLogin = () => {
  const NAVER_CLIENT_ID = '' // 발급받은 클라이언트 아이디
  const REDIRECT_URI = "http://localhost:5173" // Callback URL
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return(
    <>
    <img src=".\src\assets\naver_login.png" alt="kakao_login" onClick={NaverLogin} style={{width : '45px', height : '45px'}} />
    </>

    
  )

  
};

export default NaverLogin;



