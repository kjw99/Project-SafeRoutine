// Profile.tsx
import React, { useState,useEffect,useRef } from 'react';
import ProfileInput from '../components/input/ProfileInput';
import styles from '../styles/Profile.module.scss'
import Button from '../components/button2/Button';
import PersonCircle from '../assets/PersonCircle.png'
import userStore from '../utils/userAxios';
import S3_STORE from '../utils/imageAxios';
import ModalBlack from '../components/modal/ModalBlack';
import axios from 'axios';
import AXIOS from '../constants/constAxios';
import { useNavigate } from 'react-router';
const Profile: React.FC = () => {
  const navigate =useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(''); // 이름 
  const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호
  const [image, setImage] = useState<File | null>(null); // 이미지 파일을 상태로 관리
  const [imageName, setImageName] = useState<string>('');
  const [secessionModal, setSecessionModal] =useState(false)
  const secessionModalOpen = () =>setSecessionModal(true);
  // 그룹 정보 수정 모달을 닫는 함수
  const secessionModalClose = () => setSecessionModal(false);

  
 useEffect(() => {// 페이지가 렌더링 되자 마자 실행할 함수

  const fetchData = async () => {
  try{
      const rslt = await userStore.userInfo();
      setName(rslt.name);
      setPhoneNumber(rslt.phoneNumber);
      setImageName(rslt.profileImage);
    }catch{
      console.log("err");
    }
  };
  fetchData();

  },[]); // 두 번째 인자로 빈 배열을 전달하면 마운트될 때 한 번만 실행.

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
  };


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0] as File | undefined;
    setImage(selectedImage || null);
    console.log(selectedImage)
    const fileName = selectedImage != undefined ? await S3_STORE.selfImageUpload(selectedImage) : '';
    if(fileName !== '') setImageName(fileName);
  };

  const handleSubmit = () => {
    // 여기서 서버로 name, phoneNumber, email 값을 전송하는 로직을 구현
    userStore.userModify({
      name : name, 
      phoneNumber : phoneNumber,
      email: '',
      passwd: '',
      code: '',
      image: imageName,
    })
    alert('저장되었습니다.');
    console.log('서버로 전송:', { name, phoneNumber,imageName });
  };


  const handleImageClick = () => {
    // 파일 선택 창 열기
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const secession = async () =>{
    const response = await axios({
      method: 'POST',
      url:`${AXIOS.BASE_URL}/api/users/withdraw`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('access-token'),
      },
    });
    console.log(response.data)
   sessionStorage.removeItem('access-token')
   navigate('/')


  }

  

  return (
    <div>
      <h2>프로필 정보</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className={styles.container}>
            <div className={styles.img_container}>
       <img
          className={styles.profile_img}
          src={image ? URL.createObjectURL(image) : imageName ? imageName : PersonCircle}
          alt="Logo"
          onClick={handleImageClick}
        />
       <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none',  }}
            onChange={handleImageChange}
            />

        </div>
            <div style={{width :'500px'}}>
                  <ProfileInput name="이름" value={name} marginRight="39px" onChange={handleNameChange} />
                  <ProfileInput name="전화번호" value={phoneNumber} onChange={handlePhoneNumberChange} /> 
                  <div style={{marginLeft :'70px'}}>
                  <Button color='green' size='smallButton'>수정</Button>
                  버튼 부분은 임시코드라 수정해야함
                </div>
                
            </div>
        </div>
 
        <div>
         
        </div>
      </form>
      <div>
        <Button color='red' size='smallButton' onClick={secessionModalOpen} >탈퇴</Button>
        <ModalBlack
        isOpen={secessionModal}
        onClose={secessionModalClose}
        content={
          <div style={{padding :'10px'}}>
              <div>경고</div>
              <div>탈퇴하면 저장되어있던 모든
                  데이터가 삭제되게 됩니다.</div>
                  <div>정말 탈퇴하시겠습니까?</div>
                  <div style={{display:'flex'}}>
                      <Button color='green' size='smallButton' onClick={secession}>확인</Button>
                      <Button color='red' size='smallButton'>취소</Button>
                  </div>
                

          </div>
        }
        customWidth="400px"
        customHeight="200px"
      />
      </div>
      
    </div>
  );
};

export default Profile;
