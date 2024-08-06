import React, { useState, ChangeEvent } from 'react';
import styles from '../../styles/Radio.module.scss'; // 스타일 시트 파일 이름을 확인하세요.

const RadioButtons = () => {
  const [selectedOption, setSelectedOption] = useState('common'); // 기본값 설정

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.container}>
      <span className={styles.listType}>리스트분류</span>

      <label className={styles.radioButton}>
        <input
          type="radio"
          name="listType"
          value="common"
          checked={selectedOption === 'common'}
          onChange={handleChange}
        />
        공통
      </label>

      <label className={styles.radioButton}>
        <input
          type="radio"
          name="listType"
          value="individual"
          checked={selectedOption === 'individual'}
          onChange={handleChange}
        />
        개인
      </label>

      <button className={styles.goToListButton}>리스트 보러가기</button>
    </div>
  );
};

export default RadioButtons;
