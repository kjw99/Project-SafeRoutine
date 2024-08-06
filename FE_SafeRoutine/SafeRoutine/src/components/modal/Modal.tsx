import React from 'react';
import Modal from 'react-modal';

interface ModalOptionProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  customWidth?: string; // customWidth prop 추가
  customHeight?: string; // customHeight prop 추가
}

const ModalOption: React.FC<ModalOptionProps> = ({ isOpen, onClose, content, customWidth, customHeight }) => {
  const customModalStyles = {
    content: {
      maxWidth: customWidth || '300px', // props로 받은 customWidth를 사용하거나 기본값으로 '340px' 사용
      maxHeight: customHeight || '300px',
      margin: 'auto',
      padding: '3px',
      backgroundRepeat: 'no-repeat',
      overflow: 'auto',
      touchAction: 'none',
      borderRadius: '20px',
      borderColor: 'white',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(to bottom, #4E7E2E 0%, #D5DA10 100%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
      zIndex: 1000,
      
    },
  };

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} 
      style={customModalStyles}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      >
       <div style={{ position: 'absolute', top: '12px', right: '16px', zIndex: 2 }}>
          {/* 이미지 위치 설정 */}
          <img src=".\src\assets\x_button.png" alt="" 
          style={{ width: '22px', height: '22px', cursor:'pointer' }} 
          onClick={onClose}
          />
        </div>
        {content}
      </Modal>
    </>
  );
};

export default ModalOption;
