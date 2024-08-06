import React from "react";
const KakaoLogin = () => {
  const REST_API_KEY = '';
  const REDIRECT_URI = 'http://localhost:5173';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <>
   
    <img src=".\src\assets\kakao_login.png" alt="kakao_login" onClick={loginHandler} style={{width: '200px'}} />
    </>
    
  );
};

export default KakaoLogin;