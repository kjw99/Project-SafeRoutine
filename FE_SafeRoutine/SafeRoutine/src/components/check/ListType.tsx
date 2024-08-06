import React, { useState, ChangeEvent } from 'react';
import styles from '../../styles/ListType.module.scss'; // 스타일 시트 파일 이름을 확인하세요.

const ListTypeSelector = () => {
  const [selectedType, setSelectedType] = useState('common'); // 기본값 설정

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>리스트 목표 설정</span>
      <label className={styles.option}>
        <input
          type="radio"
          name="listType"
          value="common"
          checked={selectedType === 'common'}
          onChange={handleChange}
        />
        공통
      </label>
      <label className={styles.option}>
        <input
          type="radio"
          name="listType"
          value="individual"
          checked={selectedType === 'individual'}
          onChange={handleChange}
        />
        개인
      </label>
      <div style={{ marginLeft: 'auto' }}>
        <button className={styles.button}>리스트 불러오기</button>
      </div>
    </div>
  );
};

export default ListTypeSelector;
