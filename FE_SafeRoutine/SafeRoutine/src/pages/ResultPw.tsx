import React from 'react';
import {Link} from "react-router-dom"
import styles from '../styles/ResultPw.module.scss'
import CommonButton from '../components/button/common';
import TitleBar from '../assets/title_bar.png'

const Find: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>비밀번호 전송</h2>
      <img src={TitleBar} alt="" />
      <div className={styles.element}>
        <div className={styles.main} >
            <h3>가입하신 이메일로 임시 비밀번호가 전송되었습니다.</h3>
            <p>(이메일 주소)</p>
        </div>


        <div className={styles.bottom}>
        <div className={styles.button_style1}>
            <CommonButton buttonText='로그인' />
        </div>
        <div className={styles.button_style2}>
        <Link to="/findpw" ><CommonButton buttonText='뒤로가기' /></Link>
        </div>
          
      </div>
    
      </div>
    </div>
  );
};

export default Find;
