import React, { useState, FormEvent } from 'react';
import styles from '../styles/findid.module.scss';
import { Link } from 'react-router-dom';
import Line from '../components/input/InputLine';
import {useDispatch} from 'react-redux';
import {openLoginModal,openSignupModal} from '../stores/ModalSlice'; 
import TitleBar from '../assets/title_bar.png'
import userStore from '../utils/userAxios';

const Find: React.FC = () => {
  const dispatch = useDispatch();
  const handleLoginClick = () => {
    
    dispatch(openLoginModal());
  };
  const handleSignupClick = () => {
    
    dispatch(openSignupModal());
  };
  const [name, setName] = useState<string>('');
  const [PhoneNumber, setPhoneNumber] = useState<string>('');

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleOtherFieldChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    userStore.userFindEmail({
      name : name, 
      phoneNumber : PhoneNumber,
      email: '',
      passwd: '',
      code: '',
      image: ''
    })
    
  };
  

  return (
    <div className={styles.container}>
      <h2>아이디 찾기</h2>
      <img src={TitleBar} alt="" />
      <div className={styles.element}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Line placeholder={'이름을 입력해주세요'} onChange={handleNameChange} />
          <Line placeholder={'휴대폰 번호를 입력해주세요.'} onChange={handleOtherFieldChange} />
        </form>  
        <div className={styles.bottom}>
        <p onClick={handleLoginClick}>로그인</p>
        <Link to="/findpw">비밀번호 찾기</Link>
        <p onClick={handleSignupClick}>회원가입</p>
      </div>
    
      </div>
    </div>
  );
};

export default Find;
