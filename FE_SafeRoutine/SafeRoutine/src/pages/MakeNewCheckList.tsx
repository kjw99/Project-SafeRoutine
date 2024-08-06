import React, { useState } from 'react';
import styles from '../styles/NewCheckList.module.scss';
import CheckOption from '../components/check/CheckOption';
import Reset from '../components/check/ResetInterval';
import ListType from '../components/check/ListType';
import axios from 'axios';
import { format } from 'date-fns'; 
import Camera from '../assets/camera.png'
import AXIOS from '../constants/constAxios';
import { useParams } from 'react-router-dom';
const MakeNewCheckList: React.FC = () => {
  const [optionsCount, setOptionsCount] = useState(0);
  const [formData, setFormData] = useState<Array<{questionType: string; question: string; }>>([]);
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const [checkListName, setCheckListName] = useState('');
  const [ocrResponse, setOcrResponse] = useState([]);
  const { teamId } = useParams();


  const handleocr = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // HTMLElement 타입으로 캐스팅
    const fileInput = document.getElementById('ocrImage') as HTMLInputElement | null;

    if (fileInput) {
      // HTMLInputElement에서 파일 가져오기
      const file = fileInput.files?.[0];

      if (file) {
        // FormData 객체 생성
        const ocrImage = new FormData();

        // FormData에 파일 추가
        ocrImage.append('ocrImage', file);

        try {
          // Axios를 사용하여 서버에 POST 요청 보내기
          const response = await axios.post(AXIOS.BASE_URL + '/ocr/check', ocrImage, {
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization" : sessionStorage.getItem("access-token")
            },
          });
          setOcrResponse(response.data.heightCheck.flat());
          // console.log(response.data.heightCheck.flat());
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        console.error('No file selected.');
      }
      console.log(ocrResponse)
    }
  };




  const addCheckOption = () => {
    setOptionsCount((prevCount) => prevCount + 1);
  };

  const removeCheckOption = () => {
    setOptionsCount((prevCount) => Math.max(0, prevCount - 1));
    // Remove the last item from formData
    setFormData((prevData) => prevData.slice(0, -1));
  };
  
  const isFormDataValid = () => {
    return formData.every(item => item.question && item.questionType);
  };

  // Check if at least one item has non-empty content or answer
  const isAnyFormDataProvided = () => {
    return formData.some(item => item.question || item.questionType);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckListName(event.target.value);
  };


  const handleQuestionContentChange = (index: number, content: string) => {
    // Update the formData array with the new question content
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], question: content };
      return newData;
    });
  };

  const handleAnswerChange = (index: number, questionType: string) => {
    // Update the formData array with the new answer
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], questionType };
      return newData;
    });
  };

  const handleSubmit = async () => {
    
    // try {
      // Create the data object with the required structure
      const requestData = {
        teamId: teamId, // Replace with your teamId
        checkListName: checkListName, // Replace with your checklist name
        resetTime: '12:00', // Replace with your reset time
        resetCycle: 'daily', // Replace with your reset cycle
        checkListRow: formData,
        checkListCol: [{question :'test'}],
        checkListType: 'single', // Replace with your checklist type
        checkListActive: true, // Replace with your checklist active status
        checkListUse: true, // Replace with your checklist use status
        checkListBackUpDate: currentDate, // Replace with your backup date
      };
      
      // Make the POST request using Axios
      const response = await axios.post(AXIOS.BASE_URL + '/team/manager/check/add', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('access-token') 
        },
      });
      alert('제출되었습니다.')
      console.log(response.data)
      console.log(requestData)
  
  };

  

  return (
    <div className={styles.container}>
      <h1>새로운 체크리스트 생성</h1>
      
      <div className={styles.box}>
        <h1 className={styles.header}>
        <input
            type="text"
            placeholder="제목을 입력하세요."
            className={styles.inputTitle}
            value={checkListName}
            onChange={handleTitleChange}
          />
        </h1>
        <hr />
        <div className={styles.big}>
          <ListType />
          <Reset /> <br />
        </div>
        <div className={styles.big}></div>

        <p>제목, 값이 하나라도 지정되어 있지 않다면 생성이 되지 않습니다.</p>
        <div style={{display: 'flex'}}>
           <img style={{width :'50px', height :'50px', cursor :'pointer'}}  src={Camera}/>
        <form onSubmit={handleocr}>
          <input type="file" id="ocrImage" name="ocrImage"/>
          <button type='submit'>OCR 생성하기</button>
      </form>
        </div>
       
        <button onClick={addCheckOption}>추가하기</button>
        <button onClick={removeCheckOption}>삭제하기</button>
        <button onClick={handleSubmit} disabled={!isFormDataValid() || !isAnyFormDataProvided() || !checkListName}>리스트 생성하기</button>
        {ocrResponse.map((item, index) => (
          <CheckOption
            key={index}
            initialQuestion={item}
            onQuestionContentChange={(content) => handleQuestionContentChange(index, content)}
            onAnswerChange={(answer) => handleAnswerChange(index, answer)}
          />
          
        ))}

        {[...Array(optionsCount)].map((_, index) => (
          <CheckOption
            key={index}
            onQuestionContentChange={(content) => handleQuestionContentChange(index, content)}
            onAnswerChange={(answer) => handleAnswerChange(index, answer)}
          />
        ))}
        
        
      </div>
    </div>
  );
};

export default MakeNewCheckList;
