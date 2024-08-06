import React from 'react';
import {Link} from "react-router-dom"
import styles from '../styles/ResultId.module.scss'
import CommonButton from '../components/button/common';
import TitleBar from '../assets/title_bar.png'
// import axios from 'axios';
// const sendDataToServer = async (name: string, otherField: string) => {
//   try {
//     const response = await axios.post('/api/submit', { name, otherField });
//     // 여기서 서버로부터의 응답에 따라 필요한 로직을 추가할 수 있습니다.
//     return response.data;
//   } catch (error) {
//     console.error('Error sending data to the server:', error);
//     throw error;
//   }
// };
const Find: React.FC = () => {


  return (
    <div className={styles.container}>
      <h2>아이디 확인</h2>
      <img src={TitleBar} alt="" />
      <div className={styles.element}>
        <div className={styles.main} >
            <h2>회원님의 아이디는 ... 입니다.</h2>
        </div>


        <div className={styles.bottom}>
        <div className={styles.button_style1}>
            <CommonButton buttonText='로그인' />
        </div>
        <div className={styles.button_style2}>
        <Link to="/findid" ><CommonButton buttonText='뒤로가기' /></Link>
        </div>
          
      </div>
    
      </div>
    </div>
  );
};

export default Find;
