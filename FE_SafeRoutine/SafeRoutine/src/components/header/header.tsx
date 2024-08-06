import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Header.module.scss';
import logo from '../../assets/logo.png';
import blackText from '../../styles/LinkColorBlack.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {openLoginModal,
  closeLoginModal,
  openSignupModal,
  closeSignupModal,
} from '../../stores/ModalSlice' // slice.js에서 가져온 액션 생성자
import { RootState } from '../../stores/RootReducer'
import ModalLogin from '../modal/ModalLogin';
import ModalSignup from '../modal/ModalSignup';


const Header: React.FC = () => { 
  const navigate =useNavigate()
  const logout = () => {
    sessionStorage.removeItem('access-token')
    navigate('/') 
    location.reload()
    
  }

  const dispatch = useDispatch();
  const isLoginOpen = useSelector((state: RootState) => state.modal.isLoginOpen);
  const isSignupOpen = useSelector((state: RootState) => state.modal.isSignupOpen);
  const modalLoginOpen = () => {
    dispatch(openLoginModal());
  };
  const modalLoginClose = () => {
    dispatch(closeLoginModal());
  };

  const modalSignupOpen = () => {
    dispatch(openSignupModal());
  };
  const modalSignupClose = () => {
    dispatch(closeSignupModal());
  };

  if(sessionStorage.getItem("access-token")){
    return (
    
      <header className={styles.header}>
        <div className={styles.contents}>
          <div>
          <Link to="/" className={blackText.link}> <img src={logo}/></Link>
          </div>
            <nav className={styles.navigation}>
              <ul>
                <li>
                  <Link to="/" className={blackText.link}>메인 페이지</Link>
                </li>
                <li>
                  <Link to="/Service" className={blackText.link}>서비스 사용법</Link>
                </li>
                <li>
                  <Link to="/group" className={blackText.link}>그룹 리스트</Link>
                </li>
              </ul>
            </nav>
            <Link to="/profile" className={blackText.link}>마이페이지</Link>
            <p className={styles.headerButton} onClick={logout}>로그아웃</p>
          </div>
      </header>
    );
  }
  else{
  return (
    
    <header className={styles.header}>
      <div className={styles.contents}>
        <div>
        <Link to="/" className={blackText.link}> <img src={logo}/></Link>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link to="/" className={blackText.link}>메인 페이지</Link>
            </li>
            <li>
              <Link to="/Service" className={blackText.link}>서비스 사용법</Link>
            </li>
          </ul>
        </nav>
        <p className={styles.headerButton} onClick={modalLoginOpen}>로그인</p>
        <p className={styles.headerButton} onClick={modalSignupOpen}>가입하기</p>
    
      </div>
      <ModalLogin isOpen={isLoginOpen} onClose={modalLoginClose} />
      <ModalSignup isOpen={isSignupOpen} onClose={modalSignupClose} />
    </header>
  );
}
};

export default Header;

