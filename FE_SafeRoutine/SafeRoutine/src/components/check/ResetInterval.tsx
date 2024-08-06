import React, { useState, ChangeEvent } from 'react';
import styles from '../../styles/ResetInterval.module.scss'; // 스타일 시트 파일 이름을 확인하세요.
import Camera from '../../assets/camera.png'

const ResetIntervalSelector = () => {
  const [selectedInterval, setSelectedInterval] = useState('daily'); // 기본값 설정

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedInterval(event.target.value);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>초기화 주기 설정</span>
      <label className={styles.option}>
        <input
          type="radio"
          name="resetInterval"
          value="none"
          checked={selectedInterval === 'none'}
          onChange={handleChange}
        />
        없음
      </label>
      <label className={styles.option}>
        <input
          type="radio"
          name="resetInterval"
          value="daily"
          checked={selectedInterval === 'daily'}
          onChange={handleChange}
        />
        일간
      </label>
      <label className={styles.option}>
        <input
          type="radio"
          name="resetInterval"
          value="weekly"
          checked={selectedInterval === 'weekly'}
          onChange={handleChange}
        />
        주간
      </label>
      <input type="text" placeholder="사용자 설정" className={styles.input} />
      <img className={styles.CameraImage} src={Camera}/>
      <button className={styles.button}>기준 날짜</button>
    </div>
  );
};

export default ResetIntervalSelector;
