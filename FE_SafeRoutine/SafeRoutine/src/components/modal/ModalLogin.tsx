import React from 'react';
import { useState, FormEvent } from 'react';
import Modal from 'react-modal';
import GoogleLogin from '../sociallogin/GoogleLogin';
import Input from './InputElement';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openSignupModal, closeLoginModal } from '../../stores/ModalSlice';
import styles from '../../styles/ModalLogin.module.scss';
import Logo from '../../assets/logo.png'
import TitleBar from '../../assets/title_bar.png'
import XBtutton from '../../assets/x_button.png'

import userStore from '../../utils/userAxios';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLogin = ({ isOpen, onClose }: ModalProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email, emailClicked] = useState(false);
  const [pw, pwClicked] = useState(false);
  const [issue, setIssue] = useState({
    email: '',
    pw: '',
  });

  const handleSignupLinkClick = () => {
    dispatch(closeLoginModal());
    dispatch(openSignupModal());
  };

  const handleInputChange = (value: string, identifier: string) => {
    setIssue((prevIssue) => ({
      ...prevIssue,
      [identifier]: value,
    }));
  };

  const hSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      // 사용자 로그인 시도
      await userStore.userLogin2({
        email: issue.email, 
        passwd: issue.pw,
        name: '',
        phoneNumber: '',
        code: '',
        image: ''
      });
      if(sessionStorage.getItem('access-token')) {
        onClose()
        navigate('/group')
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      alert('아이디나 비밀번호가 틀렸습니다.');
    
      // 로그인 실패 처리
      // Add a more generic catch block to handle any type of error
      // This block will catch unexpected errors that might not be specific to login failure
    }
  };
 
  const customModalStyles = {
    content: {
      maxWidth: '440px',
      maxHeight: '520px',
      margin: 'auto',
      padding: '6px',
      backgroundRepeat: 'no-repeat',
      overflow: 'auto',
      touchAction: 'none',
      borderRadius: '20px',
      borderColor: 'white',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(to bottom, #4E7E2E 0%, #D5DA10 100%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
      zIndex : '1000',
      overFlow: 'hidden',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex : '1000'
    },
  };

  // useEffect(() => {
  //   const handleScroll = (event: Event) => {
  //     event.preventDefault();
  //   };

  //   if (isOpen) {
  //     // 모달이 열려있을 때 body에 스크롤 막기
  //     document.body.style.overflow = 'hidden';
  //     window.addEventListener('scroll', handleScroll, { passive: false });
  //   } else {
  //     // 모달이 닫혔을 때 body의 스크롤 원상복구
  //     document.body.style.overflow = 'auto';
  //     window.removeEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     // 컴포넌트가 언마운트될 때, 이벤트 리스너 제거
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        style={customModalStyles}
      >
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{/* 로고, x버튼 */}
            <img src={Logo} alt="" style={{ marginLeft: '160px', height: '50px' }} />
            <img src={XBtutton} alt="x_button" onClick={onClose} style={{ width: '20px', marginLeft: '125px', cursor: 'pointer' }} />
          </div>

          <img src={TitleBar} alt="" style={{ width: '400px' }} />
          <h2 style={{ color: '#4E7E2E', marginTop: '0px', marginBottom: '0px' }}>로그인</h2>

          <form onSubmit={hSubmit} style={{ margin: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Input
              isClicked={email}
              onFocus={() => emailClicked(true)}
              onBlur={() => emailClicked(false)}
              placeholder="아이디를 입력해주세요."
              onInputChange={handleInputChange}
              identifier="email"
            />
            <Input
              type="password"
              isClicked={pw}
              onFocus={() => pwClicked(true)}
              onBlur={() => pwClicked(false)}
              placeholder="비밀번호를 입력해주세요."
              onInputChange={handleInputChange}
              identifier="pw"
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                type="submit"
                style={{
                  border: '2px solid #4E7E2E',
                  backgroundColor: 'white',
                  color: '#4E7E2E',
                  width: '300px',
                }}
              >
                로그인
              </button>
            </div>
            <div style={{ fontSize: '12px', color: 'gray', marginTop: '10px' }}>
              <Link to="/findid" onClick={onClose} className={styles.font}>
                아이디/비밀번호를 잊으셨나요?
              </Link>
              <p onClick={handleSignupLinkClick} className={styles.font}>아직 회원이 아니신가요?</p>
            </div>
            <p style={{ color: '#4E7E2E', fontSize: '15px' }}>소셜 로그인</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '250px', marginTop: '10px', cursor: 'pointer' }}>
              {/* <KakaoLogin /> */}
              <GoogleLogin />
              {/* <NaverLogin /> */}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalLogin;
