// GroupCard.tsx
import React from "react";
import styles from "../../styles/AddGroup.module.scss";

interface AddGroupProps {
  onClick?: () => void; // Optional onClick function
}

const AddGroup: React.FC<AddGroupProps> = ({ onClick }) => {
  return (
    <div className={styles.groupCard}>
      <button onClick={onClick}>+</button>
    </div>
  );
};

export default AddGroup;
