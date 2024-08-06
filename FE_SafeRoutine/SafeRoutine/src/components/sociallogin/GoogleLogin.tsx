import React from "react";
import SocialLogin from '../../assets/social_login.png'
const GoogleLogin = () => {
  const Client_id = '900947080683-k8lcr5qhickcbm892eufjgogabnan9sn.apps.googleusercontent.com';
  const REDIRECT_URI = 'https://i10b102.p.ssafy.io';
  const link = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${Client_id}&redirect_uri=${REDIRECT_URI}`;

  const loginHandler = () => {
    window.location.href = link;
    // Note: 아래 코드는 페이지 변경 시에는 의미가 없습니다.
    // 페이지가 변경된 후에는 현재 페이지의 URL을 읽어오게 됩니다.
    // const code = new URL(window.location.href).searchParams.get("code");
  };

  return (
    <>
      <img src={SocialLogin} alt="kakao_login" onClick={loginHandler} style={{ width: '200px', cursor: 'pointer'}} />
    </>
  );
};

export default GoogleLogin;
