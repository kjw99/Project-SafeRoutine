import React from 'react';
import styles from '../../styles/Footer.module.scss';
import { Link } from 'react-router-dom';
import whiteText from '../../styles/LinkColorWhite.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        {/* 그룹1 */}
        <div className={styles.group}>
          <div className={`${styles.column} ${styles.mainService}`}>
            <h2 className={styles.title}>
              <Link to="/" className={whiteText.link}>메인 페이지</Link>
            </h2>
          </div>
          <div className={`${styles.column} ${styles.serviceIntro}`}>
            <h2 className={styles.title}>
              <Link to="/Service" className={whiteText.link} >서비스 소개</Link>
            </h2>
          </div>
        </div>
        <hr className={styles.separator} />
        {/* 그룹2 */}
        <div className={styles.group2}>
          <div className={`${styles.column} ${styles.mainService}`}>
            <p className={whiteText.link} >로그인</p>
            <p className={whiteText.link} >내 정보</p>
            <p className={whiteText.link} >회원가입</p>
          </div>
          <div className={`${styles.column} ${styles.serviceIntro}`}>
            <p className={whiteText.link} >팀 목표</p>
            <p className={whiteText.link} >서비스 이용 방법</p>
            <p className={styles.hidden}>x</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
