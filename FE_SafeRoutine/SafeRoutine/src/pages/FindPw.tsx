import React, { useState, FormEvent } from 'react';
import styles from '../styles/findpw.module.scss';
import { Link } from 'react-router-dom';
import Line from '../components/input/InputLine';
import {useDispatch} from 'react-redux';
import {openLoginModal,openSignupModal} from '../stores/ModalSlice'; 
import TitleBar from '../assets/title_bar.png'
import userStore from '../utils/userAxios';

const Find: React.FC = () => {
  const dispatch =useDispatch()
  const handleLoginClick = () => {
    
    dispatch(openLoginModal());
  };
  const handleSignupClick = () => {
    
    dispatch(openSignupModal());
  }
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [PhoneNumber, setPhoneNumber] = useState<string>('');

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleEmailChange = (value:string) => {
    setEmail(value);
  }
  const handleOtherFieldChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    userStore.userFindPwd({
      name : name, 
      phoneNumber : PhoneNumber,
      email: email,
      passwd: '',
      code: '',
      image: ''
    })
  
  };
  

  return (
    <div className={styles.container}>
      <h2>비밀번호 찾기</h2>
      <img src={TitleBar} alt="" />
      <div className={styles.element}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Line placeholder={'이름을 입력해주세요'} onChange={handleNameChange} />
          <Line placeholder={'아이디를 입력해주세요.'} onChange={handleEmailChange} />
          <Line placeholder={'휴대폰 번호를 입력해주세요.'} onChange={handleOtherFieldChange} />
        </form> 
        <div className={styles.bottom}>
        <p onClick={handleLoginClick}>로그인</p>
        <Link to="/findid">아이디 찾기</Link>
        <p onClick={handleSignupClick}>회원가입</p>
      </div>
      </div>
     
    </div>
  );
};

export default Find;
