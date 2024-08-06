// Button.tsx
import React from "react";
import styles from "../../styles/Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  color: string;
  size: string;

  onClick?: () => void; // Optional onClick function
}

const Button: React.FC<ButtonProps> = ({ children, color, size, onClick }) => {
  return (
    <button
      className={`${styles[color]} ${styles[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
