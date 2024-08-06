// Input.js
import React from 'react';
import check from '../../assets/check_box.png'
interface InputProps {
  type? : string;
  isClicked: boolean;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
  onInputChange: (value: string, identifier: string) => void;
  identifier: string;
}

const Input: React.FC<InputProps> = ({ type="text", isClicked, onFocus, onBlur, placeholder, onInputChange, identifier }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value, identifier);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center'  , marginBottom : '15px',marginTop :'10px'}}>
      <img src={check} alt="" style={{width :'20px',height :'20px',marginBottom :'0px'}} />
      <input
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={isClicked ? '' : placeholder}
        onChange={handleChange}
        style={{
          border: 'none',
          borderBottom: '5px solid gray',
          outline: 'none',
          marginLeft: '20px',
          marginTop: '10px',
          width: '200px',
        }}
      />
    </div>
  );
};

export default Input;
