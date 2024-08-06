import React from 'react';
import { useState, FormEvent } from 'react';
import Modal from 'react-modal';
import Input from './InputElement'
import {useDispatch} from 'react-redux';
import {closeSignupModal,openLoginModal
} from '../../stores/ModalSlice'; 
import styles from '../../styles/ModalSignup.module.scss'
import Logo from '../../assets/logo.png'
import TitleBar from '../../assets/title_bar.png'
import XBtutton from '../../assets/x_button.png'
import userStore from '../../utils/userAxios';
interface ModalSignupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSignup: React.FC<ModalSignupProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const handleLoginLinkClick = () => {
    // Close the login modal and open the signup modal
    dispatch(closeSignupModal());
    dispatch(openLoginModal());
  };
  const [name, nameClicked] = useState(false);
  const [email, emailClicked] = useState(false);
  const [pw1, pw1Clicked] = useState(false);
  const [pw2, pw2Clicked] = useState(false);
  const [phone, phoneClicked] =useState(false)
  const [issue, setIssue] = useState({
    name: '',
    email: '',
    pw1: '',
    pw2: '',
    phone: '',
  });

  const handleInputChange = (value: string, identifier: string) => {
    setIssue((prevIssue) => ({
      ...prevIssue,
      [identifier]: value,
    }));
  };
  const hSubmit = (e: FormEvent) => {
    e.preventDefault();
  
    const isAllFieldsFilled = Object.values(issue).every((value) => value !== '');
  
    if (isAllFieldsFilled) {
      onClose();
      userStore.userRegist({
        email: issue.email,
        passwd: issue.pw1,
        name: issue.name,
        phoneNumber: issue.phone,
        code: '',
        image: '',
      });
      setTimeout(() => {
        window.alert('성공적으로 제출되었습니다!');
      }, 700);
    } else {
      console.log(issue);
      window.alert('값이 모두 입력되지 않았습니다.');
    }
  };
  const customModalStyles = {
    content: {
      maxWidth: '440px',
      maxHeight: '600px',
      margin: 'auto',
      padding: '6px',
      backgroundRepeat: 'no-repeat',
      overflow: 'auto',
      touchAction: 'none',
      borderRadius: '20px',
      borderColor: 'white', 
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(to bottom, #4E7E2E 0%, #D5DA10 100%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
      zIndex : '1000'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex : '1000'
    },
  };

  return (
    <>
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          style={customModalStyles}
        >
      
          <div style = {{ textAlign : 'center', padding :'10px'}}>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{/* 로고, x버튼 */}
          <img src={Logo} alt="" style={{ marginLeft: '160px', height :'50px' }} />  
          <img src={XBtutton} alt="x_button"  onClick={onClose} style={{width : '20px', marginLeft: '125px', cursor: 'pointer'}} />
          </div>

          <img src={TitleBar} alt="" style={{width :'380px'}}/>
          <h2 style={{color : '#4E7E2E', marginBottom :'0px',fontSize : '15px' }}>회원 가입 후 서비스를 이용해보세요!</h2>
          
          <form onSubmit={hSubmit} style={{ margin: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
          
          <Input
              isClicked={name}
              onFocus={() => nameClicked(true)}
              onBlur={() => nameClicked(false)}
              placeholder="이름을 입력해주세요."
              onInputChange={handleInputChange}
              identifier="name"
            />
          <Input
              isClicked={email}
              onFocus={() => emailClicked(true)}
              onBlur={() => emailClicked(false)}
              placeholder="아이디(이메일)을 입력해주세요."
              onInputChange={handleInputChange}
              identifier="email"
            />

            <Input
              type='password'
              isClicked={pw1}
              onFocus={() => pw1Clicked(true)}
              onBlur={() => pw1Clicked(false)}
              placeholder="비밀번호를 입력해주세요."
              onInputChange={handleInputChange}
              identifier="pw1"
            />
          <Input
              type='password'
              isClicked={pw2}
              onFocus={() => pw2Clicked(true)}
              onBlur={() => pw2Clicked(false)}
              placeholder="비밀번호를 다시 입력해주세요."
              onInputChange={handleInputChange}
              identifier="pw2"
            />

           <Input
              isClicked={phone}
              onFocus={() => phoneClicked(true)}
              onBlur={() => phoneClicked(false)}
              placeholder="전화번호를 입력해주세요."
              onInputChange={handleInputChange}
              identifier="phone"
            />

            
            <div style={{ display: 'flex',  alignItems: 'center', marginTop :'30px'}}>
            <button 
              type="submit" 
              onClick={hSubmit}
              style={{ 
                border: '2px solid #4E7E2E', 
                backgroundColor: 'white', 
                color: '#4E7E2E',
                width: '300px',
               

              }}
            >
            가입하기
            </button>
            
            </div>
            
                <p className={styles.font} onClick={handleLoginLinkClick}>이미 회원이신가요?</p>
          
          
          </form> 
          
          </div>
        
        </Modal>
    </>
  );
};

export default ModalSignup;    
            
         