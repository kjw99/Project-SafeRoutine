import React from 'react';
import ManageBar from '../components/manage/ManageBar';

const Stat: React.FC = () => {
  return (
    <div style={{ paddingTop: '180px' }}>
      <ManageBar /> {/* 항상 ManageBar만 렌더링합니다. */}
      <h1>주간계획입니다.</h1>
    </div>
  );
};

export default Stat;