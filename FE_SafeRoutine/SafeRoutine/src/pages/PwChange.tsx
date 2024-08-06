import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/PwChange.module.scss';
import TitleBar from '../assets/title_bar.png'
const PwChange: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();
  const [pwValid, setPwValid] = useState(false);
  
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

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>비밀번호 변경</h2>
        <img src={TitleBar} alt="" />
        <form onSubmit={handleCheckPassword}>
            <p>새로운 비밀번호를 입력해주세요.</p>
          <div style={{display :'flex', flexDirection :'column'}}>
            <div>
                <label htmlFor="password" style={{marginRight :'10px'}}>비밀번호 : </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={handlePw}
              style={{marginLeft :'21px'}}
            />
            <div className={styles.error}>
                {!pwValid && password.length >0 && (<div>비밀번호는 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>)}
            </div>
             
            </div>
           <div>
              <label htmlFor="password">비밀번호 확인 : </label>
            <input
              className={styles.input}
              type="password"
              id="password2"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
           </div>
           <div className={styles.error}>
           {confirm && password !== confirm && <div>비밀번호가 동일하지 않습니다.</div>}
           </div>
          
            
          </div>
          <button type="submit" disabled={!pwValid || password !== confirm}>확인</button>
        </form>
      </div>
    </div>
  );
};

export default PwChange;
