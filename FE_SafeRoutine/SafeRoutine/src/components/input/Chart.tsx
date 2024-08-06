import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = () => {
  // 전체 칸 수와 채워진 칸 수를 정의합니다.
  const total = 5;
  const filled = 1;

  // 채워진 칸의 비율을 계산합니다. (예: 1/7)
  const filledRatio = (filled / total) * 100;

  return (
    <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${filledRatio}%` }}
        transition={{ duration: 1 }}
        style={{ height: '20px', backgroundColor: '#007bff', borderRadius: '10px' }}
      />
    </div>
  );
};

export default ProgressBar;
