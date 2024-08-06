import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/PwConfirm.module.scss';
import TitleBar from '../assets/title_bar.png'
const PwConfirm: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCheckPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // 서버로 비밀번호 전송
      const response = await axios.post('서버 API 엔드포인트', { password });

      // 서버 응답 확인
      const data = response.data;

      if (data.isValidPassword) {
        navigate('/Profile');
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('비밀번호 확인 요청 에러:', error);
      // 에러 처리
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>비밀번호 변경</h2>
        <img src={TitleBar} alt=""   />
        <form onSubmit={handleCheckPassword}>
          <div>
            <p>비밀번호를 다시 한번 입력해주세요.</p>
            <label htmlFor="password">비밀번호 : </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">확인</button>
        </form>
      </div>
    </div>
  );
};

export default PwConfirm;
