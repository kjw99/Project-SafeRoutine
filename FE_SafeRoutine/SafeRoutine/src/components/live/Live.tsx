import React from 'react';
import styles from '../../styles/LiveStream.module.scss';
import LiveButton from '../live/LiveButton'

const Live: React.FC = () => {
  return (
    <div className={styles.LiveStream}>
        화상회의
      <LiveButton/>
    </div>
  );
};

export default Live;